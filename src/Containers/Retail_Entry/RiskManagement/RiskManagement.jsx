import React from 'react'

class RiskManagement extends React.Component {
  render() {
    return (
      <section className="section">
        <h2 className="title">Risk management</h2>
        <div className="divider"/>
        <p>
          Investing is always associated with some risk. However, it is possible to invest only when the
          perceived reward is larger than the perceived risk, or when there is some other margin of safety.<br/><br/>

          Formula Stocks is good at moderating risk, and we believe it yields a lower degree of risk than
          passive stock market investments.<br/><br/>

          One way to measure the risk of using Formula Stocks' Entry product, is to look at its win/loose
          ratio: 89% of all historical investments have been succesful. This is highly unusual and compares to
          59% elsewhere.<br/><br/>

          Another way is the so-called Gain-to-Pain Ratio, which measures exactly what the name indicates.
          It is 1.318 for Entry, which indicates far more gain than pain.<br/><br/>

          The Sortino Ratio is yet another way to measure risk. It is 3.017 for Formula Stocks Entry, indicating
          high reward and low risk.<br/><br/>

          We can also examine the average gain from a winning stock which is +65.97%, while the average
          loss from a losing stock is only -18.32%. Add to this that Entry also wins 89.29% of the time and
          only looses 10.71% of the time. This leads us to a mathematical expectation of
          (0.89 * 65.97) - (0.11 * 18.32) = +56.95%. Taking an average of 2.24 years to achieve we can divide
          59.95 by 2.24 and get an expected annualized return of 26.76%.<br/><br/>

          This is the expected return when 100% invested at all times. This is not always possible (good
          investments are sometimes scarce), and leads to an 18.87% annual rate of growth. This is the
          average performance of Entry as measured since 1970.
        </p>
      </section>
    )
  }
}

export default RiskManagement
