import React from 'react'
import CollapseSegment from './components/CollapseSegment.jsx'

class HowWeBeatTheMarket extends React.Component {
  render() {
    return (
      <section>
        <h2 className="title">How we beat the market</h2>
        <div className="divider"/>
        <CollapseSegment title="Stock analysis">
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
        </CollapseSegment>
        <CollapseSegment title="Machine learning">
          <p>
            We use machine learning to obtain a level of experience which it is quite
            impossible to obtain through regular career experience.<br/><br/>

            We humans usually learn through experience and mistakes.
            There is however only so much experience, and so many mistakes possible in any
            normal career with potential for teaching durable lessons of general value.
            Our machine learning software is capable of experiencing millions and millions
            of events and decision outcomes, in the same timeframe we as human beings
            can experience less than hundred. This greatly accelerates experience,
            rationalization, learning, knowledge.
          </p>
        </CollapseSegment>
        <CollapseSegment title="Scientific method">
          <p>
            We develop based on the scientific method. A thesis is formed,
            based on observation and logic. A priori investment recommendations are selected
            in a randomized double blind controlled trial. A posteriori results determine the
            validity of the thesis tested in comparison with a baseline.<br/><br/>

            By accepting or rejecting thesis' numbering in the thousands,
            with quantitative hard data, we have advanced the basic knowledge in our
            field over the last 14 years. The speed of the process has been greatly
            accelerated by machine learning.<br/><br/>

            All scientific studies are performed in an environment,
            specifically built so as to be non-biased in every possible respect.
          </p>
        </CollapseSegment>
        <CollapseSegment title="Statistics">
          <p>
            Formula Stocks is strongly focused on high-probability events.
            Each method used, has strongly devised mathematical probabilities of winning
            versus losing. The mathematical expectancy is known well in advance, each time a
            recommendation is issued.<br/><br/>

            When producing statistical information care is given to ensure it is solid,
            and based on timeless observations which true not just in a specific timeperiod or
            market, but generally over the long run. All statistical material is derived from at
            least 50 years of measurements.
          </p>
        </CollapseSegment>
        <CollapseSegment title="Active management">
          <p>
            Formula Stocks does more than select equities. It includes an active management system,
            which actively buys, holds, and sells equities when deemed most beneficial.
            Active management adds value. On a portfolio of random stocks,
            active management typically adds around 2,4% to annual performance.
            On a well selected portfolio of attractive stocks, active management typically adds around
            6% to annual performance, compared to passive management.
          </p>
        </CollapseSegment>
        <CollapseSegment title="94 IITs & Robustness">
          <p>
            Users can access the results of up to 94 different Intelligent Investment Technologies,
            or IITs for short. IITs are methods for outperforming the market. An IIT is specialized
            in one field or another, capable of making superior decisions in this particular field
            due to deep expert knowledge acquired. Due to deep expert specialization,
            IITs are extremely capable within their field. IITs can work in any number of ways,
            and within as many different investment disciplines- but they always have one basic
            attribute in common: The mathematical probabilities and statistical properties of any
            IIT define it as being capable of beating the general market, even on its own.<br/><br/>

            Generally, IIT decisions are made when mathematical and statistical properties
            indicate 90%+ probability a priori for winning over the long run.
            Win ratio expectations has typically been observed around this approximate
            level a posteori.
          </p>
          <p className="quote">
            "The fact that we do not rely on a single, or even a dozen strategies,
            and only use the ones we can unequivocally prove have worked for half a century,
            is a testament to the ruggedness of our approach. It will not suddenly be
            arbitraged away, falter due to macroeconomic change, or cease to be relevant."
          </p>
        </CollapseSegment>
      </section>)
  }
}

export default HowWeBeatTheMarket
