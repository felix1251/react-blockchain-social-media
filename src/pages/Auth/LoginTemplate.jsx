import React, { useState } from "react";
import "./Auth.css";
import { useMoralis } from "react-moralis";

function LogIn() {
      const [email, setEmail] = useState("")
      const [password, setPassword] = useState("")
      const { login } = useMoralis()

      const send = (e) => {
            e.preventDefault()
            login(email, password)
      }
      return (
            <div className="a-right">
                  <form className="infoForm authForm">
                        <span><b>Log In</b></span>
                        <div>
                              <input value={email} type="text" placeholder="Username" className="infoInput" onChange={e=> setEmail(e.target.value)}/>
                        </div>
                        <div>
                              <input value={password} type="password" className="infoInput" placeholder="Password" onChange={e=> setPassword(e.target.value)}/>
                        </div>
                        <div>
                              <span style={{ fontSize: "12px" }}>
                                    Don't have an account Sign up
                              </span>
                              <button className="button infoButton" onClick={(e)=> send(e)}>Login</button>
                        </div>
                  </form>
            </div>
      );
}

export default LogIn;
