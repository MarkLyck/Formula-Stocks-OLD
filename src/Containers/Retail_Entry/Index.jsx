import React from 'react'
import store from '../../store'

import NavBar from '../Global/Navbar/Navbar'
import Hero from '../Global/HeroSlider/HeroSlider'
import Introduction from './Introduction/Introduction'
import WhatIsIt from './WhatIsIt/WhatIsIt'
import SingleLaunchPerformance from '../Global/Performance/SingleLaunchPerformance'
import SingleBacktestedPerformance from '../Global/Performance/SingleBacktestedPerformance'
import PerformanceMatters from './PerformanceMatters/PerformanceMatters'
// import WhatYouGet from './WhatYouGet/WhatYouGet'
// import RiskReward from '../Global/RiskReward/RiskReward'
// import BacktestedPerformance from '../Global/Performance/BacktestedPerformance'
// import OneDollar from './OneDollar/OneDollar'
// import Pricing from '../Global/Pricing/Pricing'
import PilotTest from '../Global/PilotTest/PilotTest'
import FirstMonthOnUs from './FirstMonthOnUs/FirstMonthOnUs'
import WhatToExpect from './WhatToExpect/WhatToExpect'
import RiskManagement from './RiskManagement/RiskManagement'
// import ScatterPlot from '../Global/ScatterPlot/ScatterPlot'
import HowWeBeatTheMarket from './HowWeBeatTheMarket/HowWeBeatTheMarket'
import Quote from '../Global/Quote/Quote'
// import Comparisons from '../Global/Comparisons/Comparisons'
import CagrCalculator from '../Global/CagrCalculator/CagrCalculator'
import AboutUs from '../Global/AboutUs/AboutUs'
import IntendedAudience from './IntendedAudience/IntendedAudience'
import BottomCTA from '../Global/BottomCTA/BottomCTA'
import Footer from '../Global/Footer/Footer'

class Home extends React.Component {
  componentDidMount() {
    store.plans.get('basic').fetch()
    store.plans.get('premium').fetch()
    store.plans.get('business').fetch()
    store.market.data.getAnnualData()
    store.market.data.getDJIAData()
    window.Intercom("boot", {
      app_id: "i194mpvo"
    })
  }

  render() {
    return (
      <div id="home" className="retail">
        <NavBar/>
        <Hero/>
        <Introduction/>
        <WhatIsIt/>
        <SingleLaunchPerformance plan="basic" name="Entry"/>
        <PerformanceMatters/>
        <FirstMonthOnUs/>
        <WhatToExpect/>
        <PilotTest/>
        <SingleBacktestedPerformance plan="basic" name="Entry"/>
        <RiskManagement/>
        <HowWeBeatTheMarket/>
        <Quote/>
        <CagrCalculator/>
        <AboutUs/>
        <IntendedAudience/>
        <BottomCTA/>
        <Footer/>
        {this.props.children}
      </div>
    )
  }
}

export default Home
