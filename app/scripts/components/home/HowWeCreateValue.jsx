import React from 'react'
import Scroll from 'react-scroll'

class HowWeCreateValue extends React.Component {
  render() {
    const ScrollLink = Scroll.Link
    return (
      <section className="how-we-create-value section">
        <h2 className="title">How we create value for members</h2>
        <div className="divider"/>
        <p>
          The human brain is not wired for evaluating hundreds of data points simultaneously.
          Humans prefer stories. But stories inherently produce bias, and bias dampens
          performance.<br/><br/>

          We have spent 14 years developing intelligent technology that delivers unbiased
          thinking on an expert level. This leads to decision-making entirely devoid of
          emotion, fear, greed, indecision. Decisions are instead based on mathematical
          probabilities, learned experience, logic, and sound business principles.<br/><br/>

          Technology capable of learning from the outcome of any decisions rendered is a game
          changing event, building experience beyond what a typical career can provide.
          It combines forces with technology capable of analyzing businesses in greater
          detail. Portfolio management software specializes in knowing when to buy, hold,
          and sell. And portfolio construction software which builds a better,
          safer portfolio.<br/><br/>

          Should you wish to dig deeper into the more technical aspects behind our service,
          please see <ScrollLink className="inline-link" to="howItWorks" smooth={true} offset={-100} duration={1000}>How we beat the market</ScrollLink> for more detail.
        </p>
      </section>
    )
  }
}

export default HowWeCreateValue
