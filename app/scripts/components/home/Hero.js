import React from 'react'
import $ from 'jquery'
import Scroll from 'react-scroll'

// import WhatIsIt from './WhatIsIt'
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
      typeSpeed: 0,
      loop: true,
      showCursor: true,
      backDelay: 2000,
      backSpeed: 0,
    })
  },
  render() {
    let Link = Scroll.Link;
    let Element = Scroll.Element;

    let iOSException = ''
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (iOS) { iOSException = 'iOSException' }

    return (
      <header id="hero" className={iOSException}>
        <div className="content">
          <div className="bounce-down">
            <h1 id="main-title">A better <span className="font bold">solution</span> for the <span className="font bold">stock market</span></h1>
            <span id="subtitle"></span>
            <div id="subtitles">
              <h2>Improve investment returns</h2>
              <h2>Save time</h2>
              <h2>Reduce costs</h2>
              <h2>Simplify investing</h2>
            </div>
          </div>
          <div className="CTA fade-in">
            <button className="filled-btn" onClick={this.tryIt}>Try it for free!</button>
            <Link className="outline-btn" to="whatIsIt" smooth={true} offset={-100} duration={500}>Learn more</Link>
          </div>
        </div>
      </header>
    )
  }
})

export default Hero
