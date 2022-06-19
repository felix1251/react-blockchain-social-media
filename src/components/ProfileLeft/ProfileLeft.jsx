import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import InfoCard from '../InfoCard/InfoCard'
import Nav from '../Nav/Nav';
import "./ProfileLeft.css"
const ProfileLeft = (props) => {
  const {isMe} = props
  return (
    <div className="ProfileSide">
      <Nav/>
      {isMe && <InfoCard />}
      <FollowersCard />
    </div>
  )
}

export default ProfileLeft