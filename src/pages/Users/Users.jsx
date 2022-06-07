import React, { Component, lazy, Suspense } from 'react'
import "./Users.css"
const ProfileSide = lazy(() => import("../../components/profileSide/ProfileSide"));
const RightSide = lazy(() => import("../../components/RightSide/RightSide"));
const UserList = lazy(() => import("../../components/Users/UserList"));

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