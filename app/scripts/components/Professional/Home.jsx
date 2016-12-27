import React from 'react'
import NavBar from './NavBar.jsx'
import Hero from './Hero.jsx'
import WhatIsIt from './WhatIsIt.jsx'
import Probabilities from './Probabilities.jsx'
import Performance from './Performance.jsx'
import RiskReward from './RiskReward.jsx'
import StockAnalysis from './StockAnalysis.jsx'
import MachineLearning from './MachineLearning.jsx'
import ScientificMethod from './ScientificMethod.jsx'
import Statistics from './Statistics.jsx'

class Home extends React.Component {
  render() {
    return (
      <div className="professional">
        <NavBar/>
        <Hero/>
        <WhatIsIt/>
        <Probabilities/>
        <Performance/>
        <RiskReward/>
        <StockAnalysis/>
        <MachineLearning/>
        <ScientificMethod/>
        <Statistics/>
      </div>
    )
  }
}

export default Home
