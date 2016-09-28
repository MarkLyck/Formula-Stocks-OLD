import React from 'react'
import Scroll from 'react-scroll'

import WhatIsIt from './WhatIsIt'
import store from '../../store'

const Hero = React.createClass({
  tryIt() {
    store.settings.history.push('/signup')
    sessionStorage.selectedPlan = 'basic'
  },
  render() {
    let Link = Scroll.Link;
    let Element = Scroll.Element;

    let iOSException = ''
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (iOS) { iOSException = 'iOSException' }

    return (
      <div id="hero" className={iOSException}>
        <div className="content">
          <div className="bounce-down">
            <h1 id="main-title">A better <span className="font bold">solution</span> for the <span className="font bold">stock market investor</span></h1>
            <h2>Formula Stocks has a history of picking next year’s winners with an 85-92% average success rate<sup>*</sup>. Give your investments a significant boost – join us today.</h2>
          </div>
          <div className="CTA fade-in">
            <button className="filled-btn" onClick={this.tryIt}>Try it for free!</button>
            <Link className="outline-btn" to="whatIsIt" smooth={true} offset={100} duration={500}>Learn more</Link>
          </div>
        </div>

          <div id="hero-chart" className="slide-up">
            <Element name="whatIsIt">
              <WhatIsIt/>
            </Element>
          </div>

      </div>
    )
  }
})

export default Hero
