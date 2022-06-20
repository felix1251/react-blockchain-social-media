import React from "react";
import FollowersCard from "../FollowersCard/FollowersCard.jsx";
import ProfileCard from "../ProfileCard.jsx/ProfileCard.jsx";
import Nav from "../Nav/Nav.jsx";
import "./ProfileSide.css";
// import ConnectButtonProvider from "../ConnectMoralis/ConnectButton";
// import { useMoralis } from "react-moralis";
// import ConnectButtonProvider from "../ConnectMoralis/ConnectButton";
const ProfileSide = ({ inHome }) => {
  return (
    <div className="ProfileSide">
      <Nav />
      {inHome &&
        <>
          <ProfileCard inHome={true}/>
          <FollowersCard />
        </>
      }
    </div>
  );
};

export default ProfileSide;
