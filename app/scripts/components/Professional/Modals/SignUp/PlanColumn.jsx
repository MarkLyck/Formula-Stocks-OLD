import React from 'react'

const PlanColumn = ({ plan, selected, selectPlan }) => {
  const selectedClass = selected === plan.name ? 'selected' : ''

  let license = plan.name === 'premium' ? 'personal' : plan.name === 'business' ? 'personal / corporate' : plan.name === 'fund' ? 'institutional' : 'personal'
  return(
    <ul className={`plan-column column ${selectedClass}`} onClick={selectPlan.bind(null, plan.name)}>
      <li className="row"><p>{plan.name}</p></li>

      <li className="row"><p>{plan.name === 'fund' ? <i className="fa fa-check" aria-hidden="true"></i> : <i className="fa fa-times" aria-hidden="true"></i>}</p></li>
      <li className="row"><p>{plan.info.IITFormulas}</p></li>
      <li className="row"><p>{plan.stats.CAGR}%</p></li>
      <li className="row"><p>{plan.stats.WLRatio.toFixed(2)}%</p></li>
      <li className="row"><p>{plan.info.avgGainPerPosition.toFixed(2)}%</p></li>
      <li className="row"><p>{plan.info.avgGainPerPosition.toFixed(2)}%</p></li>
      <li className="row"><p>{plan.info.avgNumOfPosInPortfolio}</p></li>
      <li className="row"><p>{plan.info.IRRGeometricMean}%</p></li>
      <li className="row"><p>{plan.info.sortinoRatio}</p></li>
      <li className="row"><p>{plan.info.gainToPainRatio}</p></li>
    </ul>)
}

export default PlanColumn
