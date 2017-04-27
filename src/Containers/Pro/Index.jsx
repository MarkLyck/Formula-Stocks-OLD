import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPlanIfNeeded, selectNewPlan } from '../../actions/plans'
import { fetchDJIA, fetchSP500 } from '../../actions/market'
import { createVisitIfNeeded } from '../../actions/visits'

import NavBar from '../../components/Navbar/Navbar'
import Hero from './Hero/Hero'
import WhatIsIt from './WhatIsIt/WhatIsIt'
import Probabilities from './Probabilities/Probabilities'
import LaunchPerformance from '../../components/Graphs/Performance/LaunchPerformance'
import RiskReward from './RiskReward/RiskReward'
import BacktestedPerformance from '../../components/Graphs/Performance/BacktestedPerformance'
import Pricing from './Pricing/Pricing'
import ScatterPlot from './ScatterPlot/ScatterPlot'
import HowWeBeatTheMarket from './HowWeBeatTheMarket/HowWeBeatTheMarket'
import WhatYouGet from './WhatYouGet/WhatYouGet'
import Comparisons from './Comparisons/Comparisons'
import InstitutionalCapital from './InstitutionalCapital/InstitutionalCapital'
import Brochure from './Brochure/Brochure'
import AboutUs from '../Retail/AboutUs/AboutUs'
import BottomCTA from '../Retail/BottomCTA/BottomCTA'
import Footer from '../../components/Footer/Footer'


class Professional extends React.Component {
  componentDidMount() {
    const { actions } = this.props

    actions.fetchPlanIfNeeded('premium')
    actions.fetchPlanIfNeeded('business')
    actions.fetchPlanIfNeeded('fund')
    actions.fetchDJIA()
    actions.fetchSP500()
    actions.createVisitIfNeeded()

    window.Intercom("boot", { app_id: "i194mpvo" })
  }

  render() {
    const { planData, DJIA, annualSP500 } = this.props

    return (
      <div id="professional" className="professional">
        <NavBar path={this.props.route.path}/>
        <Hero path={this.props.route.path}/>
        <WhatIsIt path={this.props.route.path}/>
        <Probabilities path={this.props.route.path} planData={planData}/>
        <LaunchPerformance path={this.props.route.path} planData={planData} DJIA={DJIA}/>
        <RiskReward path={this.props.route.path}/>
        <HowWeBeatTheMarket path={this.props.route.path}/>
        <WhatYouGet/>
        <Comparisons path={this.props.route.path}/>
        <ScatterPlot path={this.props.route.path}/>
        <BacktestedPerformance path={this.props.route.path} planData={planData} annualSP500={annualSP500}/>
        <Pricing path={this.props.route.path} planData={planData}/>
        <InstitutionalCapital/>
        <Brochure/>
        <AboutUs path={this.props.route.path}/>
        <BottomCTA path={this.props.route.path}/>
        <Footer path={this.props.route.path}/>
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { plans, market } = state
  const { selectedPlan, isFetchingPlan, data } = plans
  const { isFetchingDJIA, DJIA, annualSP500 } = market

  const planData = data

  return {
    selectedPlan,
    planData,
    isFetchingPlan,
    isFetchingDJIA,
    DJIA,
    annualSP500
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

export default connect(mapStateToProps, mapDispatchToProps)(Professional)
