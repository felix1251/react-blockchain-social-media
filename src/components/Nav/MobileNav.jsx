import React, { useEffect, useState } from "react";
import { UilBell, UilUserCircle, UilSearch, UilImagePlus, UilUsersAlt } from "@iconscout/react-unicons";
import { UisHouseUser } from '@iconscout/react-unicons-solid'
import "./MobileNav.css";
import { Link } from "react-router-dom";
import ShareModal from "../ShareModal/ShareModal";
import { useMoralis } from "react-moralis";
import { Indicator } from "@mantine/core";
import NotificationModal from "../NotificationModal/NotificationModal.jsx";
import MobileProfileNav from "../MobileProfileNav/MobileProfileNav";

const MobileNav = () => {
      const [modalOpened, setModalOpened] = useState(false);
      const { user, Moralis } = useMoralis()
      const [notifOpen, setNotifOpen] = useState(false);
      const [notifCount, setNotifCount] = useState(0);
      const [profileOpen, setProfileOpen] = useState(false)
      const [data, setData] = useState([])
      const [loading, setLoading] = useState(false)
      const [page, setPage] = useState(0)
      const [hasMore, setHasMore] = useState(false)

      const openNotif =  async() => {
            setNotifOpen(!notifOpen)
            setPage(0)
            setData([])
            if (!notifOpen) {
                  notifFetch()
                  const res = await Moralis.Cloud.run("clearNotifNumber")
                  setNotifCount(res)
            }
      }

      const closeOnly = () =>{
            setNotifOpen(false)
            setPage(0)
            setData([])
      }

      const notifFetch = async () => {
            setLoading(true)
            const res = await Moralis.Cloud.run("getNotif", { page: page })
            if (res.length > 0) {
                  setHasMore(true)
                  setPage(page + 1)
                  setData(data.concat(res))
            } else {
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
                  <div className="Mobile-navIcons">
                        <div className="Icon-List">
                              <Link to="/">
                                    <UisHouseUser className="Mobile-Icon" onClick={() => closeOnly()} />
                              </Link>
                              <UilImagePlus className="Mobile-Icon" onClick={() =>{ 
                                    setModalOpened(true)
                                    closeOnly()
                              }} />
                              <Link to={"/p"}>
                                    <UilUsersAlt className="Mobile-Icon" onClick={() => closeOnly()} />
                              </Link>
                              <UilSearch className="Mobile-Icon" />
                              <Indicator inline label={notifCount} size={17} color="red" offset={5} position="top-end">
                                    <UilBell className="Mobile-Icon" onClick={() => openNotif()} />
                              </Indicator>
                              <UilUserCircle className="Mobile-Icon" onClick={()=> {
                                    setProfileOpen(!profileOpen)
                                    closeOnly()
                              }}/>
                              
                        </div>
                  </div>
                  <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
                  <MobileProfileNav setProfileOpen={setProfileOpen} profileOpen={profileOpen} />
                  <NotificationModal notifOpen={notifOpen} setNotifOpen={openNotif} notifFetch={notifFetch} hasMore={hasMore}
                        loading={loading} position={"bottom"} size={"lg"} padding={"sm"} data={data} notifHeight={245} />
            </>

      );
};
export default MobileNav;
