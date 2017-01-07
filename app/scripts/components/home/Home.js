import React from 'React'

import store from '../../store'

import NavBar from '../global/NavBar.jsx'
import Hero from '../global/Hero.jsx'
import Introduction from './Introduction.jsx'
import Experienced from './Experienced.jsx'
import OneDollar from './OneDollar'
import WhatIsIt from './WhatIsIt.jsx'
import HowItWorks from './HowItWorks.jsx'
import PilotTest from './PilotTest.jsx'
import Performance from '../global/Performance.jsx'
// import OurProducts from './OurProducts'
import Recommendations from '../global/Recommendations.jsx'
import BacktestedPerformance from '../global/BacktestedPerformance.jsx'
import Pricing from '../global/Pricing.jsx'
import HowWeBeatTheMarket from '../global/HowWeBeatTheMarket.jsx'
import MoreInformation from './MoreInformation.jsx'
import RiskReward from '../global/RiskReward.jsx'
import Quote from './Quote'
import Comparisons from '../global/Comparisons.jsx'
import CumulativeInterest from './CumulativeInterest'
import AboutUs from './AboutUs'
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
        <Introduction/>
        <Experienced/>
        <WhatIsIt/>
        <HowItWorks/>
        <OneDollar/>
        <PilotTest/>
        <Performance/>
        {/* <OurProducts/> */}
        <Recommendations/>
        <BacktestedPerformance/>
        <Pricing/>
        <HowWeBeatTheMarket/>
        <RiskReward/>
        <Comparisons/>
        <Quote/>
        <CumulativeInterest/>
        <AboutUs/>
        <BottomCTA/>
        <Footer/>
        {this.props.children}
      </div>
    )
  }
})

export default Home
