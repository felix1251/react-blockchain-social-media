import React, { useEffect, useRef, useState } from 'react'
import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
import './PostSide.css'

const PostSide = ({ posts, loading, fetchData }) => {

  return (
    <div className="PostSide">
      <PostShare />
      <Posts posts={posts} loading={loading} view="feed" fetchData={fetchData}/>
    </div>
  )
}

export default PostSide