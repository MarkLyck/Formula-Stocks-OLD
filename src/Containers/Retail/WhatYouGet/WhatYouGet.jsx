import React from 'react'
import Screenshot from './Suggestions.jpg'
import './whatYouGet.css'

class WhatYouGet extends React.Component {
  render() {
    return (
      <section className="what-you-get section">
        <h2 className="title">What you get</h2>
        <div className="divider"/>
        <div className="beside">
          <div className="left">
            <img className="screenshot" src={Screenshot} alt="suggestions screenshot"/>
          </div>
          <div className="right">
            <p>
              You will get access to an easy-to-use dashboard with all the information you need to make
              informed investment decisions – right at your fingertips.<br/><br/>

              We will provide you with new attractive purchase recommendations on a weekly basis,
              and on a monthly basis let you know when it is time to sell. Performance stats are
              updated daily.<br/><br/>

              You can use these recommendations individually or simply mirror our entire model
              portfolio, making investing easy and saving you time.
            </p>
          </div>
        </div>
      </section>)
  }
}

export default WhatYouGet
