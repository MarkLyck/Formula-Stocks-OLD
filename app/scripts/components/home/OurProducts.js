import React from 'react'


const OurProducts = React.createClass({
  render() {
    return (
      <section className="our-products bg-gray">
        <div className="content">
          <div className="title-container">
            <h2>Our <span className="blue">Products</span></h2>
            <div className="divider"></div>
          </div>
          <p>
          We offer 4 products, each of which gives you access to a secure dashboard.
          This contains purchase recommendations for common stocks updated weekly,
          sales recommendations, a model portfolio and advanced information about recommended stocks.<br/><br/>

          You can choose to use this information to buy stocks through your regular broker/bank,
          either by using recommendations on a regular basis, or by mirroring the model portfolio.<br/><br/>

          Once purchased, you simply wait. Later, a sales recommendation will suggest you to sell the stock.
          The average holding period is 2.2 years.
          </p>

          <div className="icon-container">
            <div className="plan-icon">
              <img src="assets/icons/icon-user.svg"/>
              <p className="blue">Basic</p>
            </div>
            <div className="plan-icon">
              <img src="assets/icons/icon-briefcase.svg"/>
              <p className="blue">Premium</p>
            </div>
            <div className="plan-icon">
              <img src="assets/icons/icon-chart.svg"/>
              <p className="blue">Business</p>
            </div>
            <div className="plan-icon">
              <img src="assets/icons/icon-building.svg"/>
              <p className="blue">Fund</p>
            </div>
          </div>

          <p>
          <span className="semibold">Basic</span> and <span className="semibold">Premium</span> are both diversified retail products with excellent value propositions.
          <span className="semibold"> Business</span> is designed for CEOs, accredited investores, and enterprising investores with focus on performance and margin of safety,
          at the expense of diversification. Our <span className="semibold">Fund</span> product is for institutional capital,
          capable of handling large diversified AUMs, which other products cannot.
           Each product utilizes a different number of Intelligent Investment Technology formulas.
          You could explore our <a className="blue">product matrix</a> below.
          Or see our <a className="blue">retail brochure</a> or <a className="blue">business brochure</a>.<br/><br/>

          Formula Stocks does not provide personalized investment advice We respect your privacy,
          and receive no financial information in the process.
          We do not manage money nor recommend any products or
          stocks with which we have any affiliation.
          </p>
        </div>
      </section>
    )
  }
})

export default OurProducts
