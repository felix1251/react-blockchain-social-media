import React from 'react'
import { Link } from 'react-router-dom'


const ClassType = (props) => {
      const { type, classId, ethAddress, setNotifOpen} = props
      switch (type) {
            case 1:
                  return<Link className='link' onClick={()=> setNotifOpen()} to={"/u/" + ethAddress}> <div className='class-type-1'>Followed you</div> </Link>
            case 2:
                  return<Link  className='link' onClick={()=> setNotifOpen()} to={"/t/" + classId}><div className='class-type-2' >Like your post</div> </Link>
            case 3:  
                  return<Link className='link' onClick={()=> setNotifOpen()} to={"/t/" + classId}><div className='class-type-3'>Commented your post</div> </Link>
            default:
                  break;
      }
}

export default ClassType