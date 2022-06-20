import React, { lazy } from "react";
import "./Home.css";
import ProfileSide from "../../components/profileSide/ProfileSide.jsx"
const RightSide = lazy(() => import("../../components/RightSide/RightSide.jsx"));
const PostSide = lazy(() => import("../../components/PostSide/PostSide.jsx"));

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
