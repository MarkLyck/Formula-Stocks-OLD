import React from 'react'
import Scroll from 'react-scroll'



class WhatWeOffer extends React.Component {
  render() {
    let ScrollLink = Scroll.Link
    return (
      <section className="what-we-offer">
        <h2 className="title">What you get</h2>
        <div className="divider"/>
        <div className="beside">
          <div className="left">
            <p>
              The market discounts widely known information. If you have access to better
              information, not yet discounted by the market, you have a chance to outperform
              it.<br/><br/>

              By offering actionable information every week, available nowhere else, a Formula
              Stocks membership can give you such an informational advantage.<br/><br/>

              You will get access to an easy to use secure dashboard. Weekly you will be
              presented with new recommendations for purchase or sale. This will relieve you of
              much tedious and time consuming stock analysis, or narrow your search should you 
              prefer to make you own analysis.
            </p>
            <ScrollLink to="pricing" smooth={true} offset={-100} duration={1000}>See pricing</ScrollLink>
          </div>
          <div className="right">
            <img src="/assets/images/Suggestions.png" className="screen"/>
          </div>
        </div>
      </section>
    )
  }
}

export default WhatWeOffer
