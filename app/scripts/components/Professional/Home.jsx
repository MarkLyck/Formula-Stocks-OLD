import React from 'react'
import store from '../../store'
import NavBar from './NavBar.jsx'
import Hero from './Hero.jsx'
import WhatIsIt from './WhatIsIt.jsx'
import Probabilities from './Probabilities.jsx'
import Performance from './Performance.jsx'
import RiskReward from './RiskReward.jsx'
import HowWeBeatTheMarket from './HowWeBeatTheMarket.jsx'

import StockAnalysis from './StockAnalysis.jsx'
import MachineLearning from './MachineLearning.jsx'
import ScientificMethod from './ScientificMethod.jsx'
import Statistics from './Statistics.jsx'
import IITs from './IITs.jsx'
import ActiveManagement from './ActiveManagement.jsx'
import InstitutionalCapital from './InstitutionalCapital.jsx'
import WhatWeOffer from './WhatWeOffer.jsx'
import Comparisons from './Comparisons.jsx'
import Recommendations from './Recommendations.jsx'
import Pricing from './Pricing.jsx'
import BacktestedPerformance from './BacktestedPerformance.jsx'
import AboutUs from '../home/AboutUs'
import BottomCTA from './BottomCTA.jsx'
import Footer from '../home/Footer'

class Home extends React.Component {
  componentDidMount() {
    store.market.data.getDJIAData()
    store.market.data.getAnnualData()
  }

  render() {
    return (
      <div className="professional">
        <NavBar/>
        <Hero/>
        <WhatIsIt/>
        <Probabilities/>
        <Performance/>
        <RiskReward/>
        <HowWeBeatTheMarket/>
        {/* <StockAnalysis/> */}
        {/* <MachineLearning/> */}
        {/* <ScientificMethod/> */}
        {/* <Statistics/> */}
        {/* <IITs/> */}
        {/* <ActiveManagement/> */}
        <WhatWeOffer/>
        <Comparisons/>
        <Recommendations/>
        <Pricing/>
        <InstitutionalCapital/>
        <BacktestedPerformance/>
        <AboutUs/>
        <BottomCTA/>
        <Footer/>
      </div>
    )
  }
}

export default Home
