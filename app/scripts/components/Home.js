import React from 'React'

import AboveAverageReturns from './fiveReasons/AboveAverageReturns'
import ReachYourGoals from './fiveReasons/ReachYourGoals'
import InformationalAdvantage from './fiveReasons/InformationalAdvantage'
import OneDollar from './fiveReasons/OneDollar'
import HigherPerformance from './fiveReasons/HigherPerformance'

const Home = React.createClass({
  render () {
    return (
      <div id="home">
        <AboveAverageReturns/>
        <ReachYourGoals/>
        <InformationalAdvantage/>
        <OneDollar/>
        <HigherPerformance/>
      </div>
    )
  }
})

export default Home
