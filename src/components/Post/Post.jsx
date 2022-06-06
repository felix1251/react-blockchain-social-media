import React, { useState } from 'react'
import './Post.css'
import { Link } from 'react-router-dom'
import { UilCommentDots, UilShare, UilRocket, UilMessage } from '@iconscout/react-unicons'
import { UisRocket } from '@iconscout/react-unicons-solid'
import { ActionIcon, Input, Indicator } from '@mantine/core';
import { useMoralis } from "react-moralis";
import moment from 'moment'
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Post = ({ data, last }) => {
  const { Moralis } = useMoralis()
  const [like, setLiked] = useState(data?.likedByMe)
  const [likeCount, setLikeCount] = useState(data?.likes?.metadata?.total)
  const [commentCount, setCommentCount] = useState(data?.comments?.metadata?.total)
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)

  const createComment = async (e) => {
    e.preventDefault()
    if (comment) {
      const res = await Moralis.Cloud.run("createComment", { postId: data.objectId, comment: comment });
      setCommentCount(commentCount + 1)
      setComment("")
      setLoading(true)
    } else {
      alert("Comment must not empty, type something firts!")
    }
    setLoading(false)
  }

  const likePost = async (e) => {
    e.preventDefault()
    setLoading(true)
    setLiked(!like)
    const res = await Moralis.Cloud.run("likePost", { postId: data.objectId });
    if (res.status === "liked") {
      setLikeCount(likeCount + 1)
    } else {
      setLikeCount(likeCount - 1)
    }
    setLoading(false)
  }

  return (
    <div className="Post" ref={last}>
      <div className="Header">
        <Link to={`/u/${data?.ownerData.ethAddress}`}>
          <LazyLoadImage className='Header-Image' src={data?.ownerData.pfp} alt="" />
        </Link>
        <span><b>{data?.ownerData.username}</b></span>
      </div>
      <div className='image'>
        <LazyLoadImage src={data?.postImage} alt={data?.postImage} />
      </div>
      <div className='Infos'>
        <div className="postReact">
          {like ? <UisRocket onClick={e => likePost(e)} className="Post-Icon-Liked" /> : <UilRocket className="Post-Icon" onClick={e => likePost(e)} />}
          <Indicator inline label={commentCount} size={17} color="red" offset={5} position="bottom-end" disabled={commentCount > 0 ? false : true}>
            <UilCommentDots className="Post-Icon" />
          </Indicator>
          <UilShare className="Post-Icon" />
        </div>
        <div className="Details">
          <span><b>{data?.ownerData.username}</b></span>{" "}
          <span>{data?.postDescription}</span>
        </div>
        <span style={{ color: "var(--white)", fontSize: '14px' }}>{likeCount} rocket likes</span>
        {data.comments.lazy_data.length > 0 && <><hr className='line' />
          <h4 className='Header-Comments'>Comments</h4>
          {data.comments.lazy_data.map((comm, key) => (
            <div key={key} className="Comments">
              <span><b>{comm.commenterData.username}</b></span>{" "}
              <span>{comm.comment.slice(0, 40)}{comm.comment.length >= 40 && ".... show more"}</span>
            </div>
          ))}
          {commentCount > 3 && <span className='show-more'>show more comments...</span>}
        </>
        }
        <div style={{ color: "grey", fontSize: '13.5px', marginTop: "5px" }}>Posted {moment(data?.createdAt).fromNow()}</div>
      </div>

      <form className='Send'>
        <Input
          placeholder="Send comment...."
          size="md"
          required
          value={comment}
          rightSectionWidth={70}
          onChange={(e) => setComment(e.currentTarget.value)}
          rightSection={
            <ActionIcon radius="lg" size="xl" variant="transparent">
              <UilMessage className="Post-Icon" onClick={(e) => createComment(e)} />
            </ActionIcon>
          }
        />
      </form>
    </div>
  )
}

export default Post
