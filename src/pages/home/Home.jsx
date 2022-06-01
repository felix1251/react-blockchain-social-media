import React from 'react'
import PostSide from '../../components/PostSide/PostSide'
import ProfileSide from '../../components/profileSide/ProfileSide'
import RightSide from '../../components/RightSide/RightSide'
import './Home.css'
const Home = () => {
  
  return (
    <div className="Home">
        <RightSide/>
        <PostSide onNewsfeed={true}/>
        <ProfileSide/>
    </div>
  )
}

export default Home