import React from 'react'
import $ from 'jquery'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../../../libraries/typed.js'
import './heroSlider.css'

import img_0 from './images/achieveGoals.jpg'
import img_1 from './images/speedster.jpg'
import img_2 from './images/net.jpg'
import img_3 from './images/boat.jpg'
import img_4 from './images/family.jpg'
import img_5 from './images/target.jpg'

class Hero extends React.Component {
  constructor(props) {
    super(props)
    this.preStringTyped = this.preStringTyped.bind(this)

    this.state = { firstLoad: true }
  }

  preStringTyped() {
    if (!this.state.firstLoad && this.slider) {
      this.slider.slickNext()
    } else {
      this.setState({ firstLoad: false })
    }
  }

  componentWillReceiveProps(newProps) {
    $("#subtitle").typed({
        stringsElement: $('#subtitles'),
        typeSpeed: 10,
        loop: true,
        showCursor: true,
        backDelay: 5000,
        backSpeed: 0,
        preStringTyped: this.preStringTyped
    })
  }

  render() {
    let title = <h1 id="main-title">A <span className="font bold">better</span> way to <span className="font bold">invest</span></h1>
    let subtitles = (
      <div id="subtitles">
        <h1><span className="font bold">Achieve your goals</span></h1>
        <h1><span className="font bold">+{Math.floor(this.props.portfolioReturn)}% capital growth since 2009</span></h1>
        <h1><span className="font bold">Less risk</span></h1>
        <h1><span className="font bold">Easy to use</span></h1>
        <h1><span className="font bold">Lower costs</span></h1>
        <h1><span className="font bold">+89% win ratio</span></h1>
      </div>
    )

    const slickSettings = {
      focusOnSelect: false,
      infinite: true,
      fade: true,
      speed: 1500,
      autoplay: false,
      swipe: false,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1
    }

    return (
      <div className="hero-slider">

        <div className="content">
          <div className="bounce-down">
            {title}
            <span id="subtitle"></span>
            {subtitles}
          </div>
        </div>
        <div className="overlay"/>
        <Slider {...slickSettings} ref={c => this.slider = c }>
           <div className="slider-image" style={{ backgroundImage: `url(${img_0})`}}/>
           <div className="slider-image" style={{ backgroundImage: `url(${img_1})`}}/>
           <div className="slider-image" style={{ backgroundImage: `url(${img_2})`}}/>
           <div className="slider-image" style={{ backgroundImage: `url(${img_3})`}}/>
           <div className="slider-image" style={{ backgroundImage: `url(${img_4})`}}/>
           <div className="slider-image" style={{ backgroundImage: `url(${img_5})`}}/>
        </Slider>
      </div>
    )
  }
}

export default Hero
