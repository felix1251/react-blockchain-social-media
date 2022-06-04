import React, {useState, useEffect} from 'react'
import './Posts.css'
import Post from '../Post/Post'
import { useMoralisCloudFunction } from 'react-moralis'
import { Loader } from '@mantine/core'
const Posts = () => {

  const [posts, setPosts] = useState()
  const { fetch, data, isLoading } = useMoralisCloudFunction("posts", { address: "" }, { autoFetch: false });

  useEffect(() => {
    const load = async () => {
      fetch()
    }
    load()
  }, [fetch])

  return (
    <div className="Posts">
        {data  && data.map((post, id)=>{
            return <Post data={post} id={id} key={id}/>
        })}
        {isLoading && <div className='loader'><Loader /></div>}
    </div>
  )
}

// { addFields: {
//   hashtags: { $regexFindAll: { input: "$comment", regex: /(?:\s|^)(?:#(?!(?:\d+|\w+?_|_\w+?)(?:\s|$)))(\w+)(?=\s|$)/i } }
// } },

export default Posts