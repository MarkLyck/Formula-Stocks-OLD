import React from 'React'

import AboveAverageReturns from './fiveReasons/AboveAverageReturns'
import ReachYourGoals from './fiveReasons/ReachYourGoals'
import InformationalAdvantage from './fiveReasons/InformationalAdvantage'
import OneDollar from './fiveReasons/OneDollar'
import HigherPerformance from './fiveReasons/HigherPerformance'
import OurProducts from './OurProducts'

const Home = React.createClass({
  render () {
    return (
      <div id="home">
        <AboveAverageReturns/>
        <ReachYourGoals/>
        <InformationalAdvantage/>
        <OneDollar/>
        <HigherPerformance/>
        <OurProducts/>
      </div>
    )
  }
})

export default Home
