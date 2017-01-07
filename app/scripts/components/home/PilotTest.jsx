import React from 'react'

class PilotTest extends React.Component {
  render() {
    return (
      <section className="pilot-test section">
        <h2 className="title">Results of pilot program</h2>
        <div className="divider"/>
        <div className="beside">
          <div className="left">
            <p>
              Formula Stocks has undertaken a 3-year pilot program. Performance data was recorded
              under normal real-time market conditions with capital, and financial results
              reviewed by a state-licensed auditor. Based on the BUSINESS method, we recorded an
              average return on equity employed to sustain securities trading of +66.54% in 2009,
              +52.56% in 2010, +16.84% in 2011.<sup>*</sup><br/><br/>
            </p>
            <p className="disclaimer"><sup>*</sup>Past performance is no indication of future performance.</p>
          </div>
          <div className="right">
            <ul>
              <li><p className="name">2009</p><p className="return">+66.54%</p></li>
              <li><p className="name">2010</p><p className="return">+52.56%</p></li>
              <li><p className="name">2011</p><p className="return">+16.84%</p></li>
            </ul>
          </div>
        </div>
      </section>)
  }
}

export default PilotTest
