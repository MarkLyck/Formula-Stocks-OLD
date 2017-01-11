import React from 'react'
import CollapseSegment from '../Components/CollapseSegment/CollapseSegment'

class Comparisons extends React.Component {
  render() {
    return (
      <section className="comparisons section">
        <h2 className="title">Compare Formula Stocks to:</h2>
        <div className="divider"/>
        <CollapseSegment title="Passive management" >
          <p>
            Formula Stocks has developed a technology known as Alpha Prediction. Using Alpha
            Prediction we can map the entire investment universe, based on expected performance,
            in descending order. We thus have a good estimate of which stock is the best
            single investment in the entire marketplace right now, which is the worst
            investment in the marketplace right now, and every single step in-between.
            Alpha Prediction works rather well. Given the availability of such technology,
            passive management as a concept is entirely non-sensical to us. Why aim for an
            average return, when even a simple strategy of avoiding the 50% worst stocks can
            easily outperform the average? While we certainly appreciate low cost and
            scalability, these attractive parameters are offered by Formula
            Stocks as well.
          </p>
        </CollapseSegment>
        <CollapseSegment title="Growth investing or Garp">
          <p>
            Formula Stocks offers an abundance of IITs™ which are specialized in growth
            stocks. Like any rational investor we do not want to pay too much for growth, though.
            Or to quote Warren Buffett, value and growth are joined at the hip. Payin a reasonable price s
            imperative, also when dealing with stocks exhibiting
            strong growth. Growth investors may find that our calculation of what
            constitutes a reasonable price is in fact better than the market's idea.
            As a growth investor, we can help you find growth opportunities which have not
            been fully discounted by the market.
          </p>
        </CollapseSegment>
        <CollapseSegment title="Graham's net nets">
          <p>
            Do you like Benjamin Graham's old, but tried "net nets" investment strategy? It is
            simple. Still, Graham's methods produced a rather low win ratio. We offer a modern
            version with far greater precision, performance, and win ratios. Members get
            access to the next generation of net net's developed by Formula Stocks, and a whole lot of
            other methods with a significant margin of safety. Get 85%-92% win ratios instead of
            Grahams approx. 55% by subscribing to Formula Stocks.
          </p>
        </CollapseSegment>
        <CollapseSegment title="Magic Formula">
          <p>
            Whereas the "magic formula" is very simple - and we applaud a formulaic approach, - it does
            exhibit large drawdowns, and its win ratio is only approx. 59% (by our calculation) compared
            to Formula Stocks' win ratio, which is typically around 89-92%. Using Formula Stocks may
            very well yield significant benefits in terms of increased performance and lower risk.
            Selection criteria for Formula Stocks are based on logic weighing several hundred datapoints,
            compared to the below 10 used in the magic formula.
          </p>
        </CollapseSegment>
        <CollapseSegment title="Value investing">
          <p>
            A rational investment process involves selling at a higher price what has been
            bought at a lower price. Value investing has always been adept at limiting the
            downside, typically via it's margin of safety approach. We provide a large number of
            investment strategies in multiple fields, all of which have one thing in common:
            We only buy stocks which offer a high probability of long-term gain. We generally
            insist on a significant margin of safety to ensure that this goal is met.
            Our margin does not have to be valuation based, though, but can equally well be based on mathematical
            probabilities, or growth, to name but a few. If you are a value investor you should feel right at
            home with Formula Stocks, not to mention save an immense amount of time and energy
            using our analysis. A Formula Stocks membership may turn out to be the best value investment you
            have ever made.
          </p>
        </CollapseSegment>
        <CollapseSegment title="Quantitative investing">
          <p>
            Quantitative approaches are typically dominated by single or multi-factor models
            with a somewhat moderate performance. Formula Stocks does quantitative analysis too,
            but from a business analytics approach, as opposed to a market analysis approach.
            We prefer a hard data approach with unambiguous mathematical properties. Consult our
            win ratios and high probability event prediction, for a couple of good reasons to try
            out Formula Stocks.
          </p>
        </CollapseSegment>
        <CollapseSegment title="Active management">
          <p>
            There is a large number of active management approaches. There may be a few
            similarities between using Formula Stocks and investing with an active manager,
            but with Formula Stocks you trade in
            your own account. We conduct active management in our model portfolios, which improves
            the performance of a portfolio of well-selected stocks by up to 6% higher performance
            compared to passive management. A personal subscription may be a way to save money on
            costs.
          </p>
        </CollapseSegment>
      </section>
    )
  }
}

export default Comparisons
