import React from 'react'
import './Posts.css'
import Post from '../Post/Post'
const Posts = ({posts}) => {
  return (
    <div className="Posts">
      {posts.map((post, id) => {
        return <Post data={post} id={id} key={id}/>
      })}
    </div>
  )
}
export default Posts
