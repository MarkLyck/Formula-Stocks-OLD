import React from 'react'
import Scroll from 'react-scroll'

class PilotTest extends React.Component {
  render() {
    const Element = Scroll.Element
    return (
      <section className="pilot-test section">
        <Element name="pilotTest"/>
        <h2 className="title">Results of pilot program</h2>
        <div className="divider"/>
        <div className="beside">
          <div className="left">
            <p>
              Formula Stocks has undertaken a 3-year pilot program. Performance data was recorded
              under normal real-time market conditions with capital, and financial results
              reviewed by a state-licensed auditor. We recorded an average return on equity
              employed to sustain securities trading of +66.54% in 2009,
              +52.56% in 2010 and +16.84% in 2011.<sup>*</sup><br/><br/>
            </p>
            <p className="disclaimer"><sup>*</sup>Past performance is no indication of future performance.</p>
          </div>
          <div className="right">
            <ul>
              <li><p className="name">Year 1</p><p className="return">+66.54%</p></li>
              <li><p className="name">Year 2</p><p className="return">+52.56%</p></li>
              <li><p className="name">Year 3</p><p className="return">+16.84%</p></li>
            </ul>
          </div>
        </div>
      </section>)
  }
}

export default PilotTest
