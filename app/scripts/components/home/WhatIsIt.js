import React from 'react'

const WhatIsIt = React.createClass({
  render() {
    return (
      <div id="what-is-it">
        <div className="left">
          <p className="fs-title">Formula Stocks</p>
          <h3 className="title">What is it?</h3>
          <p>
            Using proprietary advanced technology we can pick next year's
            winners in the markets today.<br/><br/>

            We use this to offer you an informational advantage in the form of a capital allocation
            strategy and easy-to-use purchase and sales recommendations.<br/><br/>

            Use this to better your investment performance.
          </p>
        </div>
        <div className="right">
          <img className="screenshot" src="assets/images/portfolio_page.jpg"/>
        </div>
      </div>
    )
  }
})

export default WhatIsIt
