import React from 'react'
import { Element } from 'react-scroll'
import './pilotTest.css'

const PilotTest = () => (
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
          employed to sustain securities trading of +78.94% in 2009,
          +44.64% in 2010 and +17.51% in 2011.<sup>*</sup><br/><br/>
        </p>
        <p className="disclaimer"><sup>*</sup>Past performance is not neccesarily indicative of future results.</p>
      </div>
      <div className="right">
        <ul>
          <li><p className="name">Year 1</p><p className="return">+78.94%</p></li>
          <li><p className="name">Year 2</p><p className="return">+44.64%</p></li>
          <li><p className="name">Year 3</p><p className="return">+17.51%</p></li>
        </ul>
      </div>
    </div>
  </section>
)

export default PilotTest
