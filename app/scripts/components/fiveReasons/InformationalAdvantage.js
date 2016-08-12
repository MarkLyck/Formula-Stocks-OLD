import React from 'react'

const InformationalAdvantage = React.createClass({
  render() {
    return (
      <div className="bg-white split-section informational-advantage">
        <div className="content">
          <div className="left">
            <h2 className="title">An informational advantage</h2>
            <p>
              Formula Stocks uses state-of-the-art technology to compile and
              analyze an enormous amount of information, creating a new unique
              edge for outperforming the market. And, above all, we make it
              available only to a small number of members, giving them an
              advantage available nowhere else.<br/><br/>

              This scientifically based approach on stock selection has predicted
              winners with an 84%, 87%, 90% and 97% success rate in the past.<br/><br/>

              This contrasts strongly to the ≈60% win ratio of typical
              investments in the market.<br/><br/>

              To the right you see four different Formula Stocks products and their
              win ratio performance relative to the market.
            </p>
          </div>
          <div className="right">
            <div className="bar-chart">
              <div className="bar basic-bar"><p>84%</p></div>
              <div className="bar premium-bar"><p>90%</p></div>
              <div className="bar business-bar"><p>95%</p></div>
              <div className="bar fund-bar"><p>87%</p></div>
              <div className="sp-bar"><p>60%</p></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

export default InformationalAdvantage
