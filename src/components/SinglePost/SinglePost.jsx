import React, { useState } from 'react'
import './SinglePost.css'
import { Link } from 'react-router-dom'
import { UilCommentDots, UilShare, UilRocket, UilMessage } from '@iconscout/react-unicons'
import { UisRocket } from '@iconscout/react-unicons-solid'
import { ActionIcon, Input, Indicator, ScrollArea, Loader, Popover, Button, LoadingOverlay } from '@mantine/core';
import { useMoralis } from "react-moralis";
import moment from 'moment'
import { LazyLoadImage } from 'react-lazy-load-image-component';
// import Comments from './Comments'
import CommentsCard from '../CommentCard/CommentsCard'

const SinglePost = (props) => {
      const { data } = props
      const { Moralis, user } = useMoralis()
      const [like, setLiked] = useState(data?.likedByMe)
      const [likeCount, setLikeCount] = useState(data?.likes?.metadata?.total)
      const [commentCount, setCommentCount] = useState(data?.comments?.metadata?.total)
      const { comments, postId, loading, onSinglePage, hasMore, scrollRef, setComments } = props
      const [deleteLoading, setDeleteLoading] = useState(false)

      const [sendCommentLoading, setSendCommentLoading] = useState(false)
      const [comm, setComm] = useState("")

      const likePost = async (e) => {
            e.preventDefault()
            setLiked(!like)
            setCommentCount()
            const res = await Moralis.Cloud.run("likePost", { postId: data.objectId });
            if (res.status === "liked") {
                  setLikeCount(likeCount + 1)
            } else {
                  setLikeCount(likeCount - 1)
            }
      }

      const deletePost = async (e) => {
            e.preventDefault()
            setDeleteLoading(true)
            const res = await Moralis.Cloud.run("deletePost", { postId: data.objectId });
            setDeleteLoading(false)
            window.location = "/h"
      }

      const createComment = async (e) => {
            e.preventDefault()
            setSendCommentLoading(true)
            if (comm) {
                  await Moralis.Cloud.run("createComment", { postId: postId, comment: comm });
                  const userComment = {
                        "postId": postId,
                        "commenterId": Date.now(),
                        "comment": comm,
                        "createdAt": Date.now(),
                        "updatedAt": Date.now(),
                        "commenterData": {
                              "_id": Date.now(),
                              "pfp": user.attributes.pfp,
                              "username": user.attributes.username,
                              "ethAddress": user.attributes.ethAddress
                        },
                        "objectId": Date.now()
                  }
                  setComments(prev => [userComment, ...prev])

                  setComm("")
            } else {
                  alert("Comment must not empty, type something firts!")
            }
            setSendCommentLoading(false)
      }

      return (
            <div className="Post" >
                  <LoadingOverlay  visible={deleteLoading} />
                  <div className="Header">
                        <div className='header-info-fix'>
                              <Link to={`/u/${data?.ownerData?.ethAddress}`}>
                                    <LazyLoadImage className='Header-Image' src={data?.ownerData?.pfp} alt="" />
                              </Link>
                              <span><b>{data?.ownerData?.username}</b></span>
                        </div>
                        {data?.isMyPost &&
                              <div className="dots">
                                    <Button onClick={(e)=> deletePost(e)} color="red">
                                          Delete
                                    </Button>
                              </div>
                        }
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
                              <span><b>{data?.ownerData?.username}</b></span>{" "}
                              <span>{data?.postDescription}</span>
                        </div>
                        {data?.likes?.lazy_data.length > 0 &&
                              <div className="user-followed-list">
                                    {data?.likes?.lazy_data.map((comm, key) => (
                                          <span key={key} className='Header-Comments-list'>
                                                {!comm.isMe ? <span className='liker-name'>{comm?.likerData?.username}</span> : <span className='liker-name'>You</span>}
                                                {key + 1 === data?.likes?.lazy_data.length - 1 && !data.likes.isMore && " and "}
                                                {data?.likes?.lazy_data.length === 3 && key === 0 && ", "}
                                                {data?.likes?.lazy_data.length === 3 && key === 1 && data.likes.isMore && ", "}
                                          </span>
                                    ))}
                                    {data?.likes.isMore && <span className='Header-Comments-list'> and more</span>}
                                    <span className='Header-Comments-list'> liked {data?.isMyPost ? "your" : "this"} post</span>
                              </div>
                        }
                        <span style={{ color: "var(--white)", fontSize: '14px' }}>{likeCount} rocket likes</span>
                        <div style={{ color: "grey", fontSize: '13.5px', marginTop: "5px" }}>Posted {moment(data?.createdAt).fromNow()}</div>
                        <div className='single-post-comment-mobile'>
                              <ScrollArea style={{
                                    backgroundColor: "var(--card-background)",
                                    padding: "5px", borderRadius: "10px"
                              }} type="always"
                              >
                                    <ScrollArea viewportRef={scrollRef} className={`${onSinglePage ? `single-page-background` : "feed-page-background"}`}
                                          style={{ height: "30vh", borderRadius: "10px" }}
                                          type="always">
                                          {comments.map((comment, key) => (
                                                <CommentsCard key={key} comment={comment} />
                                          ))}
                                          {<div className={'loader-post'}>
                                                <div className='loader-container'>
                                                      {!loading && !hasMore && <span>comment ends here</span>}
                                                      {loading && <Loader color={"lime"} size="xl" variant="dots" />}
                                                </div>
                                          </div>}
                                    </ScrollArea>
                                    <form className='comment-send'>
                                          <Input
                                                placeholder="Send comment...."
                                                size="md"
                                                required
                                                value={comm}
                                                style={{ width: "95%" }}
                                                rightSectionWidth={70}
                                                onChange={(e) => setComm(e.currentTarget.value)}
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
                              </ScrollArea>
                        </div>
                  </div>
            </div>
      )
}

export default SinglePost