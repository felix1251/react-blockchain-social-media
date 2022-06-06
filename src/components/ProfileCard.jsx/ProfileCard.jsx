import React, { useEffect, useState } from "react";
import Cover from "../../img/cover.jpg";
import "./ProfileCard.css";
import { useMoralisCloudFunction, useMoralis } from "react-moralis";
import { useParams } from "react-router-dom";

const ProfileCard = ({ }) => {
  const { Moralis } = useMoralis()
  const { address } = useParams();
  const [user, setUser] = useState()
  
  const { fetch, isLoading } = useMoralisCloudFunction("getUser", { address: address }, { autoFetch: false });

  useEffect(() => {
    const load = async () => {
      if (address) {
        fetch({
          onSuccess: (data) => setUid(data[0]), // ratings should be 4.5
        });
      }
      else {
        setUser(Moralis.User.current().attributes)
        const res = await Moralis.Cloud.run("getUser", { address: Moralis.User.current().attributes.ethAddress});
        localStorage.setItem("lastViewdUserId", res[0].objectId) 
        setUser(res[0])
      }
    }
    load()
  }, [fetch, address, Moralis])

  const setUid = (data) => {
    localStorage.setItem("lastViewdUserId", data.objectId) 
    setUser(data)
  }

  const ProfilePage = true;
  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={Cover} alt="" />
        <img src={user?.pfp} alt="" />
      </div>

      <div className="ProfileName">
        <span>{user?.username}</span>
        <span>{user?.ethAddress.slice(0, 5)}...{user?.ethAddress.slice(38)}</span>
        <span>{user?.bio}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user?.followers ? user?.followers : 0}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user?.followings ? user?.followings : 0}</span>
            <span>Followings</span>
          </div>
          {ProfilePage && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{user?.postCount ? user?.postCount : 0}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {ProfilePage ? "" : <span>My Profile</span>}
    </div>
  );
};

export default ProfileCard;
