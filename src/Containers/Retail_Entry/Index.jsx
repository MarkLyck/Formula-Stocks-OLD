import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPulicPlan } from '../../actions/plans'
import { fetchDJIA, fetchSP500 } from '../../actions/market'

import NavBar from '../Global/Navbar/Navbar'
// import Hero from '../Global/HeroSlider/HeroSlider'
import Hero from './Hero/HeroSlider'
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
  constructor(props) {
    super(props)

    this.calculateLaunchReturns = this.calculateLaunchReturns.bind(this)
  }
  componentDidMount() {
    const { actions } = this.props
    actions.fetchPulicPlan('entry')
    actions.fetchDJIA()
    actions.fetchSP500()

    window.Intercom("boot", { app_id: "i194mpvo" })
  }

  calculateLaunchReturns() {
    const { selectedPlan, data } = this.props
    const plan = data[selectedPlan]

    const launchBalance = plan.portfolioYields[0].balance
    const lastBalance = plan.portfolioYields[plan.portfolioYields.length - 1].balance
    return (lastBalance - launchBalance) / launchBalance * 100
  }

  render() {
    const { selectedPlan, data, DJIA, SP500 } = this.props
    const plan = data[selectedPlan]
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
    fetchPulicPlan,
    fetchDJIA,
    fetchSP500
  }
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
