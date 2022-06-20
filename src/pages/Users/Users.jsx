import React, { Component, lazy, Suspense } from 'react'
import "./Users.css"
const ProfileSide = lazy(() => import("../../components/profileSide/ProfileSide.jsx"));
const RightSide = lazy(() => import("../../components/RightSide/RightSide.jsx"));
const UserList = lazy(() => import("../../components/Users/UserList.jsx"));

const Users = () => {
      return (
            <div className='Users'>
                  <Suspense callback={<div>Loading...</div>}>
                        <RightSide />
                        <UserList />
                        <ProfileSide />
                  </Suspense>
            </div>
      )
}

export default Users