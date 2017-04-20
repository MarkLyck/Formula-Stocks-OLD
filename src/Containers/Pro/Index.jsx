import React from 'react'
import store from '../../OLD_store'

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
    store.plans.get('premium').fetch()
    store.plans.get('business').fetch()
    store.plans.get('fund').fetch()
    store.market.data.getAnnualData()
    store.market.data.getDJIAData()
    window.Intercom("boot", { app_id: "i194mpvo" })
  }

  render() {
    return (
      <div id="professional" className="professional">
        <NavBar path={this.props.route.path}/>
        <Hero path={this.props.route.path}/>
        <WhatIsIt path={this.props.route.path}/>
        <Probabilities path={this.props.route.path}/>
        <LaunchPerformance path={this.props.route.path}/>
        <RiskReward path={this.props.route.path}/>
        <HowWeBeatTheMarket path={this.props.route.path}/>
        <WhatYouGet/>
        <Comparisons path={this.props.route.path}/>
        <ScatterPlot path={this.props.route.path}/>
        <BacktestedPerformance path={this.props.route.path}/>
        <Pricing path={this.props.route.path}/>
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

export default Professional
