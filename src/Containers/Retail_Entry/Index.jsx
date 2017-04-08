import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPulicPlan } from './actions'

import store from '../../store'

import NavBar from '../Global/Navbar/Navbar'
import Hero from '../Global/HeroSlider/HeroSlider'
import Introduction from './Introduction/Introduction'
import WhatIsIt from './WhatIsIt/WhatIsIt'
import SingleLaunchPerformance from '../Global/Performance/SingleLaunchPerformance'
import SingleBacktestedPerformance from '../Global/Performance/SingleBacktestedPerformance'
import PerformanceMatters from './PerformanceMatters/PerformanceMatters'
import PilotTest from '../Global/PilotTest/PilotTest'
import FirstMonthOnUs from './FirstMonthOnUs/FirstMonthOnUs'
import WhatToExpect from './WhatToExpect/WhatToExpect'
import RiskManagement from './RiskManagement/RiskManagement'
import HowWeBeatTheMarket from './HowWeBeatTheMarket/HowWeBeatTheMarket'
import Statistics from './Statistics/Statistics'
import AboutUs from '../Global/AboutUs/AboutUs'
import IntendedAudience from './IntendedAudience/IntendedAudience'
import BottomCTA from '../Global/BottomCTA/BottomCTA'
import Footer from '../Global/Footer/Footer'

class Home extends Component {
  componentDidMount() {
    const { actions } = this.props
    actions.fetchPulicPlan('entry')

    // REMOVE BACKBBONE when Redux is fully integrated
    store.plans.get('basic').fetch()
    store.market.data.getAnnualData()
    store.market.data.getDJIAData()
    window.Intercom("boot", { app_id: "i194mpvo" })
  }

  render() {
    console.log(' render:' , this.props)
    return (
      <div id="home" className="retail">
        <NavBar/>
        <Hero/>
        <Introduction plan="basic"/>
        <WhatIsIt/>
        <SingleLaunchPerformance plan="basic" name="Entry"/>
        <PerformanceMatters/>
        <FirstMonthOnUs/>
        <WhatToExpect/>
        <PilotTest/>
        <SingleBacktestedPerformance plan="basic" name="Entry"/>
        <Statistics plan="basic"/>
        <HowWeBeatTheMarket/>
        <RiskManagement plan="basic"/>
        <AboutUs/>
        <IntendedAudience/>
        <BottomCTA/>
        <Footer/>
        {this.props.children}
      </div>
    )
  }
}

Home.propTypes = {
  selectedPlan: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  const { retail } = state
  const {
    selectedPlan,
    plans,
    isFetching
  } = retail

  console.log(selectedPlan, plans, isFetching);
  return {
    selectedPlan,
    plans,
    isFetching
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ fetchPulicPlan }, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
