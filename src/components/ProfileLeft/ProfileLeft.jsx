import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard.jsx'
import InfoCard from '../InfoCard/InfoCard.jsx'
import Nav from '../Nav/Nav.jsx';
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