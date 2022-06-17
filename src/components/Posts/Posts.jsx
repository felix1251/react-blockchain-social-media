import React from 'react'
import './Posts.css'
import Post from '../Post/Post'
// import { Tabs } from '@mantine/core';
// import { ArrowsDownUp, Rocket, Users } from 'tabler-icons-react';
const Posts = ({ view, posts}) => {
  return (
    <div className="Posts">
      {/* {view === "profile" &&
        <>
          <Tabs variant="pills" grow={true} style={{ backgroundColor: "var(--card-background)" }}>
            <Tabs.Tab label="Newest" icon={<ArrowsDownUp size={20} />}></Tabs.Tab>
            <Tabs.Tab label="Rockets" icon={<Rocket size={20} />}></Tabs.Tab>
            <Tabs.Tab label="People" icon={<Users size={20} />}></Tabs.Tab>
          </Tabs>
        </>
      } */}
      {posts.map((post, id) => {
        return <Post data={post} id={id} key={id} />
      })}
    </div>
  )
}
export default Posts
