import React, { useState } from "react";
import "./RightSide.css";
import LogoSearch from "../LogoSearch/LogoSearch.jsx";
// import TrendCard from "../TrendCard/TrendCard";
import ShareModal from "../ShareModal/ShareModal.jsx";

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className="RightSide">
      <LogoSearch />
      {/* <TrendCard /> */}
      <button className="button r-button" onClick={() => setModalOpened(true)}>
        Create Post
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default RightSide;
