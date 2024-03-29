import React, { useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal.jsx/ProfileModal.jsx";
import { useMoralis } from "react-moralis";

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const {logout} = useMoralis()
  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Edit Info</h4>
        <div>
          <UilPen
            width="2rem"
            height="1.2rem"
            onClick={() => setModalOpened(true)}
          />
          <ProfileModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
          />
        </div>
      </div>
      <button className="button logout-button" onClick={()=> logout()}>Logout</button>
    </div>
  );
};

export default InfoCard;
