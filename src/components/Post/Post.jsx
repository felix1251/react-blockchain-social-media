import React, { useState } from 'react'
import './Post.css'
import { Link } from 'react-router-dom'
import { UilCommentDots, UilShare, UilRocket, UilMessage, UilGripHorizontalLine } from '@iconscout/react-unicons'
import { UisRocket } from '@iconscout/react-unicons-solid'
import { ActionIcon, Input, Indicator, Popover, Loader } from '@mantine/core';
import { useMoralis } from "react-moralis";
import moment from 'moment'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import CommentsModal from '../CommentsModal/CommentsModal'
import { Button } from '@mantine/core';
import { useBottomScrollListener } from 'react-bottom-scroll-listener'

const option = {
  offset: 0,
  debounce: 0,
}

const Post = ({ data }) => {
  const { Moralis } = useMoralis()
  const [like, setLiked] = useState(data?.likedByMe)
  const [likeCount, setLikeCount] = useState(data?.likes?.metadata?.total)
  const [commentCount, setCommentCount] = useState(data?.comments?.metadata?.total)
  const [comment, setComment] = useState("")
  const [modalComment, setModalComment] = useState([])
  const [loading, setLoading] = useState(false)
  const [opened, setOpened] = useState(false)
  const [visible, setVisible] = useState(false);
  const [sendCommentLoading, setSendCommentLoading] = useState(false);
  //lazy load
  const [commentPage, setCommentPage] = useState(0);
  const [commentHasMore, setCommentHasMore] = useState(false)
  const [modalCommentLoading, setModalCommentLoading] = useState(false)

  const createComment = async (e) => {
    e.preventDefault()
    setSendCommentLoading(true)
    if (comment) {
      const res = await Moralis.Cloud.run("createComment", { postId: data.objectId, comment: comment });
      setCommentCount(commentCount + 1)
      setComment("")
    } else {
      alert("Comment must not empty, type something firts!")
    }
    setSendCommentLoading(false)
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

  const fetchModalComments = async () => {
    if (modalComment.length === 0) {
      setOpened(true)
    }
    setModalCommentLoading(true)
    const comm = await Moralis.Cloud.run("postComments", { postId: data.objectId, page: commentPage })
    if (comm.length > 0) {
      setCommentHasMore(true)
      setCommentPage(commentPage + 1)
      setModalComment(modalComment.concat(comm))
    } else {
      setCommentHasMore(false)
    }
    setModalCommentLoading(false)
  }

  const onBottomFetch = () => {
    if (!modalCommentLoading) fetchModalComments()
  }

  const scrollRef = useBottomScrollListener(onBottomFetch, option);

  const closeCommentModal = () => {
    setModalComment([])
    setOpened(false)
    setCommentPage(0)
    setCommentHasMore(false)
  }

  return (
    <div className="Post" >
      <div className="Header">
        <div className='header-info-fix'>
          <Link to={`/u/${data?.ownerData.ethAddress}`}>
            <LazyLoadImage className='Header-Image' src={data?.ownerData.pfp} alt="" />
          </Link>
          <span><b>{data?.ownerData.username}</b></span>
        </div>
        <div className="dots">
          <Popover
            opened={visible}
            onClose={() => setVisible(false)}
            target={<UilGripHorizontalLine onClick={() => setVisible(true)} />}
            position="bottom"
          >
            <div style={{ display: 'flex', flexDirection: "column", gap: ".5rem" }}>
              <Button color="lime" component={Link} to={`/t/${data.objectId}`}>
                View
              </Button>
              <Button color="red">
                Delete
              </Button>
            </div>
          </Popover>
        </div>
      </div>
      <div className='image'>
        <LazyLoadImage src={data?.postImage} alt={data?.postImage} />
      </div>
      <div className='Infos'>
        <div className="postReact">
          {like ? <UisRocket onClick={e => likePost(e)} className="Post-Icon-Liked" /> : <UilRocket className="Post-Icon" onClick={e => likePost(e)} />}
          <Indicator inline label={commentCount} size={17} color="red" offset={5} position="bottom-end" disabled={commentCount > 0 ? false : true}>
            <UilCommentDots className="Post-Icon" onClick={() => fetchModalComments()} />
          </Indicator>
          <UilShare className="Post-Icon" />
        </div>
        <div className="Details">
          <span><b>{data?.ownerData.username}</b></span>{" "}
          <span>{data?.postDescription}</span>
        </div>
        <span style={{ color: "var(--white)", fontSize: '14px' }}>{likeCount} rocket likes</span>
        {data.comments.lazy_data.length > 0 && <><hr className='line' />
          <div className="user-followed-list">
            {data.comments.lazy_data.map((comm, key) => (
              <span key={key} className='Header-Comments-list'>{!comm.isMe ? comm.commenterData.username : "You"}{data.comments.lazy_data.length > 1 && ", "}</span>
            ))}
            {data.comments.isMore && <span className='Header-Comments-list'> and more</span>}
            <span className='Header-Comments-list'> commented this post</span>
          </div>
          {data.comments.lazy_data.map((comm, key) => (
            <div key={key} className="Comments">
              <span><b>{comm.commenterData.username}</b></span>{" "}
              <span>{comm.comment.slice(0, 40)}{comm.comment.length >= 40 && ".... show more"}</span>{" "}
              {comm.isMe && <span>(You)</span>}
            </div>
          ))}
          {data && <span className='show-more' onClick={() => fetchModalComments()}>show more comments...</span>}
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
              {!sendCommentLoading ?
                <UilMessage className="Post-Icon" onClick={(e) => createComment(e)} />
                :
                <Loader size={"sm"} />
              }
            </ActionIcon>
          }
        />
      </form>
      <CommentsModal opened={opened} modalCommentLoading={modalCommentLoading}
        closeCommentModal={closeCommentModal} postId={data.objectId} modalComment={modalComment}
        hasMore={commentHasMore} scrollRef={scrollRef} />
    </div>
  )
}

export default Post


