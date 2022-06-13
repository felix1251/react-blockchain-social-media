import React from 'react'
import "./CommentsCard.css"
import moment from 'moment'

const CommentsCard = (props) => {
      const { comment } = props
      return (
            <div className='comment-card'>
                  <div className='comment-info'>
                        <img className='comment-pfp' src={comment?.commenterData?.pfp} alt='' />
                        <span>{comment?.commenterData?.username}</span>
                        <span>{moment(comment?.createdAt).fromNow()}</span>
                  </div>
                  <div className='actual-comment'>
                        <span>commented - </span>
                        <span>{comment?.comment}</span>
                  </div>
            </div>
      )
}

export default CommentsCard