import React from 'react'
import CollapseSegment from './components/CollapseSegment.jsx'

class Comparisons extends React.Component {
  render() {
    return (
      <section className="comparisons">
        <h2 className="title">Compare Formula Stocks to:</h2>
        <div className="divider"/>
        <CollapseSegment title="Passive management">
          <p>
            Formula Stocks does more than select equities. It includes an active management
            system, which actively buys, holds, and sells equities when deemed most beneficial.
            Active management adds value. On a portfolio of random stocks, active management
            typically adds around 2,4% to annual performance. On a well selected portfolio of
            attractive stocks, active management typically adds around 6% to annual performance,
            compared to passive management.
          </p>
        </CollapseSegment>
        <CollapseSegment title="Growth investing or Garp">
          <p>
            Formula Stocks offer an abundance of IITs which are specialized towards growth
            stocks. As any rational investor, we do not want to overpay for growth however.
            Or to quote Warren Buffett, value and growth is joined at the hip. It is
            imperative to pay a reasonable price also when dealing with stocks exhibiting
            strong growth. The growth investor may find that our calculation of what
            constitutes a reasonable price is in fact better than the markets idea.
            As a growth investor, we can help you find growth opportunities which are not
            fully discounted by the market.
          </p>
        </CollapseSegment>
        <CollapseSegment title="Graham's net nets">
          <p>
            Do you like Benjamin Grahams old, but tried "Net nets" investment strategy? It is
            simple. Still Grahams methods produced a rather low win ratio. We offer a modern
            version with much improved precision, performance and better win ratio's. Formula
            Stocks members get access to our next generation net net's, and a whole lot of
            other methods with a significant margin of safety. Get 85%-92% winratios instead of
            Grahams approx. 55% by subscribing.
          </p>
        </CollapseSegment>
        <CollapseSegment title="Magic Formula">
          <p>
            Whereas the Greenblatt method is logically simple and we applaud a formulaic
            approach, it does exhibit a lower performance outside of the years documented by
            its author, and larger drawdowns. Its winratio is approx. 59% by our calculation,
            compared to Formula Stocks winratio in the 89-92%. Migrating to Formula Stocks
            might well yield you significant benefits in terms of increased performance and
            lower risk.
          </p>
        </CollapseSegment>
        <CollapseSegment title="Value investing">
          <p>
            A rationel investment process involves selling at a higher price, that which is
            bought at a lower price. Value Investing has always been adept at limiting the
            downside, typically via a margin of safety approach. We provide any number of
            investment strategies in multiple fields, all of which has one thing in common:
            We only buy that which offers a high probability long term gain. Generally we insist
            on a margin of safety to ensure this goal is met, even if our margin need not be
            valuation based, but can be based on mathematical probabilities instead, or growth,
            to name but a few. Value investors will feel right at home with Formula Stocks, and
            can save an immense amount of time and energy using our analysis. A membership may
            turn out to be the best value investment you have made.
          </p>
        </CollapseSegment>
        <CollapseSegment title="Quantitative investing">
          <p>
            Quantitative approaches are typically dominated to single or multi-factor models
            with somewhat moderate performance. Formula Stocks does quantitative analysis as
            well, but from another angle of Business Analytics, as opposed to market analysis.
            We prefer a hard data approach with unambigous mathematical properties.
            Consult our winratios and high probability event prediction, for very good reasons
            to switch to Formula Stocks.
          </p>
        </CollapseSegment>
        <CollapseSegment title="Active fund management">
          <p>
            Any number of active management approaches exist, and using Formula Stocks can be
            quite similar to investing with a fund manager, except for the fact that you trade
            in your own account. Formula Stocks performs active management on its model
            portfolios, yielding up to 6% higher performance on a portfolio of very well
            selected stocks, compared to passive management. A personal subscription may be a
            way to save on costs.
          </p>
        </CollapseSegment>
      </section>
    )
  }
}

export default Comparisons
