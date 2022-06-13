import React from 'react'
import "./NotificationCard.css"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ClassType from './ClassType';
import { Link } from 'react-router-dom';

const NotificationCard = (props) => {
      const { username, type, classId, ethAddress, setNotifOpen, userId, pfp } = props
      return (
            <div className='notification-card'>
                  <div className='pfp'>
                        <Link to={`/u/${ethAddress}`} onClick={()=>setNotifOpen() }>
                              <LazyLoadImage className='notif-pic' src={pfp} alt="" />
                        </Link>
                        <span>{username.slice(0, 14)}{username.length > 14 && "...."}</span>
                  </div>
                  <div className='card-view'>
                        <ClassType className="class-type" type={type} />
                  </div>

            </div>
      )
}

export default NotificationCard