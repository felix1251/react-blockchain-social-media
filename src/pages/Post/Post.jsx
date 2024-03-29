import { Loader } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
import { useMoralis } from 'react-moralis'
import { useParams } from 'react-router-dom'
import RightSide from '../../components/RightSide/RightSide.jsx'
import Comments from '../../components/SinglePost/Comments.jsx'
import SinglePost from '../../components/SinglePost/SinglePost.jsx'
import "./Post.css"

const option = {
      offset: 0,
      debounce: 0,
}

const Post = () => {
      const { id } = useParams()
      const [postData, setPostData] = useState()
      const { Moralis } = useMoralis()
      const [loading, setLoading] = useState(false)
      const [comments, setComments] = useState([])
      const [commentPage, setCommentPage] = useState(0);
      const [commentHasMore, setCommentHasMore] = useState(false)
      const [commentLoading, setCommentLoading] = useState(false)

      const fetchComments = async () => {
            setCommentLoading(true)
            const comm = await Moralis.Cloud.run("postComments", { postId: id, page: commentPage })
            if (comm.length > 0) {
                  setCommentHasMore(true)
                  setCommentPage(commentPage + 1)
                  setComments(comments.concat(comm))
            } else {
                  setCommentHasMore(false)
            }
            setCommentLoading(false)
      }

      const onBottomFetch = () => {
            if (!commentLoading) fetchComments()
      }

      const scrollRef = useBottomScrollListener(onBottomFetch, option);

      useEffect(() => {
            const load = async () => {
                  setLoading(true)
                  setCommentLoading(true)
                  const post = await Moralis.Cloud.run("getSinglePost", { postId: id })
                  const comm = await Moralis.Cloud.run("postComments", { postId: id, page: 0 })
                  setPostData(post[0])
                  setCommentPage(1)
                  setComments(comm)
                  setLoading(false)
                  setCommentLoading(false)
            }
            load()
      }, [Moralis, id])

      return (
            <div className='post-page'>
                  <RightSide />
                  {!loading ?
                        <div>
                              {postData ? <SinglePost setComments={setComments} data={postData} comments={comments}
                                    postId={id} loading={commentLoading} onSinglePage={true} hasMore={commentHasMore} scrollRef={scrollRef} />
                              :
                              <span style={{alignSelf: "center", justifySelf: "center"}}>
                                    this post does not exist or been deleted..
                              </span>
                        }
                        </div>
                        :
                        <div className='loader-container'>
                              <Loader color={"lime"} size="xl" variant="dots" />
                        </div>
                  }
                  <div className='comments-right-side'>
                        <Comments comments={comments} postId={id} loading={commentLoading}
                              hasMore={commentHasMore} onSinglePage={true} scrollRef={scrollRef} />
                  </div>
            </div>
      )
}

export default Post