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

          We can also examine the average gain from a winning stock which is +56.62%, while the average loss
          from a losing stock is only -16.90%. Add to this that Entry also wins 89.27% of the time and only
          looses 10.73% of the time. This leads us to a mathematical expectation of
          (0.892 * 56.62) - (0.107 * 16.90) = +48,70%. Taking an average of 2.24 years to achieve we can divide
          48.70 by 2.24 and get an expected annualized return of 21.74%. This is the expected return when 100%
          invested at all times. While not always possible (good investments can be scarce), it leads to an
          18.97% annual rate of growth.
        </p>
      </section>
    )
  }
}

export default RiskManagement
