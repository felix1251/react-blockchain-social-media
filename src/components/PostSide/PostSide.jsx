import React, { useEffect, useState } from 'react'
import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
import './PostSide.css'
import { Loader } from '@mantine/core';

const PostSide = () => {
  return (
    <div className="PostSide">
      <PostShare />
      <Posts/>
    </div>
  )
}

export default PostSide