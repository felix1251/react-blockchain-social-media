import React, { useState } from "react";
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
      const [profileOpen, setProfileOpen] = useState(false)
      const [data, setData] = useState([])
      const [loading, setLoading] = useState(false)
      const [page, setPage] = useState(0)
      const [hasMore, setHasMore] = useState(false)

      const openNotif = () => {
            setNotifOpen(!notifOpen)
            setPage(0)
            setData([])
            if (!notifOpen) notifFetch()
      }

      const notifFetch = async () => {
            setLoading(true)
            const res = await Moralis.Cloud.run("getNotif", { type: 2, page: page })
            if (res.length > 0) {
                  setHasMore(true)
                  setPage(page + 1)
                  setData(data.concat(res))
            } else {
                  setHasMore(false)
            }
            setLoading(false)
      }

      return (
            <>
                  <div className="Mobile-navIcons">
                        <div className="Icon-List">
                              <Link to="/">
                                    <UisHouseUser className="Mobile-Icon" />
                              </Link>
                              <UilImagePlus className="Mobile-Icon" onClick={() => setModalOpened(true)} />
                              <Link to={"/p"}>
                                    <UilUsersAlt className="Mobile-Icon" />
                              </Link>
                              <UilSearch className="Mobile-Icon" />
                              <Indicator inline label={user.attributes.unReadNotif} size={17} color="red" offset={5} position="top-end">
                                    <UilBell className="Mobile-Icon" onClick={() => openNotif()} />
                              </Indicator>
                              <UilUserCircle className="Mobile-Icon" onClick={()=> setProfileOpen(!profileOpen)}/>
                              
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
