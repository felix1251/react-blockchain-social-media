import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { useMoralis } from "react-moralis";
import { Loader, LoadingOverlay } from "@mantine/core";
import Begin from "../../components/Begin/Begin.jsx";
import InfoModal from "../../components/InfoModal/InfoModal.jsx";

const load = () => {
  return <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
    <Loader color="orange" size="xl" variant="bars" />
    <span style={{ fontWeight: "600" }}>Initializing...</span>
  </div>
}

const Auth = () => {
  const { isAuthenticating } = useMoralis()
  const [opened, setOpened] = useState()
  return (
    <div className="Auth">
      <>
        <Begin setOpened={setOpened}/>
        <InfoModal opened={opened} setOpened={setOpened} />
      </>
      <LoadingOverlay overlayColor="rgba(0, 0, 0, 0.4)" loader={load()} radius="lg" visible={isAuthenticating} />
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Lixtagram Social</h1>
          <h6>Explore Ideas through blockchain</h6>
        </div>
      </div>
    </div>
  );
};

export default Auth;
