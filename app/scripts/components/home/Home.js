import React from 'React'

import store from '../../store'

import AboveAverageReturns from './fiveReasons/AboveAverageReturns'
import ReachYourGoals from './fiveReasons/ReachYourGoals'
import InformationalAdvantage from './fiveReasons/InformationalAdvantage'
import OneDollar from './fiveReasons/OneDollar'
import HigherPerformance from './fiveReasons/HigherPerformance'
import OurProducts from './OurProducts'
import TheResults from './TheResults'

import AmTest from './AmTest'

const Home = React.createClass({
  componentDidMount() {
    store.plans.basic.data.getAnnualData()
    store.plans.premium.data.getAnnualData()
    store.plans.business.data.getAnnualData()
    store.market.data.getAnnualData()
    // store.plans.fund.data.getAnnualData()
  },
  render () {
    return (
      <div id="home">
        <AboveAverageReturns/>
        <ReachYourGoals/>
        <InformationalAdvantage/>
        <OneDollar/>
        <HigherPerformance/>
        <OurProducts/>
        <TheResults/>
      </div>
    )
  }
})

export default Home
