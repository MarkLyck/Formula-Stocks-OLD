import React from 'react'
import Scroll from 'react-scroll'
import WinRateGraph from '../../Global/Components/WinRateGraph/WinRateGraph.jsx'
import './whatIsIt.css'

class WhatIsIt extends React.Component {
  render() {
    const Element = Scroll.Element
    return (
      <section className="what-is-it section">
        <Element name="whatIsIt"/>
        <h2 className="title">What is it?</h2>
        <div className="divider"/>
        <div className="beside">
            <p className="whatisit-text">
              Formula Stocks is a service, which gives you access to high quality stock recommendations.
              Use these in your own account. Or mirror our model portfolio, which have outperformed the
              S&P 500 88% of the time. <br/><br/>

              Historically, 89-92% of all our recommendations have been succesful. If you had bought
              random high-quality stocks, only approx. 59% of these would have earned a positive return.
              A staggering difference.<br/><br/>

              We specialize in high-probability investments – a high probability of long-term
              gain combined with a low probability of loss. We prefer to buy good businesses at
              fair prices with a margin of safety, shielding us from some downside, while
              enjoying the upside of owning businesses that earn a meaningful return on
              capital.<br/><br/>

              Our recommendations and model portfolio are based on timeless and
              proven investment principles, mathematical probabilities and sound logic.
              They are scientifically quantifiable, which means that every principle used can be proven
              to work using the scientific method.<br/><br/>
            </p>
            <div className="graph-container">
              <WinRateGraph/>
            </div>
          </div>
      </section>
    )
  }
}

export default WhatIsIt
