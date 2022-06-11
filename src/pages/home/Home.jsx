import React, { lazy, useState } from "react";
import "./Home.css";
const ProfileSide = lazy(() =>
  import("../../components/profileSide/ProfileSide")
);
const RightSide = lazy(() => import("../../components/RightSide/RightSide"));
const PostSide = lazy(() => import("../../components/PostSide/PostSide"));

const Home = () => {
  const [posts, setPosts] = useState([]);

  return (
    <div className="Home">
      <RightSide />
      <PostSide posts={posts} />
      <ProfileSide inHome={true}/>
    </div>
  );
};

export default Home;
