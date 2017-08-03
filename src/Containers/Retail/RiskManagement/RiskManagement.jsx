import React from 'react'

const RiskManagement = ({ info, stats }) => {
  const gainToPainRatio = info ?  info.gainToPainRatio : 1.318
  const sortinoRatio = info ?  info.sortinoRatio : 3.017
  const avgWinPercent = info ?  info.avgGainPerPosition : 65
  const avgLossPercent = info ?  info.avgLossPerPosition : 18
  const winRate = stats ? stats.WLRatio : 90

  const expectation = ((winRate / 100) * avgWinPercent) - ((100 - winRate) / 100 * avgLossPercent)

  return (
    <section className="section">
      <h2 className="title">Risk management</h2>
      <div className="divider"/>
      <p>
        Formula Stocks moderates risk, and we believe it yields a lower degree of risk than passive stock
        market investments. We prefer situations where the perceived reward is significantly larger than the
        perceived risk, or we have some form of margin of safety.<br/><br/>

        One way to measure the risk of using Formula Stocks' Entry product, is to look at its win/loose
        ratio: {Math.floor(winRate)}% of all historical investments have been successful. This is highly unusual and compares to
        59% elsewhere.<br/><br/>

        Another way is the so-called Gain-to-Pain Ratio, which measures exactly what the name indicates.
        It is {gainToPainRatio.toFixed(3)} for Entry, which indicates far more gain than pain.<br/><br/>

        The Sortino Ratio is yet another way to measure risk. It is {sortinoRatio.toFixed(3)} for Formula Stocks Entry, indicating
        high reward and low risk.<br/><br/>

        We can also examine the average gain from a winning stock which is +{avgWinPercent}%, while the average loss
        from a losing stock is only -{avgLossPercent}%. Add to this that Entry also wins {winRate.toFixed(2)}% of the
        time and only looses {(100 - winRate).toFixed(2)}% of the time. This leads us to a mathematical expectation of
        ({(winRate / 100).toFixed(2)} * {avgWinPercent}) - ({((100 - winRate) / 100).toFixed(2)} * {avgLossPercent}) =
        +{expectation.toFixed(2)}%. Taking an average of 2.24 years we correct for this to get an expected annualized
        return of {(expectation / 2.24).toFixed(2)}%.
      </p>
    </section>
  )
}

export default RiskManagement
