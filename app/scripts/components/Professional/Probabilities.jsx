import React from 'react'
import WinRateGraph from './components/WinRateGraph.jsx'

class Probabilities extends React.Component {
  render() {
    return (
      <section className="probabilities">
        <h2 className="title">A matter of probabilities</h2>
        <div className="divider"/>
        <p>
          Our proprietary technology has typically been able to predict investment success in the future with a
          degree of certainty in the neighborhood of 89 to 92%, respectively.<sup>1</sup><br/><br/>
        </p>
        <div className="columns">
          <div className="columns-2">
            <p>
              At the same time, this technology specializes in asymmatrical risk/reward relationships, where reward outweighs risk.<br/><br/>

              The identification, a priori, of equities with a high expectancy of success as a future investment is of course
              valuable information. Probability theory will tell you that for a combination of, for example, 100 independent events
              each with a 92% probability of success yielding a high average return (and conversely little downside for events that
              are not successful) the collective outcome in terms of a total positive financial return comes relatively close to a certainty.<br/><br/>

              This means that investing with our strategies is very likely to be a successful endeavor, provided it is done
              consistently, diversified, and for a longer period of time.<br/><br/>

              For comparison, within a group of high-quality equities subjected to the exact same testing methodology any random
              equity has only about a 59% probability of success by the same measure – a staggering difference.
            </p>
          </div>
          <div className="columns-1">
            <WinRateGraph/>
          </div>
        </div>
        <p className="disclaimer">
          <sup>1</sup> Success is defined as a positive ROI between issued purchase and sell recommendations. 89 and 92% refer to the historical probabilities.
          Sample size: 9,800 recommendations.
        </p>
      </section>
    )
  }
}

export default Probabilities
