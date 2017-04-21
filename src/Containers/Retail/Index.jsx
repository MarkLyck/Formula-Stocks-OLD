import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPlanIfNeeded, selectNewPlan } from '../../actions/plans'
import { fetchDJIA, fetchSP500 } from '../../actions/market'
import { createVisitIfNeeded } from '../../actions/visits'

import NavBar from '../../components/Navbar/Navbar'
import Hero from './Hero/HeroSlider'
import Introduction from './Introduction/Introduction'
import WhatIsIt from './WhatIsIt/WhatIsIt'
import SingleLaunchPerformance from '../../components/Graphs/Performance/SingleLaunchPerformance'
import SingleBacktestedPerformance from '../../components/Graphs/Performance/SingleBacktestedPerformance'
import PerformanceMatters from './PerformanceMatters/PerformanceMatters'
import PilotTest from './PilotTest/PilotTest'
import FirstMonthOnUs from './FirstMonthOnUs/FirstMonthOnUs'
import WhatToExpect from './WhatToExpect/WhatToExpect'
import RiskManagement from './RiskManagement/RiskManagement'
import HowWeBeatTheMarket from './HowWeBeatTheMarket/HowWeBeatTheMarket'
import Statistics from './Statistics/Statistics'
import AboutUs from './AboutUs/AboutUs'
import IntendedAudience from './IntendedAudience/IntendedAudience'
import BottomCTA from './BottomCTA/BottomCTA'
import Footer from  '../../components/Footer/Footer'

class Home extends Component {
  constructor(props) {
    super(props)
    this.calculateLaunchReturns = this.calculateLaunchReturns.bind(this)
  }

  componentDidMount() {
    const { actions } = this.props
    actions.selectNewPlan('entry')
    actions.fetchPlanIfNeeded('entry')
    actions.fetchDJIA()
    actions.fetchSP500()
    actions.createVisitIfNeeded()

    window.Intercom("boot", { app_id: "i194mpvo" })
  }

  calculateLaunchReturns() {
    const { data } = this.props
    const plan = data['entry']

    const launchBalance = plan.portfolioYields[0].balance
    const lastBalance = plan.portfolioYields[plan.portfolioYields.length - 1].balance
    return (lastBalance - launchBalance) / launchBalance * 100
  }

  render() {
    const { selectedPlan, data, DJIA, SP500 } = this.props
    const plan = data ? data['entry'] : false
    const portfolioReturn = plan ? this.calculateLaunchReturns() : 450

    return (
      <div id="home" className="retail">
        <NavBar/>
        <Hero portfolioReturn={portfolioReturn} />
        <Introduction plan="basic"
            portfolioReturn={portfolioReturn}
            winRate={plan ? Math.floor(plan.stats.WLRatio) : 90}
            portfolioYields={plan ? plan.portfolioYields : []}/>
        <WhatIsIt/>
        <SingleLaunchPerformance
          name={selectedPlan}
          marketData={DJIA}
          portfolioYields={plan ? plan.portfolioYields : []}/>
        <PerformanceMatters/>
        <FirstMonthOnUs/>
        <WhatToExpect/>
        <PilotTest/>
        <SingleBacktestedPerformance
            name={selectedPlan}
            marketData={SP500}
            annualData={plan ? plan.annualData : []}/>
        <Statistics
          stats={plan ? plan.stats : false}
          info={plan ? plan.info : false}/>
        <HowWeBeatTheMarket/>
        <RiskManagement
          stats={plan ? plan.stats : false}
          info={plan ? plan.info : false}/>
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
  isFetchingPlan: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  const { plans, market } = state
  const { selectedPlan, isFetchingPlan, data } = plans
  const { isFetchingDJIA, DJIA, SP500 } = market

  return {
    selectedPlan,
    data,
    isFetchingPlan,
    isFetchingDJIA,
    DJIA,
    SP500
  }
}

function mapDispatchToProps(dispatch) {
  const actions = {
    fetchPlanIfNeeded,
    fetchDJIA,
    fetchSP500,
    createVisitIfNeeded,
    selectNewPlan
  }
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
