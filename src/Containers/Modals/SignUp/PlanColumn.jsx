import React from 'react'

const PlanColumn = ({ plan, selected, selectPlan, path }) => {
  const selectedClass = selected === plan.name ? 'selected' : ''

  return(
    <ul className={`plan-column column ${selectedClass} ${plan.name}`} onClick={selectPlan.bind(null, plan.name)}>
      <li className="row"><p>{plan.name}</p></li>
      {path !== '/pro/signup' && plan.name === 'basic' ? <div className="free-trial"><p>Free Trial</p></div> : ''}
      {path === '/pro/signup' ? <li className="row"><p>{plan.name === 'fund' ? <i className="fa fa-check" aria-hidden="true"></i> : <i className="fa fa-times" aria-hidden="true"></i>}</p></li> : ''}
      <li className="row"><p>{plan.info.IITFormulas}</p></li>
      <li className="row"><p>{plan.stats.CAGR}%</p></li>
      <li className="row"><p>{plan.stats.WLRatio.toFixed(2)}%</p></li>
      <li className="row"><p>{plan.info.avgGainPerPosition.toFixed(2)}%</p></li>
      <li className="row"><p>{plan.info.avgLossPerPosition.toFixed(2)}%</p></li>
      <li className="row"><p>{plan.info.avgNumOfPosInPortfolio}</p></li>
      <li className="row"><p>{plan.info.IRRGeometricMean}%</p></li>
      <li className="row"><p>{plan.info.sortinoRatio.toFixed(3)}</p></li>
      <li className="row"><p>{plan.info.gainToPainRatio.toFixed(3)}</p></li>

    </ul>)
}

export default PlanColumn
