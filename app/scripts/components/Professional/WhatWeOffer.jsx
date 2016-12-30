import React from 'react'
import Scroll from 'react-scroll'



class WhatWeOffer extends React.Component {
  render() {
    let ScrollLink = Scroll.Link
    return (
      <section className="what-we-offer">
        <h2 className="title">What we offer</h2>
        <div className="divider"/>
        <p>
          The market discounts widely known information. If you have access to better
          information, not yet discounted by the market, you stand a chance to outperform
          systematically.<br/><br/>

          By offering actionable information every week, available nowhere else, a Formula
          Stocks membership can give you such an informational advantage.<br/><br/>

          You will get access to an easy to use secure dashboard. Weekly you will be presented
          with new actionable information, recommendations for purchase or sale. This will
          relieve you of much tedious and time consuming stock analysis, or narrow your search
          should you prefer to make you own analysis.
        </p>
        <ScrollLink to="pricing" smooth={true} offset={-100} duration={1000}>See pricing</ScrollLink>
      </section>
    )
  }
}

export default WhatWeOffer
