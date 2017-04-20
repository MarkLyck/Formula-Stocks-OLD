import React from 'react'
import { Element } from 'react-scroll'
import './howToBeatTheMarket.css'
import brochure from '../brochure.pdf'


function downloadBrochure() {
  window.open(brochure)
}

const HowWeBeatTheMarket = () => (
  <section className="how-to-beat-the-market section">
    <Element name="howItWorks"/>
    <h2 className="title">How we beat the market</h2>
    <div className="divider"/>
    <p>
      Formula Stocks uses a combination of many specific technologies developed over a 14- year period to
      do as Mark Twain originally suggested:<br/><br/>

      ”Buy good quality common stocks that go up. If they do not go up, do not buy them”. While Twain said
      this tongue-in-cheek, it encapsulates what Formula Stocks strives to do.<br/><br/>

      We identify stocks that go up, before they go up, with a 89-92% probability of being correct.
      Some of the techniques employed include in no specific order:
    </p>
    <ul className="beat-the-market-list">
      <li><p><span className="semi-bold">Cognitive computing</span> – the capability to learn from experience, and reason based upon it.</p></li>
      <li><p><span className="semi-bold">Business analytics</span> – the capability to analyze business models.</p></li>
      <li><p><span className="semi-bold">Margin of safety principles</span> – the concept of preferring extra safety before investing.</p></li>
      <li><p><span className="semi-bold">Valuation technology</span> – the concept of calculating the intrinsic value of a business.</p></li>
      <li><p><span className="semi-bold">The scientific method</span> – the method based upon which a thesis can be formed, tested, and refined.</p></li>
      <li><p><span className="semi-bold">Quantitative measurements</span> – a method with which to quantify a theory.</p></li>
      <li><p><span className="semi-bold">Growth projection</span> – a method with which to project the future growth of a business.</p></li>
      <li><p><span className="semi-bold">Intelligent Investment Technologies</span> – 93 different methods for outperforming the market.</p></li>
      <li><p><span className="semi-bold">Alpha prediction</span> – a method which estimates the future return from a stock.</p></li>
      <li><p><span className="semi-bold">Position-sizing logic</span> – the concept of matching position size and odds.</p></li>
      <li><p><span className="semi-bold">Portfolio management technology</span> – software for optimizing risk/reward characteristics of a portfolio.</p></li>
      <li><p><span className="semi-bold">Statistics</span> – a branch of mathematics that deals with interpretation of data.</p></li>
    </ul>
    <p>
      The complexity is high. Formula Stocks offers a leading-edge technological approach to stock
      selection and portfolio optimization. If you want to know more, please request our brochure or <a onClick={downloadBrochure}>click here</a>.
    </p>
  </section>
)

export default HowWeBeatTheMarket
