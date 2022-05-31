import React from 'react'
import Posts from '../../components/Posts/Posts'
import PostShare from '../../components/PostShare/PostShare'
import ProfileCard from '../../components/ProfileCard.jsx/ProfileCard'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import RightSide from '../../components/RightSide/RightSide'
import './Profile.css'
const Profile = () => {
  return (
    <div className="Profile">
      <RightSide />
      <div className="Profile-center">
        <ProfileCard />
        <div className="Profile-post">
          <PostShare />
          <Posts />
        </div>
      </div>
      <ProfileLeft />
    </div>
  )
}

export default Profile