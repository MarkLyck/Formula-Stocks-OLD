import React from 'React'

import store from '../../store'


import Header from './Header'
import AboveAverageReturns from './fiveReasons/AboveAverageReturns'
import ReachYourGoals from './fiveReasons/ReachYourGoals'
import InformationalAdvantage from './fiveReasons/InformationalAdvantage'
import OneDollar from './fiveReasons/OneDollar'
import HigherPerformance from './fiveReasons/HigherPerformance'
import OurProducts from './OurProducts'
import TheResults from './TheResults'
import PricingTable from './PricingTable'
import Brochures from './Brochures'
import RewardVSRisk from './RewardVSRisk'
import Quote from './Quote'
import CumulativeInterest from './CumulativeInterest'
import Newsletter from './Newsletter'
import AboutUs from './AboutUs'
import ContactUs from './ContactUs'
import Footer from './Footer'

import AmTest from './AmTest'

const Home = React.createClass({
  componentDidMount() {
    store.plans.get('basic').getAnnualData()
    store.plans.get('premium').getAnnualData()
    store.plans.get('business').getAnnualData()
    store.market.data.getAnnualData()
  },
  render () {
    return (
      <div id="home">
        <Header/>
        <AboveAverageReturns/>
        <ReachYourGoals/>
        <InformationalAdvantage/>
        <OneDollar/>
        <HigherPerformance/>
        <OurProducts/>
        <TheResults/>
        <PricingTable/>
        <Brochures/>
        <RewardVSRisk/>
        <Quote/>
        <CumulativeInterest/>
        <Newsletter/>
        <AboutUs/>
        <ContactUs/>
        <Footer/>
      </div>
    )
  }
})

export default Home
