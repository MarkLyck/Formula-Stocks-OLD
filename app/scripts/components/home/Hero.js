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
        backDelay: 10000,
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
              <h2>Formula Stocks has a history of picking next year’s winners with an 86-93% average success rate<sup>*</sup>. Give your investments a significant boost – join us today.</h2>
              <h2>The human brain is not wired for evaluating hundreds of data points simultaneously.<br/> It prefers stories. Stories produce bias that dampens performance.</h2>
              <h2>Meet our electronic investment brain. It is capable of true objectivity and business analysis well beyond human capacity. Deeper. Wider. Better.</h2>
              <h2>In the blink of an eye we analyze thousands of businesses at an extreme level of detail that would take 100 men several months to do by hand.</h2>
              <h2>Our offer is to significantly improve your odds for long-term investment success by giving you access to better business analysis and stock selection.</h2>
              <h2>Consider a case where investments are profitable more than 85% of the time, and you, on balance, win more on a winning hand than you lose on a losing hand.</h2>
              <h2>Formula Stocks analytics is based on timeless and proven investment principles. We buy good businesses at reasonable prices. Using a margin of safety.</h2>
              <h2>Progress has always involved adopting better tools. Formula Stocks offers a revolutionary tool which can help you achieve your goals. Join us today.</h2>
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
