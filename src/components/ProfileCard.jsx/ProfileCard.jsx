import React, { useEffect, useState } from "react";
import Cover from "../../img/cover.jpg";
import "./ProfileCard.css";
import { useMoralis } from "react-moralis";
import { useParams } from "react-router-dom";
import ProfileModal from "../ProfileModal.jsx/ProfileModal";
import { UilPen } from "@iconscout/react-unicons";
import logo from "../../img/logo.png"
import { Loader } from "@mantine/core";

const ProfileCard = ({ inHome }) => {
  const { Moralis } = useMoralis()
  const { address } = useParams();
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(false)
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      if (address) {
        const res = await Moralis.Cloud.run("getUser", { adr: address });
        setUser(res[0])
      } else {
        const res = await Moralis.Cloud.run("getUser", { adr: Moralis.User.current().attributes.ethAddress });
        setUser(res[0])
      }
      setLoading(false)
    }
    load()

  }, [address, Moralis])

  const checkIfMe = () => {
    const currUser = Moralis.User.current()
    return currUser.attributes.ethAddress === user?.ethAddress
  }

  return (
    <div className="ProfileCard">
      <div className={`ProfileImages ${inHome && "in-home"} `}>
        <img src={Cover} alt="" />
        <img src={user ? user?.pfp : logo} alt="" />
      </div>
      <div className="ProfileName">
        <>
          <span>{user?.username}  {checkIfMe() &&
            <>
              <span style={{ color: "orange", fontWeight: "600" }}>(You)</span>
              <UilPen
                style={{ cursor: "pointer" }}
                width="2rem"
                height="1.2rem"
                onClick={() => setModalOpened(true)}
              />
            </>
          }</span>
        {loading && <Loader variant="dots" color={"lime"} size="xl" />}
        </>
        {user && <span>{user?.ethAddress.slice(0, 5)}...{user?.ethAddress.slice(38)}</span>}
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
          <div className="vl"></div>
          <div className="follow">
            <span>{user?.postCount ? user?.postCount : 0}</span>
            <span>Posts</span>
          </div>
        </div>
        <hr />
      </div>
      <ProfileModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
      />
    </div>
  );
};

export default ProfileCard;
