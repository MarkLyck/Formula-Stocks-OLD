import React from 'react'
import store from '../../store'

import NavBar from '../global/NavBar.jsx'
import Hero from '../global/Hero.jsx'
import WhatIsIt from './WhatIsIt.jsx'
import Probabilities from './Probabilities.jsx'
import Performance from '../global/Performance.jsx'
import RiskReward from '../global/RiskReward.jsx'
import HowWeBeatTheMarket from '../global/HowWeBeatTheMarket.jsx'
import InstitutionalCapital from './InstitutionalCapital.jsx'
import WhatYouGet from './WhatYouGet.jsx'
import Comparisons from '../global/Comparisons.jsx'
import Recommendations from '../global/Recommendations.jsx'
import Pricing from '../global/Pricing.jsx'
import BacktestedPerformance from '../global/BacktestedPerformance.jsx'
import Brochure from './Brochure.jsx'
import AboutUs from '../home/AboutUs'
import BottomCTA from '../global/BottomCTA.jsx'
import Footer from '../home/Footer'

class Home extends React.Component {
  componentDidMount() {
    store.market.data.getDJIAData()
    store.market.data.getAnnualData()
    window.Intercom("boot", {
      app_id: "i194mpvo"
    })
  }

  render() {
    console.log(this.props);
    return (
      <div className="professional">
        <NavBar path={this.props.route.path}/>
        <Hero path={this.props.route.path}/>
        <WhatIsIt/>
        <Probabilities path={this.props.route.path}/>
        <Performance path={this.props.route.path}/>
        <RiskReward/>
        <HowWeBeatTheMarket path={this.props.route.path}/>
        <WhatYouGet/>
        <Comparisons/>
        <Recommendations path={this.props.route.path}/>
        <BacktestedPerformance path={this.props.route.path}/>
        <Pricing path={this.props.route.path}/>
        <InstitutionalCapital/>
        <Brochure/>
        <AboutUs/>
        <BottomCTA path={this.props.route.path}/>
        <Footer/>
        {this.props.children}
      </div>
    )
  }
}

export default Home
