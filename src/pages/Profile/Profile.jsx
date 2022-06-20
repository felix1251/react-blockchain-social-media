import { Loader } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
import { useMoralis } from 'react-moralis'
import { useParams } from 'react-router-dom'
import Posts from '../../components/Posts/Posts.jsx'
import ProfileCard from '../../components/ProfileCard.jsx/ProfileCard.jsx'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft.jsx'
import RightSide from '../../components/RightSide/RightSide.jsx'
import ProfileTabProfile from '../../components/profileTabProfile/profileTabProfile.jsx'
import './Profile.css'
import FollowedList from '../../components/followedList/FollowedList.jsx'
/* eslint-disable no-debugger, no-console */

const Profile = () => {
  const { address } = useParams();
  const { Moralis } = useMoralis()
  const [loading, setLoading] = useState(false)
  const [isMe, setIsMe] = useState(false)
  const [data, setData] = useState([])
  const [favData, setFavData] = useState([])
  const [followedData, setFollowedData] = useState([])
  const [followingData, setFollowingData] = useState([])
  let [page, setPage] = useState(0)
  let [favPage, setFavPage] = useState(0)
  let [followedPage, setFollwedPage] = useState(0)
  let [followingPage, setFollowingPage] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [tab, setTab] = useState(0)
  const [followTab, setFollowTab] = useState(0)

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
      setData(data.concat(res))
      setLoading(false)
    } else {
      setHasMore(false)
      setLoading(false)
    }
  }

  const fetchFavorites = async () => {
    setLoading(true)
    const res = await Moralis.Cloud.run("userFavoritePost", { page: favPage })
    if (res.length > 0) {
      setHasMore(true)
      setFavPage(page + 1)
      setFavData(favData.concat(res))
      setLoading(false)
    } else {
      setHasMore(false)
      setLoading(false)
    }
  }

  const fetchFollowed = async () => {
    setLoading(true)
    const res = await Moralis.Cloud.run("followedUsers", {  userId: localStorage.getItem("lastViewdUserId"), page: followedPage })
    if (res.length > 0) {
      setHasMore(true)
      setFollwedPage(followedPage + 1)
      setFollowedData(followedData.concat(res))
      setLoading(false)
    } else {
      setHasMore(false)
      setLoading(false)
    }
  }

  const fetchFollowing = async () => {
    setLoading(true)
    const res = await Moralis.Cloud.run("followingUsers", {  userId: localStorage.getItem("lastViewdUserId"), page: followingPage })
    if (res.length > 0) {
      setHasMore(true)
      setFollowingPage(followingPage + 1)
      setFollowingData(followingData.concat(res))
      setLoading(false)
    } else {
      setHasMore(false)
      setLoading(false)
    }
  }

  const onBottomFetch = () => {
    if (!loading && tab === 0) fetch()
    else if (!loading && tab === 1 && followTab === 0) fetchFollowed()
    else if (!loading && tab === 1 && followTab === 1 ) fetchFollowing()
    else if (!loading && tab === 2) fetchFavorites()
  }

  const tabChange = (active) =>{
    setTab(active)
    setHasMore(false)
    setFavData([])
    setData([])
    setFollowedData([])
    setFollowingData([])
    setFavPage(0)
    setPage(0)
    setFollwedPage(0)
    setFollowingPage(0)
    if(active === 0){
      fetch()
    }else if(active === 1){
      fetchFollowed()
    }else{
      fetchFavorites()
    }
  }

  const followTabChange = (active) =>{
    setFollowTab(active)
    setFollowedData([])
    setFollowingData([])
    setFollwedPage(0)
    setFollowingPage(0)
    if(active === 0){
      fetchFollowed()
    }else if(active === 1){
      fetchFollowing()
    }
  }

  const scrollRef = useBottomScrollListener(onBottomFetch, option);

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setTab(0)
      setFollowTab(0)
      const user = await Moralis.Cloud.run("getUserId", { adr: address })
      setIsMe(user[0].isMe)
      localStorage.setItem("lastViewdUserId", user[0].objectId)
      const res = await Moralis.Cloud.run("userPosts", { userId: localStorage.getItem("lastViewdUserId"), page: 0 })
      setPage(1);
      setData(res)
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
          <ProfileTabProfile isMe={isMe} tab={tab} tabChange={tabChange}/> 
          {tab === 0 && <Posts posts={data}/>}
          {tab === 1 && <FollowedList data={followedData} data2={followingData} followTabChange={followTabChange}/>}
          {tab === 2 && <Posts posts={favData}/>}
          {<div className={'loader-post'}>
            <div className='loader-container'>
              {!hasMore && !loading && <span>Nothing to load</span>}
              {loading && <Loader color={"lime"} size="xl" variant="dots" />}
            </div>
          </div>}
        </div>
      </div>
      <ProfileLeft isMe={isMe} />
    </div>
  )
}

export default Profile