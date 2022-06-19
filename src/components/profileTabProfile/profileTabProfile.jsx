import React from 'react'
import { Tabs } from '@mantine/core';
import { ArrowsDownUp, Users, Bookmark } from 'tabler-icons-react';
import "./profileTabProfile.css"

const profileTabProfile = (props) => {
      const {isMe, tabChange , tab} = props
      return (
            <Tabs onTabChange={tabChange} variant="pills" active={tab} grow={true} style={{ backgroundColor: "var(--card-background)" }}>
                  <Tabs.Tab label="Posts" icon={<ArrowsDownUp size={20} />}></Tabs.Tab>
                  <Tabs.Tab label="People" icon={<Users size={20} />}></Tabs.Tab>
                  {isMe && <Tabs.Tab label="favorites" icon={<Bookmark size={20} />}></Tabs.Tab>}
            </Tabs>
      )
}

export default profileTabProfile