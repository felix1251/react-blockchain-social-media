import React, { useState } from "react";
import { UilBell, UilCommentAltDots, UilUserCircle, UilSearch, UilImagePlus, UilUsersAlt } from "@iconscout/react-unicons";
import { UisHouseUser } from '@iconscout/react-unicons-solid'
import "./Nav.css";
import { Link } from "react-router-dom";
import ShareModal from "../ShareModal/ShareModal";
const Nav = () => {
      const [modalOpened, setModalOpened] = useState(false);
      return (
            <div className="navIcons">
                  <Link to="/">
                        <UisHouseUser className="Icon" />
                  </Link>
                  <Link to="/u">
                        <UilUserCircle className="Icon" />
                  </Link>
                  <UilImagePlus className="Icon Hide-Show-Icon" onClick={() => setModalOpened(true)} />
                  <UilSearch className="Icon Hide-Show-Icon" />
                  <UilUsersAlt className="Icon"/>
                  <UilBell className="Icon" />
                  <UilCommentAltDots className="Icon" />
                  <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
            </div>
      );
};

export default Nav;
