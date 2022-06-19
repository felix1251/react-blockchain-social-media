import { Drawer } from '@mantine/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { UilUserCircle } from "@iconscout/react-unicons";
import { Button } from '@mantine/core';
import { useMoralis } from 'react-moralis';
import "./MobileProfileNav.css"

const MobileProfileNav = (props) => {
      const { setProfileOpen, profileOpen } = props
      const { user, logout } = useMoralis()
      return (
            <Drawer
                  opened={profileOpen}
                  onClose={() => setProfileOpen(false)}
                  title="Options"
                  padding="sm"
                  size="sm"
                  position="top"
                  styles={{
                        drawer: {
                              color: 'var(--white)', backgroundColor: "var(--card-background)", height: 200, fontSize: "18px"
                        },
                        closeButton: { display: "none" },
                        title: { fontWeight: 800, fontSize: "20px" },

                  }}
            >
                  <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", gap: "1.3rem" }}>
                        <Link onClick={() => setProfileOpen(false)} style={{
                              color: "var(--white)", textDecoration: "none", display: "flex",
                              alignItems: "center",
                        }} to={`/u/${user.attributes.ethAddress}`}>
                              <UilUserCircle className="profile-nav-Icon" />
                              {" "}Go to Profile
                        </Link>
                        <Link to="/auth">
                              <Button onClick={() => logout()} color="orange">
                                    Logout
                              </Button>
                        </Link>
                  </div>

            </Drawer>
      )
}

export default MobileProfileNav