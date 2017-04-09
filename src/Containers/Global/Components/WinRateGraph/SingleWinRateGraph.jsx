import React from 'react'
import './winRateGraph.css'

const SingleWinRateGraph = ({ fsWinRate, marketWinRate, name }) => {
  let fsStyle = { height: `${fsWinRate}%` }
  let marStyle = { height: `${marketWinRate}%` }

  return (
    <div className="win-rate-graph single-win-rate-graph">
      <div className="graph-beside">
        <div className="bar fs-bar" style={fsStyle}><p>{fsWinRate}%</p><p className="plan-name">{name}</p></div>
        <div className="sp-bar" style={marStyle}><p>{marketWinRate}%</p><p className="plan-name">Market</p></div>
      </div>
      <h3>Winners in %</h3>
    </div>
  )
}

export default SingleWinRateGraph
