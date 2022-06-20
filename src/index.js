import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { MoralisProvider } from "react-moralis";

ReactDOM.render(
  <MoralisProvider appId={"htfD1mv4ftJ2qWhnZctXBQ5KIGok11ljgSiI03vF"} serverUrl={"https://ctvvfafsmuwk.usemoralis.com:2053/server"} >
    <App />
  </MoralisProvider>,
  document.getElementById("root")
);

