import React from "react";
import { ConnectButton } from "web3uikit";
import './ConnectButton.css'
const ConnectButtonProvider = () => {
      return (
            <nav className="Header-Wallet" >
                  <ConnectButton moralisAuth={true} signingMessage="Connect Wallet to Lixtagram" />
            </nav>

      );
};


export default ConnectButtonProvider;
