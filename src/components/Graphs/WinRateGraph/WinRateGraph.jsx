import React from 'react'
import './winRateGraph.css'

const WinRateGraph = ({ planData = {} }) => {

  let preStyle = { height: `${planData['premium'] ? Math.floor(planData['premium'].stats.WLRatio) : 0 }%` }
  let busStyle = { height: `${planData['business'] ? Math.floor(planData['business'].stats.WLRatio) : 0 }%` }
  let funStyle = { height: `${planData['fund'] ? Math.floor(planData['fund'].stats.WLRatio) : 0 }%` }
  let marStyle = { height: `59%` }

  return (
    <div className="win-rate-graph">
      <div className="bar premium-bar" style={preStyle}><p>{planData['premium'] ? Math.floor(planData['premium'].stats.WLRatio) : 0 }%</p><p className="plan-name">Premium</p></div>
      <div className="bar business-bar" style={busStyle}><p>{planData['business'] ? Math.floor(planData['business'].stats.WLRatio) : 0 }%</p><p className="plan-name">Business</p></div>
      <div className="bar fund-bar" style={funStyle}><p>{planData['fund'] ? Math.floor(planData['fund'].stats.WLRatio) : 0 }%</p><p className="plan-name">Fund</p></div>
      <div className="sp-bar" style={marStyle}><p>{59}%</p><p className="plan-name">Market</p></div>
    </div>
  )
}

export default WinRateGraph
