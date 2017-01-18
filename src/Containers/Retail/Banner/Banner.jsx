import React from 'react'
import PHLogo from './product-hunt.png'
import './banner.css'

const Banner = () => {
  return (
    <div className="banner">
      <div className="left">
        <img className="banner-logo" src={PHLogo} alt="product hunt"/>
        <h3>Product Hunt promotion</h3>
      </div>
      <div className="right">
        <h3>Use discount code <span className="coupon-code">PRO_HUNT</span> for <span className="semi-bold">10% off Premium!</span></h3>
      </div>
    </div>
  )
}

export default Banner
