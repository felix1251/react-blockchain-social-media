import React from 'react'
import { UilQuestionCircle } from '@iconscout/react-unicons'
import "./Begin.css"

const Begin = (props) => {
      const {setOpened} = props
      return (
            <div className="float-begin" onClick={()=> setOpened(true)}>
                  <span className="begin">How to begin? <UilQuestionCircle /></span>
            </div>
      )
}

export default Begin