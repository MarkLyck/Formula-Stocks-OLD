import React from 'react'

const WhatIsIt = React.createClass({
  render() {
    return (
      <div id="what-is-it">
        <div className="left">
          <p className="fs-title">Formula Stocks</p>
          <h3 className="title">What is it?</h3>
          <p>
          Using expert system technology we pick
          next year's winners in the markets.<br/><br/>

          Whether value or growth investor, pro or
          novice, you can rely on Formula Stocks for
          better and more informed
          investment decisions.<br/><br/>

          Gain a systematic edge for generating value
          in the marketplace.
          </p>
        </div>
        <div className="right">
          <img className="screenshot" src="assets/images/portfolio-screenshot.png"/>
        </div>
      </div>
    )
  }
})

export default WhatIsIt
