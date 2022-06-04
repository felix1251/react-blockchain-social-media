import React, { useEffect, useState } from 'react'
import { useMoralisCloudFunction } from 'react-moralis'
import PostSide from '../../components/PostSide/PostSide'
import ProfileSide from '../../components/profileSide/ProfileSide'
import RightSide from '../../components/RightSide/RightSide'
import './Home.css'
const Home = () => {
  return (
    <div className="Home">
      <RightSide />
      <PostSide/>
      <ProfileSide />
    </div>
  )
}

export default Home