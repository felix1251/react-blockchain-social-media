import React, { useState } from 'react'
import "./FollowersCard.css"

const UserCard = ({user, followUser}) => {
      const [isFollowed, setIsFollowed] = useState(false)

      const follow = () =>{
            setIsFollowed(true)
            followUser(user.objectId)
      }

      return (
            <div className="follower">
                  <div>
                        <img src={user?.pfp} alt="" className='followerImage' />
                        <div className="name">
                              <span>{user?.username}</span>
                              <span>{user?.ethAddress.slice(0, 5)}...{user?.ethAddress.slice(38)}</span>
                              {/* <span>{user?.followers} followers</span> */}
                        </div>
                  </div>
                  <button onClick={() => follow()} className={`${!isFollowed ? "button" : "followed-button"} fc-button button-sizing`}>
                        {!isFollowed ? "Follow" : "Unfollow"}
                  </button>
            </div>
      )
}

export default UserCard