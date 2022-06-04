import React, { useEffect, useState } from "react";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profileImg.jpg";
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
      if(address){
        fetch({
          onSuccess: (data) => setUser(data[0]), // ratings should be 4.5
        });
      }
      else{
        setUser(Moralis.User.current().attributes)
      }
    }
    load()
  }, [fetch, address, Moralis])

  const ProfilePage = true;
  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={Cover} alt="" />
        <img src={Profile} alt="" />
      </div>

      <div className="ProfileName">
        <span>{user?.username}</span>
        <span>{user?.ethAddress.slice(0, 5)}... {user?.ethAddress.slice(38)}</span>
        <span>{user?.bio}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>6,890</span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>1</span>
            <span>Followers</span>
          </div>

          {ProfilePage && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>3</span>
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
