import { Loader } from "@mantine/core";
import React, { lazy, useEffect, useState } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { useMoralis } from "react-moralis";
import "./UserList.css"

const UserCard = lazy(() => import("../../components/UserCard/UserCard.jsx"));
const option = {
      offset: 0,
      debounce: 0,
}

const UserList = () => {
      const { Moralis } = useMoralis();
      const [loading, setLoading] = useState(false);
      const [peps, setPeps] = useState([]);
      const [page, setPage] = useState(0);
      const [hasMore, setHasMore] = useState(false);

      const fetch = async () => {
            setLoading(true);
            const res = await Moralis.Cloud.run("getUsers", { page: page });
            if (res) {
                  setHasMore(true);
                  setPage(page + 1);
                  setPeps(peps.concat(res));
            } else {
                  setHasMore(false);
                  setLoading(false);
            }
            setLoading(false);
      };
      const onBottomFetch = () => {
            if (!loading) fetch();
      };

      const scrollRef = useBottomScrollListener(onBottomFetch, option);

      useEffect(() => {
            const load = async () => {
                  setLoading(true);
                  const res = await Moralis.Cloud.run("getUsers", { page: 0 });
                  setPage(1);
                  setPeps(res);
                  setLoading(false);
            };
            load();
      }, [Moralis]);

      return (
            <div ref={scrollRef} className="user-list">
                  {peps.map((pep, id) => {
                        return <UserCard key={id} username={pep.username} followers={pep.followers}
                              ethAddress={pep.ethAddress} pfp={pep.pfp} isFollowed={pep.isFollowed} isMe={pep.isMe} userId={pep.objectId} />
                  })}
                  {loading && <div className='loader-post'>
                        <div className="userlist-loader">
                              <Loader color={"orange"} size="xl" variant="dots" />
                        </div>
                  </div>}
            </div>
      );
};

export default UserList;
