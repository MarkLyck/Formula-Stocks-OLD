import React from 'react'

const HigherPerformance = React.createClass({
  render() {
    return (
      <div className="bg-white split-section higher-performance">
        <div className="content">
          <div className="left">
            <h2 className="title">Higher performance at lower cost</h2>
            <p>
                Formula Stocks offers an informational advantage
                in the form of a capital allocation strategy and easy-to-use
                purchase and sales recommendations.<br/><br/>

                It comes at a low flat fee, which will typically involve
                considerable savings compared to traditional methods
                of investing, such as funds or money management.<br/><br/>

                Higher performance at a lower cost. What’s not to like?
            </p>
            <div className="cta">
              <button className="filled-btn">Try it for free!</button>
              <button className="outline-btn blue-color">Learn more</button>
            </div>
          </div>
          <div className="right">
            <img src="assets/images/Ipad.png" className="slide-up-mockup-img"/>
          </div>
        </div>
      </div>
    )
  }
})

export default HigherPerformance
