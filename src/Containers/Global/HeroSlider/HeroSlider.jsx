import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './heroSlider.css'

import img_0 from './images/0.jpg'
import img_1 from './images/1.jpg'
import img_2 from './images/2.jpg'
import img_3 from './images/3.jpg'
import img_4 from './images/4.jpg'
import img_5 from './images/5.jpg'
import img_6 from './images/6.jpg'

class Hero extends React.Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      fade: true,
      speed: 1000,
      autoplay: true,
      autoplaySpeed: 5000,
      slidesToShow: 1,
      slidesToScroll: 1
    }
    return (
      <div className="hero-slider">
        <Slider {...settings}>
           <div className="slider-image" style={{ backgroundImage: `url(${img_0})`}}/>
           <div className="slider-image" style={{ backgroundImage: `url(${img_1})`}}/>
           <div className="slider-image" style={{ backgroundImage: `url(${img_2})`}}/>
           <div className="slider-image" style={{ backgroundImage: `url(${img_3})`}}/>
           <div className="slider-image" style={{ backgroundImage: `url(${img_4})`}}/>
           <div className="slider-image" style={{ backgroundImage: `url(${img_5})`}}/>
           <div className="slider-image" style={{ backgroundImage: `url(${img_6})`}}/>
        </Slider>
      </div>
    )
  }
}

export default Hero
