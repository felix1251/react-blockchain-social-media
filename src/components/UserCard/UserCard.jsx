import React, { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "./UserCard.css"
import { useMoralis } from 'react-moralis';

const UserCard = ({ username, ethAddress, followers, pfp, isMe, isFollowed, userId }) => {
  const [followed, setFollowed] = useState(isFollowed)
  const [followerCount, setFollowerCount] = useState(followers)

  const { Moralis } = useMoralis()
  const followUser = async () => {
    if(isMe){
      alert("This is you")
    }else {
      setFollowed(!followed)
      const res = await Moralis.Cloud.run("followUser", { userId: userId });
      if(res.status === "followed"){
        setFollowerCount(followerCount+1)
      }else{
        setFollowerCount(followerCount-1)
      }
    }
  }

  return (
    <div className='user-card'>
      <div className='user-right'>
        <LazyLoadImage className='user-image' src={pfp} alt="" />
        <div className='user-details'>
          <span>{username.slice(0, 25)}{username.length > 25 && "...."}</span>
          <span> {followerCount} followers</span>
        </div>
      </div>
      <button onClick={followUser} className={`${!isMe ? `${!followed ? "button" : "followed-button"}` : "me-button"}  fc-button button-sizing`}>
        {!isMe ? <> {!followed ? "Follow" : "Unfollow"} </> :  "You"}
      </button>
    </div>
  )
}

export default UserCard