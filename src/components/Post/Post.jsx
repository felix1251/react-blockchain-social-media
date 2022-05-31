import React from 'react'
import './Post.css'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import ProfileImage from "../../img/profileImg.jpg";

const Post = ({ data }) => {
  return (
    <div className="Post">
      <div className="Header">
        <img src={ProfileImage} alt="" /> 
        <span><b>{data.name}</b></span>
      </div>
      <img src={data.img} alt="" />
      <div className='Infos'>
        <div className="postReact">
          <img src={data.liked ? Heart : NotLike} alt="" />
          <img src={Comment} alt="" />
          <img src={Share} alt="" />
        </div>
        <span style={{ color: "var(--white)", fontSize: '12px' }}>{data.likes} likes</span>
        <div className="Details">
          <span><b>{data.name}</b></span>
          <span>{data.desc}</span>
        </div>
      </div>
    </div>
  )
}

export default Post