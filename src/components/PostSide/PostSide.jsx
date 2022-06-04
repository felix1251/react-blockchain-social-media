import React, { useEffect, useState } from 'react'
import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
import './PostSide.css'
import { Loader } from '@mantine/core';

const PostSide = ({posts, isLoading}) => {
  return (
    <div className="PostSide">
      <PostShare />
      <Posts posts={posts} />
      {isLoading && <div className='loader'><Loader /></div>}
    </div>
  )
}

export default PostSide