import React, { useEffect, useState } from 'react'
import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
import './PostSide.css'
import { useMoralis } from 'react-moralis'
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { Loader } from '@mantine/core'

const option = {
  offset: 0,
  debounce: 0,
}

const PostSide = () => {

  const { Moralis } = useMoralis()
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(false)

  const fetch = async () => {
    setLoading(true)
    const res = await Moralis.Cloud.run("feedPosts", { page: page })
    if (res.length > 0) {
      setHasMore(true)
      setPage(page + 1)
      setPosts(posts.concat(res))
      setLoading(false)
    } else {
      setLoading(false)
      setHasMore(false)
    }
  }

  const onBottomFetch = () => {
    if (!loading) fetch()
  }

  const scrollRef = useBottomScrollListener(onBottomFetch, option);

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const res = await Moralis.Cloud.run("feedPosts", { page: 0 })
      if(res.length > 0){
        setHasMore(true)
        setPage(1)
        setPosts(res)
        setLoading(false)
      }
    }
    load()
  }, [Moralis])

  return (
    <div ref={scrollRef} className={`PostSide`}>
      <PostShare />
      <Posts posts={posts} loading={loading} view="feed" />
      {<div className={'loader-post'}>
        <div style={{height: "55px", display: "flex", justifyContent: "center", alignItems: "center"}}>
          {!hasMore && !loading && <span>Nothing to load</span>}
          {loading && <Loader color={"lime"} size="xl" variant="dots" />}
        </div>
      </div>}
    </div>
  )
}

export default PostSide