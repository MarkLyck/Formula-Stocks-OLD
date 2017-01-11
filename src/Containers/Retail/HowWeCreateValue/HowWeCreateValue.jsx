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
          The human brain is not wired for evaluating hundreds of data points simultaneously. Humans
          prefer stories. But stories inherently produce bias, and bias dampens investment performance.
          In everyday life, this works fine of course. But when investing, it becomes counter
          productive, so using a tool to help, simply makes a lot of sense.<br/><br/>

          We have spent 14 years developing cognitive technology capable of decision-making devoid of
          emotion, fear, greed, indecision. Decisions are based instead on mathematical probabilities,
          learned experience, logic, and sound business principles.<br/><br/>

          A capacity to learn from outcomes of not only actual decisions, but also decisions never
          actually taken, builds experience beyond that of a typical career. This is used in combination
          with a technology that can analyze a business in great detail. Portfolio management technology
          specializing in knowing when to buy, hold, and sell. And portfolio construction technology
          building a better, safer portfolio.<br/><br/>

          We use these tools to select investments and portfolios with much better probabilities of
          winning in the future, and by making these selections available to members, we create value
          for you.<br/><br/>

          Should you wish to dig deeper into the more technical aspects behind our service,
          please see <ScrollLink className="inline-link" to="howItWorks" smooth={true} offset={-100} duration={1000}>How we beat the market</ScrollLink> for more detail.
        </p>
      </section>
    )
  }
}

export default HowWeCreateValue
