import React, { lazy } from "react";
import "./Home.css";
const ProfileSide = lazy(() =>
  import("../../components/profileSide/ProfileSide")
);
const RightSide = lazy(() => import("../../components/RightSide/RightSide"));
const PostSide = lazy(() => import("../../components/PostSide/PostSide"));

const Home = () => {

  return (
    <div className="Home">
      <RightSide />
      <PostSide/>
      <ProfileSide inHome={true}/>
    </div>
  );
};

export default Home;
