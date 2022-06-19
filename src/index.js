import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MoralisProvider } from "react-moralis";
import env from "react-dotenv";

ReactDOM.render(
  <MoralisProvider appId={env.APP_ID} serverUrl={env.SERVER_URL} >
    <App />
  </MoralisProvider>,
  document.getElementById("root")
);

