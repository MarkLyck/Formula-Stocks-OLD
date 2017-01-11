import React from 'react'
import store from '../../store'

import NavBar from '../Global/Navbar/Navbar'
import Hero from '../Global/Hero/Hero'
import WhatIsIt from './WhatIsIt/WhatIsIt'
import Probabilities from './Probabilities/Probabilities'
import LaunchPerformance from '../Global/Performance/LaunchPerformance'
import RiskReward from '../Global/RiskReward/RiskReward'
import BacktestedPerformance from '../Global/Performance/BacktestedPerformance'
import Pricing from '../Global/Pricing/Pricing'
import ScatterPlot from '../Global/ScatterPlot/ScatterPlot'
import HowWeBeatTheMarket from '../Global/HowWeBeatTheMarket/HowWeBeatTheMarket'
import WhatYouGet from './WhatYouGet/WhatYouGet'
import Comparisons from '../Global/Comparisons/Comparisons'
import InstitutionalCapital from './InstitutionalCapital/InstitutionalCapital'
import Brochure from './Brochure/Brochure'
import AboutUs from '../Global/AboutUs/AboutUs'
import BottomCTA from '../Global/BottomCTA/BottomCTA'
import Footer from '../Global/Footer/Footer'


class Professional extends React.Component {
  componentDidMount() {
    store.market.data.getAnnualData()
    store.market.data.getDJIAData()
    window.Intercom("boot", {
      app_id: "i194mpvo"
    })
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
