import React from 'React'

import store from '../../store'

import NavBar from '../global/NavBar.jsx'
import Hero from './Hero'
import AboveAverageReturns from './fiveReasons/AboveAverageReturns'
import ReachYourGoals from './fiveReasons/ReachYourGoals'
import InformationalAdvantage from './fiveReasons/InformationalAdvantage'
import OneDollar from './fiveReasons/OneDollar'
import HigherPerformance from './fiveReasons/HigherPerformance'
import OurProducts from './OurProducts'
import PreviousRecommendations from './PreviousRecommendations'
import TheResults from './Performance.jsx'
// import PricingTable from './PricingTable'
import Pricing from '../global/Pricing.jsx'
import HowWeBeatTheMarket from '../global/HowWeBeatTheMarket.jsx'
import MoreInformation from './MoreInformation.jsx'
import RewardVSRisk from './RewardVSRisk'
import Quote from './Quote'
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
    window.Intercom("boot", {
      app_id: "i194mpvo"
    })
  },
  render () {
    return (
      <div id="home" className="retail">
        <NavBar/>
        <Hero/>
        <AboveAverageReturns/>
        <ReachYourGoals/>
        <InformationalAdvantage/>
        <OneDollar/>
        <HigherPerformance/>
        {/* <OurProducts/> */}
        <PreviousRecommendations/>
        <TheResults/>
        {/* <PricingTable/> */}
        <Pricing/>
        <HowWeBeatTheMarket/>
        {/* <MoreInformation /> */}
        <RewardVSRisk/>
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
