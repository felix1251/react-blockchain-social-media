import { Modal } from '@mantine/core'
import React from 'react'
import { ReactComponent as MetaMask } from "../../img/metamask.svg"
import Tutorial from "../../img/tutorial.png"
import "./InfoModal.css"

const InfoModal = (props) => {
      const { opened, setOpened } = props
      return (
            <Modal
                  opened={opened}
                  trapFocus={false}
                  onClose={() => setOpened(false)}
                  classNames={{ modal: 'Info-Modal' }}
                  title="How to begin?"
                  styles={{ title: { fontWeight: 600, fontSize: "20px" } }}
            >
                  <div className='tutorial'>
                        <div className='step'>
                              <h4>1. Create Ethereum Wallet Account</h4>
                              <span>Most Common(MetaMask)</span>
                              <a className='metamask-btn' href="https://metamask.io/download/"  target="_blank"><MetaMask className='metamask' />Download MetaMask</a>
                        </div>
                        <div className='step'>
                              <h4>2. Login using provider</h4>
                              <img src={Tutorial} alt=""/>
                        </div>
                        <div className='step'>
                              <h4>2. Done!</h4>
                              <span>The site will automatically give you random hash username, you can modify your profile as you wish.</span>
                        </div>
                  </div>
            </Modal>
      )
}

export default InfoModal