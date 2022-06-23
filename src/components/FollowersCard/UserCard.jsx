import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./FollowersCard.css"

const UserCard = ({user, followUser}) => {
      const [isFollowed, setIsFollowed] = useState(false)
      const [count, setCount] = useState(user?.followers)

      const follow = () =>{
            setIsFollowed(true)
            followUser(user.objectId)
      }

      return (
            <div className="follower">
                  <div>
                        <Link to={"/t/"+user?.ethAddress}>
                              <img src={user?.pfp} alt="" className='followerImage' />
                        </Link>
                        <div className="name">
                              <span>{user?.username.slice(0, 13)}{user?.username.length >= 13 && "..."}</span>
                              <span>{user?.ethAddress.slice(0, 5)}...{user?.ethAddress.slice(38)}</span>
                              <span>{count} followers</span>
                        </div>
                  </div>
                  <button onClick={() => follow()} className={`${!isFollowed ? "button" : "followed-button"} fc-button button-sizing`}>
                        {!isFollowed ? "Follow" : "Unfollow"}
                  </button>
            </div>
      )
}

export default UserCard