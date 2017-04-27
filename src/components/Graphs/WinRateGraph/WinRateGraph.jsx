import React from 'react'
import './winRateGraph.css'

const WinRateGraph = ({ planData }) => {

  let preStyle = { height: `${planData['premium'] ? 10 : 0 }%` }
  let busStyle = { height: `${planData['business'] ? 10 : 0 }%` }
  let funStyle = { height: `${planData['fund'] ? 10 : 0 }%` }
  let marStyle = { height: `${59}%` }


  return (
    <div className="win-rate-graph">
      <div className="bar premium-bar" style={preStyle}><p>{planData['premium'] ? 10 : 0 }%</p><p className="plan-name">Premium</p></div>
      <div className="bar business-bar" style={busStyle}><p>{planData['business'] ? 10 : 0 }%</p><p className="plan-name">Business</p></div>
      <div className="bar fund-bar" style={funStyle}><p>{planData['fund'] ? 10 : 0 }%</p><p className="plan-name">Fund</p></div>
      <div className="sp-bar" style={marStyle}><p>{59}%</p><p className="plan-name">Market</p></div>
    </div>
  )
}

export default WinRateGraph
