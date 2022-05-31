import React from "react";
import FollowersCard from "../FollowersCard/FollowersCard";
import ProfileCard from "../ProfileCard.jsx/ProfileCard";
import Nav from "../Nav/Nav.jsx";
import "./ProfileSide.css";
const ProfileSide = () => {
  return (
    <div className="ProfileSide">
      <Nav/>
      <ProfileCard />
      <FollowersCard />
    </div>
  );
};

export default ProfileSide;
