import { Loader } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
import { useMoralis, useMoralisCloudFunction } from 'react-moralis'
import { useParams } from 'react-router-dom'
import Posts from '../../components/Posts/Posts'
import PostShare from '../../components/PostShare/PostShare'
import ProfileCard from '../../components/ProfileCard.jsx/ProfileCard'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import RightSide from '../../components/RightSide/RightSide'
import './Profile.css'
/* eslint-disable no-debugger, no-console */

const Profile = () => {
  const { address } = useParams();
  const { Moralis } = useMoralis()
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])

  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(false)

  const isParamsEqualToAccount = () => {
    const user = Moralis.User.current()
    return user.attributes.ethAddress === address
  }

  const option = {
    offset: 0,
    debounce: 0,
  }

  const fetch = async () => {
    setLoading(true)
    const res = await Moralis.Cloud.run("userPosts", { userId: localStorage.getItem("lastViewdUserId"), page: page })
    if (res.length > 0) {
      setHasMore(true)
      setPage(page + 1)
      setPosts(posts.concat(res))
      setLoading(false)
    } else {
      setHasMore(false)
      setLoading(false)
    }
  }

  const onBottomFetch = () => {
    if (!loading) fetch()
  }

  const scrollRef = useBottomScrollListener(onBottomFetch, option);

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const user = await Moralis.Cloud.run("getUser", { adr: address })
      localStorage.setItem("lastViewdUserId", user[0].objectId)
      const res = await Moralis.Cloud.run("userPosts", { userId: localStorage.getItem("lastViewdUserId"), page: 0 })
      if(res.length > 0){
        setHasMore(true)
        setPage(1)
        setPosts(res)
      }
      setLoading(false)
    }
    load()
  }, [Moralis, address])

  return (
    <div className="Profile">
      <RightSide />
      <div className="Profile-center" ref={scrollRef}>
        <ProfileCard />
        <div className="Profile-post">
          {isParamsEqualToAccount() && <PostShare />}
          <Posts posts={posts} loading={loading} view="profile" />
          {<div className={'loader-post'}>
            <div className='loader-container'>
              {!hasMore && !loading && <span>Nothing to load</span>}
              {loading && <Loader color={"lime"} size="xl" variant="dots" />}
            </div>
          </div>}
        </div>
      </div>
      <ProfileLeft isParamsEqualToAccount={isParamsEqualToAccount()} />
    </div>
  )
}

export default Profile