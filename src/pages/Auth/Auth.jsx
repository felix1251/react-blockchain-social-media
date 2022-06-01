import React, { useEffect } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
// import LogIn from "./LoginTemplate";
const Auth = () => {
  // const { user } = useMoralis()
  return (
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Lixtagram Social</h1>
          <h6>Explore Ideas through blockchain</h6>
        </div>
          {/* <div className="Sign">
            <div>Sign in through Ethereum(crypto) account</div>
          </div> */}
      </div>
    </div>
  );
};

export default Auth;
