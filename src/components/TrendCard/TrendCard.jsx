import React from 'react'
import './TrendCard.css'

import {TrendData} from '../../Data/TrendData.js'
const TrendCard = () => {
  return (
    <div className="TrendCard">
            <h3>Trends for you</h3>
            {TrendData.map((trend, key)=>{
                return(
                    <div key={key} className="trend">
                        <span>#{trend.name}</span>
                        <span>{trend.shares}k posts</span>
                    </div>
                )
            })}
    </div>
  )
}

export default TrendCard