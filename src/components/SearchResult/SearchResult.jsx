import { Avatar, Paper } from '@mantine/core'
import React from 'react'
import { Link } from 'react-router-dom'
import "./SearchResult.css"
const SearchResult = (props) => {
      const {ethAddress, pfp, username, closeModal} = props
      return (
            <Paper className='results' component={Link} to={"/u/"+ethAddress} onClick={()=>closeModal()}>
                  <Avatar
                        size={35}
                        radius={"50%"}
                        src={pfp}
                        alt=""
                  />
                  <div className='result-info'>
                        <span>{username.slice(0, 20)} {username.length >= 20 && "..."}</span>
                        <span>{ethAddress.slice(0, 5)}...{ethAddress.slice(36)} </span>
                  </div>
            </Paper>
      )
}

export default SearchResult