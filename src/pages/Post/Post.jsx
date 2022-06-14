import React, { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { useParams } from 'react-router-dom'
import RightSide from '../../components/RightSide/RightSide'
import Comments from '../../components/SinglePost/Comments'
import SinglePost from '../../components/SinglePost/SinglePost'
import "./Post.css"

const Post = () => {
      const { id } = useParams()
      const [postData, setPostData] = useState()
      const { Moralis } = useMoralis()
      const [loading, setLoading] = useState(false)
      const [comments, setComments] = useState([])
      

      useEffect(() => {
            const load = async () => {
                  setLoading(true)
                  const post = await Moralis.Cloud.run("getSinglePost", { postId: "Tc2tgT7H5URbgoM1aseyx0qO"})
                  const comm = await Moralis.Cloud.run("postComments", { postId: "Tc2tgT7H5URbgoM1aseyx0qO" })
                  setPostData(post[0])
                  setComments(comm)
                  setLoading(false)
            }
            load()
      }, [Moralis, id])

      return (
            <div className='post-page'>
                  <RightSide />
                  {postData ? <SinglePost data={postData}/> : <div>fetching...</div>}
                  <Comments comments={comments} postId={id} loading={loading}/>
            </div>
      )
}

export default Post