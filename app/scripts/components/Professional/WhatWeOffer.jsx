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
          An informational advantage exists, when you have access to information that has not
          yet been discounted by the market. Such an advantage makes it at least possible to
          outperform the market averages in a more systematic fashion.<br/><br/>

          By offering actionable information every week, Formula Stocks can give you an
          informational advantage available nowhere else, empowering you with better odds.<br/><br/>

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
