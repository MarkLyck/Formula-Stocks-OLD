import React from 'react'
import $ from 'jquery'
import typed from '../../libraries/typed.js'

let userCanSeeSection = true

class Hero extends React.Component {
  componentDidMount() {
    $('.hero2').on('mousemove', this.mousemove)
    this.count()

    $("#subtitle").typed({
        stringsElement: $('#subtitles'),
        typeSpeed: 0,
        loop: true,
        showCursor: true,
        backDelay: 2000,
        backSpeed: 0,
    })
  }

  mousemove(e) {
    let offsetX = e.offsetX - ($(window).width() / 2)
    let offsetY = 0

    $('.x-small').css('transform', `translate3d(${offsetX / 75}px, ${offsetY / 80}px, 0px)`)
    $('.small').css('transform', `translate3d(${offsetX / 50}px, ${offsetY / 75}px, 0px)`)
    $('.medium').css('transform', `translate3d(${offsetX / 25}px, ${offsetY / 50}px, 0px)`)
    $('.large').css('transform', `translate3d(${offsetX / 5}px, ${offsetY / 25}px, 0px)`)
  }

  countUp(element) {
    if (userCanSeeSection) {
      let oldNumber = Number( $(element).text() )
      if (Math.random() > 0.45 || Number( $(element).text() ) < 1) {
        $(element).find('p').text( (oldNumber + Number(Math.random() / 10) ).toFixed(2) )
        $(element).find('i').removeClass('fa-caret-down').addClass('fa-caret-up')
      } else {
        $(element).find('p').text( (oldNumber - Number(Math.random() / 10) ).toFixed(2) )
        $(element).find('i').removeClass('fa-caret-up').addClass('fa-caret-down')
      }

      setTimeout(this.countUp.bind(this, element), Math.round((Math.random() * 3000)) )
    }
  }

  count() {
    const self = this
    $('.value').each(function(i) {
      self.countUp(this)
    })
  }

  render() {
    return (
      <header>
        <div className="hero2">
          <div className="content">
            <div className="bounce-down">
              <h1 id="main-title">A better way for the <span className="font bold">active investor</span> to</h1>
              <span id="subtitle"></span>
              <div id="subtitles">
                <h1><span className="font bold">Improve investment returns</span></h1>
                <h1><span className="font bold">Save time</span></h1>
                <h1><span className="font bold">Reduce costs</span></h1>
              </div>
            </div>
          </div>
          <ul className="background-numbers-container">
            <li className="price x-small layer" data-depth="0.30" id="l1" style={{top: '1%', left: '123px'}}>
              <div className="value group1">
                <p>12.14</p>
                <i className="fa fa-caret-up" aria-hidden="true"></i>
              </div>
            </li>
            <li className="price small layer" data-depth="0.70" id="l2" style={{top: '5%', left: '67px'}}>
              <div className="value group2"><p>8.68</p><i className="fa fa-caret-up" aria-hidden="true"></i></div>
            </li>
            <li className="price medium layer" data-depth="0.80" id="l3" style={{top: '11%', left: '250px'}}>
              <div className="value group3"><p>46.01</p><i className="fa fa-caret-up" aria-hidden="true"></i></div>
            </li>
            <li className="price x-small layer" data-depth="0.30" id="l4" style={{top: '25%', left: '315px'}}>
              <div className="value"><p>9.76</p><i className="fa fa-caret-up" aria-hidden="true"></i></div>
            </li>
            <li className="price large layer" data-depth="1.00" id="l5" style={{top: '48%', left: '122px'}}>
              <div className="value group3"><p>13.09</p><i className="fa fa-caret-up" aria-hidden="true"></i></div>
            </li>
            <li className="price medium layer" data-depth="0.80" id="l6" style={{top: '60%', left: '-5px'}}>
              <div className="value group1"><p>10.83</p><i className="fa fa-caret-up" aria-hidden="true"></i></div>
            </li>
            <li className="price small layer" data-depth="0.70" id="l7" style={{top: '70%', left: '285px'}}>
              <div className="value group3"><p>39.36</p><i className="fa fa-caret-up" aria-hidden="true"></i></div>
            </li>
            <li className="price x-small layer" data-depth="0.30" id="l8" style={{top: '95%', left: '228px'}}>
              <div className="value"><p>7.06</p><i className="fa fa-caret-up" aria-hidden="true"></i></div>
            </li>
            <li className="price x-small layer right" data-depth="0.50" id="r1" style={{top: '5%', right: '50px'}}>
              <div className="value group1"><p>9.20</p><i className="fa fa-caret-up" aria-hidden="true"></i></div>
            </li>
            <li className="price medium layer right" data-depth="0.80" id="r2" style={{top: '19%', right: '283px'}}>
              <div className="value group2"><p>10.68</p><i className="fa fa-caret-up" aria-hidden="true"></i></div>
            </li>
            <li className="price x-small layer right" data-depth="0.30" id="r3" style={{top: '22%', right: '520px'}}>
              <div className="value"><p>9.76</p><i className="fa fa-caret-up" aria-hidden="true"></i></div>

            </li>
            <li className="price large layer right" data-depth="1.00" id="r4" style={{top: '30%', right: '45px'}}>
              <div className="value group1"><p>14.07</p><i className="fa fa-caret-up" aria-hidden="true"></i></div>

            </li>
            <li className="price x-small layer right" data-depth="0.50" id="r5" style={{top: '40%', right: '191px'}}>
              <div className="value group3"><p>2.49</p><i className="fa fa-caret-up" aria-hidden="true"></i></div>

            </li>
            <li className="price small layer right" data-depth="0.7" id="r6" style={{top: '58%', right: '195px'}}>
              <div className="value group1"><p>20.36</p><i className="fa fa-caret-up" aria-hidden="true"></i></div>

            </li>
            <li className="price large layer right" data-depth="1.00" id="r7" style={{top: '77%', right: '117px'}}>
              <div className="value group2"><p>65.22</p><i className="fa fa-caret-up" aria-hidden="true"></i></div>

            </li>
            <li className="price x-small layer right" data-depth="0.5" id="r8" style={{top: '87%', right: '338px'}}>
              <div className="value"><p>5.28</p><i className="fa fa-caret-up" aria-hidden="true"></i></div>

            </li>
            <li className="price x-small layer right" data-depth="0.5" id="r9" style={{top: '93%', right: '91px'}}>
              <div className="value"><p>5.76</p><i className="fa fa-caret-up" aria-hidden="true"></i></div>

            </li>
          </ul>
        </div>
      </header>
    )
  }
}

export default Hero
