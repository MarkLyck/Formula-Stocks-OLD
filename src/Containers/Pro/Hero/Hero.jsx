import React, { Component } from 'react'
import $ from 'jquery'
import platform from 'platform'
import '../../../libraries/typed.js'
import './hero.css'
import Mockup from './Portfolio_Mockup.png'

let userCanSeeSection = true

class Hero extends Component {
  componentDidMount() {
    if (platform.name === 'Chrome' || platform.name === 'Blink') {
      $('.hero').on('mousemove', this.mousemove)
    }
    this.count()

    $("#subtitle").typed({
        stringsElement: $('#subtitles'),
        typeSpeed: 0,
        loop: true,
        showCursor: true,
        backDelay: 2000,
        backSpeed: 0,
    })
     $(window).scroll(() => {
       if ($(window).scrollTop() < 560 && !userCanSeeSection) {
         userCanSeeSection = true
         this.count()
       } else if ($(window).scrollTop() > 560) {
         userCanSeeSection = false
       }
     })
  }

  mousemove = (e) => {
    let offsetX = e.offsetX - ($(window).width() / 2)
    let offsetY = 0

    $('.x-small').css('transform', `translate3d(${offsetX / 75}px, ${offsetY / 80}px, 0px)`)
    $('.small').css('transform', `translate3d(${offsetX / 50}px, ${offsetY / 75}px, 0px)`)
    $('.medium').css('transform', `translate3d(${offsetX / 25}px, ${offsetY / 50}px, 0px)`)
    $('.large').css('transform', `translate3d(${offsetX / 5}px, ${offsetY / 25}px, 0px)`)
  }

  countUp = (element) => {
    if (userCanSeeSection) {
      let oldNumber = Number( $(element).find('.number').text() )
      if (Math.random() > 0.45 || Number( $(element).find('.number').text() ) < 1) {
        $(element).find('.number').text( (oldNumber + Number(Math.random() / 10) ).toFixed(2) )
        $(element).find('i').text('arrow_drop_up')
      } else {
        $(element).find('.number').text( (oldNumber - Number(Math.random() / 10) ).toFixed(2) )
        $(element).find('i').text('arrow_drop_down')
      }
      setTimeout(this.countUp.bind(this, element), Math.round((Math.random() * 5000)) )
    }
  }

  count = () => {
    const self = this
    $('.value').each(function(i) {
      self.countUp(this)
    })
  }

  render() {
    let title = <h1 id="main-title">A <span className="font bold">better</span> way to <span className="font bold">invest</span></h1>
    if (this.props.path === '/pro' || this.props.path === '/pro/signup') {
      title = <h1 id="main-title">Artifical Intelligence equity analysis</h1>
    }

    let subtitles = (
      <div id="subtitles">
        <h1><span className="font bold">Higher returns</span></h1>
        <h1><span className="font bold">Less risk</span></h1>
        <h1><span className="font bold">Easy to use</span></h1>
        <h1><span className="font bold">Lower costs</span></h1>
        <h1><span className="font bold">+89% win/loss ratio</span></h1>
        <h1><span className="font bold">Saves time</span></h1>
      </div>
    )
    if (this.props.path === '/pro') {
      subtitles = (
        <div id="subtitles">
          <h1><span className="font bold">Outperform the market</span></h1>
          <h1><span className="font bold">Moderate your risk</span></h1>
          <h1><span className="font bold">Prediction is the essence of science</span></h1>
        </div>
      )
    }
    return (
      <header>
        <div className="hero">
          <div className="content">
            <div className="bounce-down">
              {title}
              <span id="subtitle"></span>
              {subtitles}
            </div>
          </div>
          <ul className="background-numbers-container">
            <li className="price x-small layer" data-depth="0.30" id="l1" style={{top: '1%', left: '123px'}}>
              <div className="value group1"><p className="number">12.14</p><i className="material-icons">arrow_drop_up</i></div>
            </li>
            <li className="price small layer" data-depth="0.70" id="l2" style={{top: '5%', left: '67px'}}>
              <div className="value group2"><p className="number">8.68</p><i className="material-icons">arrow_drop_up</i></div>
            </li>
            <li className="price medium layer" data-depth="0.80" id="l3" style={{top: '11%', left: '250px'}}>
              <div className="value group3"><p className="number">46.01</p><i className="material-icons">arrow_drop_up</i></div>
            </li>
            <li className="price x-small layer" data-depth="0.30" id="l4" style={{top: '25%', left: '315px'}}>
              <div className="value"><p className="number">9.76</p><i className="material-icons">arrow_drop_up</i></div>
            </li>
            <li className="price large layer" data-depth="1.00" id="l5" style={{top: '48%', left: '122px'}}>
              <div className="value group3"><p className="number">13.09</p><i className="material-icons">arrow_drop_up</i></div>
            </li>
            <li className="price medium layer" data-depth="0.80" id="l6" style={{top: '60%', left: '-5px'}}>
              <div className="value group1"><p className="number">10.83</p><i className="material-icons">arrow_drop_up</i></div>
            </li>
            {this.props.path === '/pro' ? (<li className="price small layer" data-depth="0.70" id="l7" style={{top: '70%', left: '285px'}}>
              <div className="value group3"><p className="number">39.36</p><i className="material-icons">arrow_drop_up</i></div>
            </li>) : '' }
            <li className="price x-small layer" data-depth="0.30" id="l8" style={{top: '95%', left: '228px'}}>
              <div className="value"><p className="number">7.06</p><i className="material-icons">arrow_drop_up</i></div>
            </li>
            <li className="price x-small layer right" data-depth="0.50" id="r1" style={{top: '5%', right: '50px'}}>
              <div className="value group1"><p className="number">9.20</p><i className="material-icons">arrow_drop_up</i></div>
            </li>
            <li className="price medium layer right" data-depth="0.80" id="r2" style={{top: '19%', right: '283px'}}>
              <div className="value group2"><p className="number">10.68</p><i className="material-icons">arrow_drop_up</i></div>
            </li>
            <li className="price x-small layer right" data-depth="0.30" id="r3" style={{top: '22%', right: '520px'}}>
              <div className="value"><p className="number">9.76</p><i className="material-icons">arrow_drop_up</i></div>
            </li>
            <li className="price large layer right" data-depth="1.00" id="r4" style={{top: '30%', right: '45px'}}>
              <div className="value group1"><p className="number">14.07</p><i className="material-icons">arrow_drop_up</i></div>
            </li>
            <li className="price x-small layer right" data-depth="0.50" id="r5" style={{top: '40%', right: '191px'}}>
              <div className="value group3"><p className="number">2.49</p><i className="material-icons">arrow_drop_up</i></div>
            </li>
            <li className="price small layer right" data-depth="0.7" id="r6" style={{top: '58%', right: '195px'}}>
              <div className="value group1"><p className="number">20.36</p><i className="material-icons">arrow_drop_up</i></div>
            </li>
            <li className="price large layer right" data-depth="1.00" id="r7" style={{top: '77%', right: '117px'}}>
              <div className="value group2"><p className="number">65.22</p><i className="material-icons">arrow_drop_up</i></div>
            </li>
            {this.props.path === '/pro' ? (<li className="price x-small layer right" data-depth="0.5" id="r8" style={{top: '87%', right: '338px'}}>
              <div className="value"><p className="number">5.28</p><i className="material-icons">arrow_drop_up</i></div>
            </li>) : ''}
            <li className="price x-small layer right" data-depth="0.5" id="r9" style={{top: '93%', right: '91px'}}>
              <div className="value"><p className="number">5.76</p><i className="material-icons">arrow_drop_up</i></div>
            </li>
          </ul>
          {this.props.path !== '/pro' ? <img src={Mockup} className="mockup" alt="mockup"/> : ''}
        </div>
      </header>
    )
  }
}

export default Hero
