import React from 'react'

class HowItWorks extends React.Component {
  render() {
    return (
      <section className="how-it-works section">
        <h2 className="title">What you get</h2>
        <div className="divider"/>
        <div className="beside">
          <div className="left">
            <img className="screenshot" src="/assets/images/Suggestions.png"/>
          </div>
          <div className="right">
            <p>
              You will get access to an easy-to-use dashboard with all the information you need to make
              informed investment decisions – right at your fingertips.<br/><br/>

              We will provide you with new attractive purchase recommendations on a weekly basis,
              and let you know when it is about time to sell on a monthly basis. Performance stats are
              updated daily.<br/><br/>

              You can use these recommendations individually or simply mirror our entire model
              portfolio. Making investing easy and saving you time.
            </p>
          </div>
        </div>
      </section>)
  }
}

export default HowItWorks
