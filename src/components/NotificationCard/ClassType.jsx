import React from 'react'

const ClassType = (props) => {
      const { type } = props
      switch (type) {
            case 1:
                  return<div className='class-type-1'>Followed you</div> 
            case 2:
                  return<div className='class-type-2' >Like your post</div> 
            case 3:  
                  return<div className='class-type-3'>Commented your post</div> 
            default:
                  break;
      }
}

export default ClassType