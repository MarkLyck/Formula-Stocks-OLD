import React from 'react'
import store from '../../store'

import NavBar from '../Global/Navbar/Navbar'
import Hero from '../Global/Hero/Hero'
// import Banner from './Banner/Banner'
import Introduction from './Introduction/Introduction'
import Professional from './Professional/Professional'
import WhatIsIt from './WhatIsIt/WhatIsIt'
import LaunchPerformance from '../Global/Performance/LaunchPerformance'
import HowWeCreateValue from './HowWeCreateValue/HowWeCreateValue'
import WhatYouGet from './WhatYouGet/WhatYouGet'
import RiskReward from '../Global/RiskReward/RiskReward'
import BacktestedPerformance from '../Global/Performance/BacktestedPerformance'
import OneDollar from './OneDollar/OneDollar'
import Pricing from '../Global/Pricing/Pricing'
import PilotTest from './PilotTest/PilotTest'
import ScatterPlot from '../Global/ScatterPlot/ScatterPlot'
import HowWeBeatTheMarket from '../Global/HowWeBeatTheMarket/HowWeBeatTheMarket'
import Quote from './Quote/Quote'
import Comparisons from '../Global/Comparisons/Comparisons'
import CagrCalculator from './CagrCalculator/CagrCalculator'
import AboutUs from '../Global/AboutUs/AboutUs'
import BottomCTA from '../Global/BottomCTA/BottomCTA'
import Footer from '../Global/Footer/Footer'

class Home extends React.Component {
  componentDidMount() {
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
        {/* <Banner/> */}
        <Introduction/>
        <Professional/>
        <WhatIsIt/>
        <LaunchPerformance/>
        <HowWeCreateValue/>
        <WhatYouGet/>
        <RiskReward/>
        <BacktestedPerformance/>
        <OneDollar/>
        <Pricing/>
        <PilotTest/>
        <ScatterPlot/>
        <HowWeBeatTheMarket/>
        <Quote/>
        <Comparisons/>
        <CagrCalculator/>
        <AboutUs/>
        <BottomCTA/>
        <Footer/>
        {this.props.children}
      </div>
    )
  }
}

export default Home
