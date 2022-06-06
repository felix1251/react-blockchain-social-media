import React, { lazy, Suspense, useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
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
      <Suspense fallback={<div>Loading...</div>}>
        <RightSide />
        <PostSide posts={posts} />
        <ProfileSide />
      </Suspense>
    </div>
  );
};

export default Home;
