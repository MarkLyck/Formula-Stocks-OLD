import React from 'react'
import WinRateGraph from '../../Global/Components/WinRateGraph/WinRateGraph'
import './probabilities.css'

class Probabilities extends React.Component {
  render() {
    return (
      <section className="probabilities section">
        <h2 className="title">A matter of probabilities</h2>
        <div className="divider"/>
        <p className="left-align">
          Our technology has typically been able to predict future investment success
          with a degree of certainty in the neighborhood of 89 to 92%,
          respectively.<sup>1</sup><br/>
        </p>
        <div className="probability-content">
            <p className="probability-text">
              At the same time, this technology specializes in asymmetrical risk/reward
              relationships, where reward outweighs risk.<br/><br/>

              The identification a priori of equities with a high expectancy of success as a
              future investment is valuable information. Probability theory will tell you that for a
              combination of e.g. 100 independent events, each with a 92% probability of
              success yielding a high average return (and conversely little downside for events that
              are not successful), the collective outcome in the form of a total positive financial
              return comes relatively close to a certainty.
            </p>
            <p className="probability-text">
              Certainty is not possible, of course, but the odds are much better than average.
            </p>
            <p className="probability-text">
              This means that investing with our strategies is very likely to be a successful
              endeavor, provided that it is done consistently, diversified, and for a longer period of
              time (measured in years).
            </p>
            <p className="probability-text">
              If instead of using Formula Stocks you chose to buy a basket of random
              high-quality equities, each investment would only have a probability of success
              of around 59% (using the same method of measurement) – a staggering difference
              compared to Formula Stocks’ 92%.
            </p>
            <div className="graph-container">
              <WinRateGraph path={this.props.path}/>
            </div>
          </div>
        <p className="disclaimer">
          <sup>1</sup> Success is defined as a positive ROI between issued purchase and sales recommendations. 89 and 92% refer to the historical probabilities.
          Sample size: 9,800 recommendations.
        </p>
      </section>
    )
  }
}

export default Probabilities
