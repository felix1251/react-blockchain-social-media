import React from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { useMoralis } from "react-moralis";
import { Loader, LoadingOverlay } from "@mantine/core";

const load = () => {
  return <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem"}}>
    <Loader color="orange" size="xl" variant="bars" />
    <span style={{fontWeight: "600"}}>Initializing...</span>
  </div>
}

const Auth = () => {
  const { isAuthenticating } = useMoralis()
  return (
    <div className="Auth">
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
