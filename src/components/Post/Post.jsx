import React from 'react'
import './Post.css'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import ProfileImage from "../../img/profileImg.jpg";
import { Link } from 'react-router-dom'

const Post = ({ data }) => {
  return (
    <div className="Post">
      <div className="Header">
        <Link to={`/u/${data?.postOwnerAcc}`}>
          <img className='Header-Image' src={ProfileImage} alt="" />
        </Link>
        {/* <span><b>{data?.ownerDetails.username}</b></span> */}
      </div>
      <img src={data?.postImage} alt="" />
      <div className='Infos'>
        <div className="postReact">
          <img src={data?.liked ? Heart : NotLike} alt="" />
          <img src={Comment} alt="" />
          <img src={Share} alt="" />
        </div>
        <span style={{ color: "var(--white)", fontSize: '12px' }}>{data?.likes} likes</span>
        <div className="Details">
          {/* <span><b>{data?.ownerDetails.username}</b></span>{" "} */}
          <span>{data?.postDescription}</span>
        </div>
      </div>
    </div>
  )
}

export default Post