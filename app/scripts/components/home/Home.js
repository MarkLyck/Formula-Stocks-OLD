import React from 'React'

import store from '../../store'

import NavBar from '../global/NavBar.jsx'
// import Hero from './Hero'
import Hero from '../global/Hero.jsx'
import AboveAverageReturns from './fiveReasons/AboveAverageReturns'
import ReachYourGoals from './fiveReasons/ReachYourGoals'
import InformationalAdvantage from './fiveReasons/InformationalAdvantage'
import OneDollar from './OneDollar'
import HigherPerformance from './fiveReasons/HigherPerformance'
import WhatIsIt from './WhatIsIt.jsx'
import HowItWorks from './HowItWorks.jsx'
import PilotTest from './PilotTest.jsx'
import Performance from '../global/Performance.jsx'
// import OurProducts from './OurProducts'
import Recommendations from '../global/Recommendations.jsx'
// import PreviousRecommendations from './PreviousRecommendations'
// import TheResults from './Performance.jsx'
import BacktestedPerformance from '../global/BacktestedPerformance.jsx'
// import PricingTable from './PricingTable'
import Pricing from '../global/Pricing.jsx'
import HowWeBeatTheMarket from '../global/HowWeBeatTheMarket.jsx'
import MoreInformation from './MoreInformation.jsx'
// import RewardVSRisk from './RewardVSRisk'
import RiskReward from '../global/RiskReward.jsx'
import Quote from './Quote'
import Comparisons from '../global/Comparisons.jsx'
import CumulativeInterest from './CumulativeInterest'
import Newsletter from './Newsletter'
import AboutUs from './AboutUs'
import ContactUs from './ContactUs'
import BottomCTA from '../global/BottomCTA.jsx'
import Footer from './Footer'

import Modal from '../Modal'
import TermsAndConditions from '../global/TermsAndConditions'
import PrivacyPolicy from '../global/PrivacyPolicy'


const Home = React.createClass({
  getInitialState() {
    return { showModal: false }
  },
  componentDidMount() {
    store.market.data.getAnnualData()
    store.market.data.getDJIAData()
    window.Intercom("boot", {
      app_id: "i194mpvo"
    })
  },
  render () {
    return (
      <div id="home" className="retail">
        <NavBar/>
        <Hero/>
        <WhatIsIt/>
        <HowItWorks/>
        {/* <AboveAverageReturns/> */}
        {/* <ReachYourGoals/> */}
        {/* <InformationalAdvantage/> */}
        {/* <OneDollar/> */}
        {/* <HigherPerformance/> */}
        <OneDollar/>
        <PilotTest/>
        <Performance/>
        {/* <OurProducts/> */}
        {/* <PreviousRecommendations/> */}
        <Recommendations/>
        {/* <TheResults/> */}
        <BacktestedPerformance/>
        {/* <PricingTable/> */}
        <Pricing/>
        <HowWeBeatTheMarket/>
        {/* <MoreInformation /> */}
        {/* <RewardVSRisk/> */}
        <RiskReward/>
        <Comparisons/>
        <Quote/>
        <CumulativeInterest/>
        {/* <Newsletter/> */}
        <AboutUs/>
        <BottomCTA/>
        {/* <ContactUs/> */}
        <Footer/>
        {this.props.children}
      </div>
    )
  }
})

export default Home
