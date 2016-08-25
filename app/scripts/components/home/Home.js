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

import Modal from '../Modal'
import TermsAndConditions from '../global/TermsAndConditions'
import PrivacyPolicy from '../global/PrivacyPolicy'

const Home = React.createClass({
  getInitialState() {
    return {showModal: false}
  },
  componentDidMount() {
    store.market.data.getAnnualData()
    store.session.on('change', this.updateState)
  },
  updateState() {
    this.setState({showModal: store.session.get('showModal')})
  },
  closeModal() {
    console.log('closing modal');
    store.session.set('showModal', false)
  },
  render () {
    let modal;

    if(this.state.showModal) {
      let containerStyles = {
        zIndex: '20'
      }
      let modalStyles = {
        width: '80%',
        top: '100px',
        bottom: '40px',
        padding: '40px',
        position: 'absolute',
        overflowY: 'scroll',
      }
      if (this.state.showModal === 'terms') {
        modal = (<Modal modalStyles={modalStyles} closeModal={this.closeModal} containerStyles={containerStyles}>
          <TermsAndConditions/>
        </Modal>)
      } else if (this.state.showModal === 'privacy') {
        modal = (<Modal modalStyles={modalStyles} closeModal={this.closeModal} containerStyles={containerStyles}>
          <PrivacyPolicy/>
        </Modal>)
      }

    }

    return (
      <div id="home">
        {modal}
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
        {this.props.children}
      </div>
    )
  }
})

export default Home
