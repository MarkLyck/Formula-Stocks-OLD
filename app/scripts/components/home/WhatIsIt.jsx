import React from 'react'
import Scroll from 'react-scroll'
import WinRateGraph from '../global/components/WinRateGraph.jsx'

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
              Formula Stocks is a service, which provide access to recommendations for stocks
              and a model portfolio, that you can easily mirror in your account.<br/><br/>

              Historically, between 89-92% of these recommendations have shown a positive
              return on investment. If you had bought random high-quality stocks instead,
              only approx. 59% of these would have been successful.<br/>
              A staggering difference.<br/><br/>

              We specialize in high-probability investments – a high probability of long-term
              gain combined with a low probability of loss. We prefer to buy good businesses at
              fair prices with a margin of safety, shielding us from some downside, while
              enjoying the upside of owning businesses that earns a meaningful return on
              capital.<br/><br/>

              Our recommendations and model portfolio are based on timeless and
              proven investment principles, mathematical probabilities and sound logic.
              It is scientifically quantifiable, which means that every principle used can be
              proven to work using the scientific method.<br/><br/>
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
