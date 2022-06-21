import React from "react";
import "./FollowedList.css"
import UserCard from "../../components/UserCard/UserCard.jsx"
import { Tabs } from "@mantine/core";

const FollowedList = (props) => {
      const { data, data2, followTabChange } = props
      return (
            <div className="followed-list">
                  <Tabs grow variant="pills" onTabChange={followTabChange} styles={{
                        tabLabel: { fontSize: "15px", fontWeight: 800},
                        root: {borderTop: "3px solid var(--orange)"},
                  }}>
                        <Tabs.Tab label="Followers">
                              {data.map((pep, id) => {
                                    return <UserCard key={id} username={pep.username} followers={pep.followers}
                                          ethAddress={pep.ethAddress} pfp={pep.pfp} isFollowed={pep.isFollowed} isMe={pep.isMe} userId={pep.objectId} />
                              })}
                        </Tabs.Tab>
                        <Tabs.Tab label="Following">
                              {data2.map((pep, id) => {
                                    return <UserCard key={id} username={pep.username} followers={pep.followers}
                                          ethAddress={pep.ethAddress} pfp={pep.pfp} isFollowed={pep.isFollowed} isMe={pep.isMe} userId={pep.objectId} />
                              })}
                        </Tabs.Tab>
                  </Tabs>
            </div>
      );
};

export default FollowedList;
