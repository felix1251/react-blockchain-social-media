import React, {useState, useEffect} from 'react'
import './Posts.css'
import Post from '../Post/Post'
import { useMoralisCloudFunction } from 'react-moralis'
const Posts = () => {

  const [posts, setPosts] = useState()
  const { fetch, data } = useMoralisCloudFunction("posts", { address: "" }, { autoFetch: false });

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
    </div>
  )
}

export default Posts