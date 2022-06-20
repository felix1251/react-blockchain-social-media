import { ActionIcon, Input, Loader, ScrollArea } from '@mantine/core'
import React, { useState } from 'react'
import CommentsCard from '../CommentCard/CommentsCard.jsx'
import { UilMessage } from '@iconscout/react-unicons'
import { useMoralis } from 'react-moralis'
import "./Comment.css"
import Nav from '../Nav/Nav.jsx'

const Comments = (props) => {
      const { comments, postId, onSinglePage, loading, hasMore, scrollRef, setComments } = props
      const [sendCommentLoading, setSendCommentLoading] = useState(false)
      const [comm, setComm] = useState("")
      const { Moralis, user } = useMoralis()

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
                  setComments(prev=> [userComment, ...prev])
                  setComm("")
            } else {
                  alert("Comment must not empty, type something firts!")
            }
            setSendCommentLoading(false)
      }

      return (
            <div className={`comments-scroll ${onSinglePage && "on-single-post"}`}>
                  {onSinglePage && <Nav />}
                  <ScrollArea viewportRef={scrollRef} className={`${onSinglePage ? `single-page-background` : "feed-page-background"}`}
                        style={{ height: "60vh", padding: "12px", borderRadius: "15px" }}
                        type="always">
                        {comments.map((comment, key) => (
                              <CommentsCard key={key} comment={comment} />
                        ))}
                        {<div className={'loader-post'}>
                              <div className='loader-container'>
                                    {!loading && !hasMore && <span>Nothing to load</span>}
                                    {loading && <Loader color={"lime"} size="xl" variant="dots" />}
                              </div>
                        </div>}
                  </ScrollArea>
                  <form className='comment-send'>
                        <Input
                              placeholder="Send comment...."
                              size="md"
                              style={{width: "95%"}}
                              required
                              value={comm}
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
            </div>
      )
}

export default Comments