import { ActionIcon, Input, ScrollArea } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import CommentsCard from '../CommentCard/CommentsCard'
import { UilMessage } from '@iconscout/react-unicons'
import { useMoralis } from 'react-moralis'
import "./Comment.css"
import Nav from '../Nav/Nav'

const Comments = (props) => {
      const { comments, postId } = props
      const [comm, setComm] = useState()
      const [loading, setLoading] = useState()
      const {Moralis} = useMoralis()

      const createComment = async (e) => {
            e.preventDefault()
            if (comm) {
                  const res = await Moralis.Cloud.run("createComment", { postId: postId, comment: comm });
                  setComm("")
                  setLoading(true)
            } else {
                  alert("Comment must not empty, type something firts!")
            }
            setLoading(false)
      }

      return (
            <div className='comments-scroll'>
                  <Nav/>
                  <ScrollArea style={{
                        height: "65vh", backgroundColor: "var(--card-background)",
                        padding: "15px", borderRadius: "15px"
                  }}>
                        {comments.map((comment, key) => (
                              <CommentsCard key={key} comment={comment} />
                        ))}
                  </ScrollArea>
                  <form className='comment-send'>
                        <Input
                              placeholder="Send comment...."
                              size="md"
                              required
                              value={comm}
                              rightSectionWidth={70}
                              onChange={(e) => setComm(e.currentTarget.value)}
                              rightSection={
                                    <ActionIcon radius="lg" size="xl" variant="transparent">
                                          <UilMessage className="Post-Icon" onClick={(e) => createComment(e)}/>
                                    </ActionIcon>
                              }
                        />
                  </form>
            </div>
      )
}

export default Comments