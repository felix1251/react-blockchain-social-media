import React, { useEffect, useState } from "react";
import { UilBell, UilUserCircle, UilSearch, UilImagePlus, UilUsersAlt } from "@iconscout/react-unicons";
import { UisHouseUser } from '@iconscout/react-unicons-solid'
import "./Nav.css";
import { Link } from "react-router-dom";
import ShareModal from "../ShareModal/ShareModal";
import { useMoralis } from "react-moralis";
import { Indicator } from "@mantine/core";
import NotificationModal from "../NotificationModal/NotificationModal";
const Nav = () => {
      const [modalOpened, setModalOpened] = useState(false);
      const { user, Moralis } = useMoralis()
      const [notifOpen, setNotifOpen] = useState(false);
      const [notifCount, setNotifCount] = useState(localStorage.getItem("userNotifNumber"));
      const [data, setData] = useState([])
      const [loading, setLoading] = useState(false)
      const [page, setPage] = useState(0)
      const [hasMore, setHasMore] = useState(false)

      const openNotif = async () => {
            setNotifOpen(!notifOpen)
            setPage(0) 
            setData([])
            if(!notifOpen){
                  notifFetch()
                  const res = await Moralis.Cloud.run("clearNotifNumber")
                  setNotifCount(res)
            }
      }

      const notifFetch = async () => {
            setLoading(true)
            const res = await Moralis.Cloud.run("getNotif", { page: page })
            if (res.length > 0) {
                  setHasMore(true)
                  setPage(page + 1)
                  setData(data.concat(res))
            }else{
                  setHasMore(false)
            }
            setLoading(false)
      }

      useEffect(() => {
            const load = async () =>{
                  const res = await Moralis.Cloud.run("userNotifNumber")
                  setNotifCount(res.attributes.unReadNotif)
            }
            load()
      }, [Moralis])
      
      return (
            <>
                  <div className="navIcons">
                        <Link to="/">
                              <UisHouseUser className="Icon" />
                        </Link>
                        <UilImagePlus className="Icon Hide-Show-Icon" onClick={() => setModalOpened(true)} />
                        <Link to={"/p"}>
                              <UilUsersAlt className="Icon" />
                        </Link>
                        <UilSearch className="Icon Hide-Show-Icon" />
                        <Indicator inline label={notifCount} size={17} color="red" offset={5} position="bottom-end">
                              <UilBell className="Mobile-Icon" onClick={() => openNotif()} />
                        </Indicator>
                        <Link to={`/u/${user.attributes.ethAddress}`}>
                              <UilUserCircle className="Mobile-Icon" />
                        </Link>
                  </div>
                  <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
                  <NotificationModal notifOpen={notifOpen} setNotifOpen={openNotif} loading={loading} notifFetch={notifFetch}
                  hasMore={hasMore} position={"right"} size={"xl"} padding={"md"} data={data} notifHeight={400}/>
            </>

      );
};

export default Nav;
