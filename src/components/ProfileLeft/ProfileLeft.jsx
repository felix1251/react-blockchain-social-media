import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import InfoCard from '../InfoCard/InfoCard'
import Nav from '../Nav/Nav';
import "./ProfileLeft.css"
const ProfileLeft = ({isParamsEqualToAccount}) => {
  return (
    <div className="ProfileSide">
      <Nav/>
      {isParamsEqualToAccount && <InfoCard />}
      <FollowersCard />
    </div>
  )
}

export default ProfileLeft