import React from 'react'

const WhatIsIt = React.createClass({
  render() {
    return (
      <div id="what-is-it">
        <div className="left">
          <h3 className="title">What is Formula Stocks?</h3>
          <p>
            Using proprietary technology we estimate who will win in the market over the next year or two.<br/><br/>

            We use this to offer you an informational advantage in the form of a capital allocation
            strategy and easy-to-use purchase and sales recommendations.<br/><br/>

            Use this to better your investment performance.
          </p>
          <sub className="white-color hero-disclaimer"><sup>*</sup>Past performance is not necessarily indicative of future results. </sub>
        </div>
        <div className="right">
          <img className="screenshot" src="assets/images/portfolio_page.jpg"/>
        </div>
      </div>
    )
  }
})

export default WhatIsIt
