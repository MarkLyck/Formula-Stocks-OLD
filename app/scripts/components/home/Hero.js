import React from 'react'
import Scroll from 'react-scroll'

import WhatIsIt from './WhatIsIt'
import store from '../../store'

const Hero = React.createClass({
  tryIt() {
    store.settings.history.push('/signup')
  },
  learnMore() {

  },
  render() {
    let Link = Scroll.Link;
    let Element = Scroll.Element;
    return (
      <div id="hero">
        <div className="content">
          <div className="bounce-down">
            <h1 id="main-title">A better <span className="font bold">solution</span> for the <span className="font bold">stock market</span></h1>
            <h2>What if it was possible to identify some of next years' winners in the markets today with up to a 84-92% average success rate?</h2>
          </div>
          <div className="CTA fade-in">
            <button className="filled-btn" onClick={this.tryIt}>Try it for free!</button>
            <Link className="outline-btn" to="whatIsIt" smooth={true} offset={100} duration={500}>Learn More</Link>
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
