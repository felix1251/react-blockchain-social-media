import React, { useState } from 'react'
import "./NotificationCard.css"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ClassType from './ClassType';
import { Link } from 'react-router-dom';

const NotificationCard = (props) => {
      const { username, type, viewed ,classId, ethAddress, setNotifOpen, userId, pfp } = props

      return (
            <div className={ `${!viewed && "viewed"} notification-card`}>
                  <div className='pfp'>
                        <Link to={`/u/${ethAddress}`} onClick={()=>setNotifOpen() }>
                              <LazyLoadImage className='notif-pic' src={pfp} alt="" />
                        </Link>
                        <span>{username.slice(0, 14)}{username.length > 14 && "...."}</span>
                  </div>
                  <div className='card-view'>
                        <ClassType className="class-type" setNotifOpen={setNotifOpen} type={type} classId={classId} ethAddress={ethAddress}/>
                  </div>
            </div>
      )
}

export default NotificationCard