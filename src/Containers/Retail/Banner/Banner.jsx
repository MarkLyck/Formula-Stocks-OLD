import React from 'react'

const Banner = () => {
  console.log('referrer: ', document.referrer)
  if (document.referrer.indexOf('producthunt') > -1) {
    return (
      <div className="banner">
        <h3>Welcome product hunter!</h3>
      </div>
    )
  } else {
    return null
  }
}

export default Banner
