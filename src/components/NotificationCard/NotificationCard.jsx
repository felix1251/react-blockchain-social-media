import React from 'react'
import "./NotificationCard.css"
import { LazyLoadImage } from 'react-lazy-load-image-component';

const NotificationCard = (props) => {
      const { username, type, classId, pfp } = props
      return (
            <div className='notification-card'>
                  <div className='pfp'>
                        <LazyLoadImage className='notif-pic' src={pfp} alt="" />
                        <span>{username.slice(0, 14)}{username.length > 14 && "...."}</span>
                  </div>
                  <div className='card-view'>
                        <div>{type}</div>
                  </div>
            </div>
      )
}

export default NotificationCard