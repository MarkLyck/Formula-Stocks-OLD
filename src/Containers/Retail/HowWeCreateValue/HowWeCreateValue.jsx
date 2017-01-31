import React from 'react'
import Scroll from 'react-scroll'
import './howWeCreateValue.css'

class HowWeCreateValue extends React.Component {
  render() {
    const ScrollLink = Scroll.Link
    return (
      <section className="how-we-create-value section">
        <h2 className="title">How we create value for our members</h2>
        <div className="divider"/>
        <p>
          The human brain is not wired for evaluating hundreds of data points simultaneously.
          Humans prefer stories. But stories produce bias, and bias dampens performance. When
          investing it becomes counterproductive, so using a tool to help, simply makes sense.<br/><br/>

          We have spent 14 years developing cognitive technology capable of decision-making
          devoid of emotion, fear, greed, indecision. Decisions are based instead on
          mathematical probabilities, learned experience, logic, and sound business principles.
          Science instead of emotion and biased opinion.<br/><br/>

          A capacity to learn from outcomes of not just actual decisions, but also the decisions
          which were never taken, builds experience beyond what a typical career can provide.
          Technology that can analyze a business in great detail, is used together with
          portfolio management technology specializing in knowing when to buy, hold, and sell.<br/><br/>

          We use these tools to select investments and portfolios with much better
          probabilities of winning in the future, and by making these selections available to
          members, we create value for you. Should you wish to dig deeper into the technical
          aspects, please see <ScrollLink className="inline-link" to="howItWorks" smooth={true} offset={-100} duration={1000}>How we beat the market</ScrollLink> for more detail.<br/><br/>
        </p>
      </section>
    )
  }
}

export default HowWeCreateValue
