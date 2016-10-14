import React from 'react'
import $ from 'jquery'
import Scroll from 'react-scroll'

import WhatIsIt from './WhatIsIt'
import store from '../../store'

import typed from '../../libraries/typed.js'

const Hero = React.createClass({
  tryIt() {
    store.settings.history.push('/signup')
    sessionStorage.selectedPlan = 'basic'
  },
  componentDidMount() {
    $("#subtitle").typed({
        stringsElement: $('#subtitles'),
        typeSpeed: -50,
        loop: true,
        showCursor: true,
        backDelay: 6000,
        backSpeed: -100,
    })
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
            <h1 id="main-title">A better <span className="font bold">solution</span> for the <span className="font bold">stock investor</span></h1>
            <span id="subtitle"></span>
            <div id="subtitles">
              <h2>Formula Stocks has a history of picking next year’s winners with an 89-94% average success rate<sup>*</sup>. Give your investments a significant boost – join us today.</h2>
              <h2>The human brain is not wired for evaluating hundreds of data points simultaneously. <br/>It prefers stories. But stories produce bias that dampens performance.</h2>
              <h2>Formula Stocks' intelligent technology delivers unbiased thinking on an expert level. <br/>Smart. Experienced. Better.</h2>
              <h2>Expert systems can evaluate hundreds of data points simultaneously. Use this as a tool to improve your odds.</h2>
              <h2>It then becomes theoretically possible to win 9 times out of 10.</h2>
              <h2>Based on timeless and proven investment principles. We buy good businesses at reasonable prices, using a margin of safety. </h2>
              <h2>Progress always involves adopting better tools.</h2>
            </div>
          </div>
          <div className="CTA fade-in">
            <button className="filled-btn" onClick={this.tryIt}>Try it for free!</button>
            <Link className="outline-btn" to="whatIsIt" smooth={true} offset={-100} duration={500}>Learn more</Link>
          </div>
        </div>

          <div id="hero-chart" className="slide-up">
            <img className="chart-container slide-up-transform" src="/assets/images/hero-graph.svg" />
            <Element name="whatIsIt">
              <WhatIsIt/>
            </Element>
          </div>

      </div>
    )
  }
})

export default Hero
