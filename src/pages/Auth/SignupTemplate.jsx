import React from "react";
import "./Auth.css";

function LogIn() {
      return (
            <div className="a-right">
                  <form className="infoForm authForm">
                        <h3>Sign up</h3>
                        <div>
                              <input
                                    type="text"
                                    placeholder="First Name"
                                    className="infoInput"
                                    name="firstname"
                              />
                              <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="infoInput"
                                    name="lastname"
                              />
                        </div>

                        <div>
                              <input
                                    type="text"
                                    className="infoInput"
                                    name="username"
                                    placeholder="Usernames"
                              />
                        </div>

                        <div>
                              <input
                                    type="text"
                                    className="infoInput"
                                    name="password"
                                    placeholder="Password"
                              />
                              <input
                                    type="text"
                                    className="infoInput"
                                    name="confirmpass"
                                    placeholder="Confirm Password"
                              />
                        </div>

                        <div>
                              <span style={{ fontSize: '12px' }}>Already have an account. Login!</span>
                        </div>
                        <button className="button infoButton" type="submit">Signup</button>
                  </form>
            </div>
      );
}

export default LogIn;
