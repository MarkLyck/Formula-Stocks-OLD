import React from 'react'

class StockAnalysis extends React.Component {
  render() {
    return (
      <section>
        <h2 className="title">Stock Analysis</h2>
        <div className="divider"/>
        <p>
          Formula Stocks uses technology to automatically analyze a business in greater detail
          than the human cortex is able to, including estimating its most likely
          future based on data. The human brain is not wired for evaluating hundreds of
          data points simultaneously. We do prefer stories. But stories inherently produce bias,
          and bias dampens performance. <br/><br/>

          Our intelligent technology delivers unbiased thinking on an expert level.
          This analysis is carried out with more experience than the typical analyst can provide,
           and the rational, non-emotional analytical process, provides for better and more
           accurate business decisions, devoid of fear, greed and indecision.<br/><br/>

          As a practical example, in 2016 our IIT™ and business analytics software can analyze
          5,000 businesses based on balance sheets, income and cash flow statements, and other
          fundamental business and economic data in less than a minute and at a level of detail
          that would likely take 100 men several months to perform manually.
        </p>
      </section>
    )
  }
}

export default StockAnalysis
