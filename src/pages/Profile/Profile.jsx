import { Loader } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useMoralis, useMoralisCloudFunction } from 'react-moralis'
import { useParams } from 'react-router-dom'
import Posts from '../../components/Posts/Posts'
import PostShare from '../../components/PostShare/PostShare'
import ProfileCard from '../../components/ProfileCard.jsx/ProfileCard'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import RightSide from '../../components/RightSide/RightSide'
import './Profile.css'
/* eslint-disable no-debugger, no-console */

const Profile = () => {
  const { address } = useParams();
  const [posts, setPosts] = useState()
  const { Moralis } = useMoralis()

  const isParamsEqualToAccount = () => {
    const user = Moralis.User.current()
    return user.attributes.ethAddress === address
  }


  return (
    <div className="Profile">
      <RightSide />
      <div className="Profile-center">
        <ProfileCard />
        <div className="Profile-post">
          {isParamsEqualToAccount() && <PostShare />}
          <Posts posts={posts} />
          { <div className='loader'><Loader /></div>}
        </div>
      </div>
      <ProfileLeft isParamsEqualToAccount={isParamsEqualToAccount()} />
    </div>
  )
}

export default Profile