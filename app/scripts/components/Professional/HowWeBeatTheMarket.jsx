import React from 'react'
import Scroll from 'react-scroll'
import CollapseSegment from './components/CollapseSegment.jsx'

class HowWeBeatTheMarket extends React.Component {
  render() {
    const Element = Scroll.Element
    return (
      <section>
        <Element name="howItWorks"/>
        <h2 className="title">How we beat the market</h2>
        <div className="divider"/>
        <CollapseSegment title="Overview">
          <p>
            Outperforming the market has always been challenging. The competition is extreme.
            The only way in which to succeed in a systematic and durable fashion, is to
            possess some form of knowledge, skill or information, which other market
            participants do not possess in equal measure.<br/><br/>

            There is still a widespread belief that the markets are efficient. They are not of
            course. Ample evidence has been produced decades ago to disprove this theory. Our
            favorite has to be Warren Buffetts flawless argument presented in<sup>1</sup>.<br/><br/>

            A principal reason some academics has held that the markets were efficient for
            years, and effectively discounted all known information, to the point of pricing
            being "correct", has been their inability to deconstruct properly how the market
            operates, and what really determines security prices.<br/><br/>

            This area has been a central area of research at Formula Stocks since 2002.
            Utilizing 20 years of previous experience in HPC (high performance computing), and
            pioneering scientific research in other areas such as N-dimensional geometry and 3D
            mathematics, our team has produced a much better understanding of what moves security
            prices, than that which is considered generally available knowledge. This involves
            machine based learning, not unlike that employed by IBM when they constructed the chess
            computer, Deep Blue, that effectively beat then grandmaster Gary Kasparov 2-1 in 1997.
            <br/><br/>

            Our research has eventually enabled us to analyze a group of stocks, and predict,
            a priori, its future returns as a group within a reasonable tolerance of the
            results obtained years later, a posteori.
          </p>
          <p className="disclaimer">
            <sup>1</sup>Buffett, Warren E. 1984. The Superinvestors of Graham-and-Doddsville. Hermes,
            the Columbia Business School Magazine.
          </p>
        </CollapseSegment>
        <CollapseSegment title="Stock analysis">
          <p>
            The traditional human approach to stock analysis starts with an understanding of
            the story behind a stock. It is a human beings preferred method of analysis, to
            absorb and understand a story, because our brains are designed to respond to and
            understand stories very well. Probably our ancestors communicated vital
            information for survival, when gathered around a bonfire using stories as the
            medium.<br/><br/>

            When it comes to hard facts the situation changes. Scientific studies show, that
            when the human brain has to respond to a limited number of variables such as 4
            simultanously in product comparisons it responds reasonably well (60% correct), but
            already with 12 variables analysis breaks down and correct responses plummet to around
            20% due to information overload<sup>1</sup>. Formula Stock analysis weighs over many hundreds
            of variables simultaneously, 100 times more than a human brain is capable of.<br/><br/>

            Such analysis would be prohibitively expensive to perform manually. As a practical
            example, our business analytics software can analyze 5,000 businesses based on
            balance sheets, income and cash flow statements, and many other forms of
            fundamental business and economic data in less than a minute and at a level of
            detail that would likely take 100 men several months to perform manually.<br/><br/>

            Being capable of such analysis is one thing. Acting upon the information another.
            The human cognitive system is heavily reliant on biases. Short cuts are used to
            make quick decisions possible. Quick does not equal correct, and a cognitive
            tradeoff is made along the lines of rather arriving at a quick, if only
            occasionally correct conclusion, than arriving much more slowly at a correct
            conclusion. This too, is thought to have a basis in evolution. After all, if
            chased by a predator, slowly calculating the optimal escape route has generally
            not yielded as good a chance for evolutionary success,  as simply running as fast
            as possible in the approximate direction.<br/><br/>

            An analytical system, designed to analyze in greater depth and detail, to
            understand concepts more thoroughly, to make unbiased decisions based on hard
            data, has in fact very good odds of outperforming the evolutionary baggage we all
            carry with us.<br/><br/>

            Formula Stocks embodies such analysis, as evidenced by its tested ratio of winners
            of to losers, in the neighborhood of 90%.
          </p>
          <p className="disclaimer">
            <sup>1</sup>A. Dijksterhuis, M. Bos, L. Nordgren, and R Van Baaren, "On making the right
            choice: The deliberation without attention effect", Science 311 (2007): 1005-1007
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
            We develop based on the scientific method. A thesis is formed, based on
            observation and logic. A priori investment recommendations are selected in a
            randomized double blind controlled trial based on the thesis. A posteriori results
            determine the validity of the thesis tested in comparison with a baseline.<br/><br/>

            By accepting or rejecting thesis' numbering in the thousands, with quantitative
            hard data, we have advanced the basic knowledge in our field over the last 14
            years. The speed of the process has been greatly accelerated by machine learning.<br/><br/>

            All scientific studies are performed in an environment, specifically built so as
            to be non-biased in every possible respect.
          </p>
        </CollapseSegment>
        <CollapseSegment title="Statistics">
          <p>
            Formula Stocks is strongly focused on high-probability events.
            Each method used, has strongly devised mathematical probabilities of winning
            versus losing. The mathematical expectancy is known, each time a recommendation
            is issued.<br/><br/>

            When producing statistical information care is given to ensure it is solid, and
            based on timeless observations which are true not just in a specific time period or
            market, but generally over the long run. All statistical material is derived from
            at least 50 years of measurements.
          </p>
        </CollapseSegment>
        <CollapseSegment title="Active management">
          <p>
            Formula Stocks does more than select equities. It includes an active management system,
            which actively buys, holds, and sells equities when deemed most beneficial.
            Active management adds value. On a portfolio of random stocks, active management
            typically adds around 2,4% to annual performance. On a well selected portfolio of
            attractive stocks, it typically adds around 6% to annual performance, compared to
            passive management.
          </p>
        </CollapseSegment>
        <CollapseSegment title="93 IITs & Robustness">
          <p>
            Users can access the results of up to 93 different Intelligent Investment
            Technologies, or IITs for short. IITs are methods for outperforming the market. An
            IIT is specialized in one field or another, capable of making superior decisions
            in this particular field due to deep expert knowledge acquired. Due to this
            specialization, IITs are extremely capable within their field. IITs can work in
            any number of ways, and within as many different investment disciplines- but they
            always have one basic attribute in common: The mathematical probabilities and
            statistical properties of any IIT define it as being capable of outperforming the
            market, even on its own.<br/><br/>

            Generally, IIT decisions are made when mathematical and statistical properties
            indicate an approximate 90%+ probability a priori for winning over the long run.
          </p>
          <p className="quote">
            <div className="content">
              <i className="fa fa-quote-right" aria-hidden="true"></i>
              <p>
                "The fact that we do not rely on a single, or even a dozen strategies, and
                only use the ones we can unequivocally prove have worked for half a century,
                is a testament to the ruggedness of our approach. It will not suddenly be
                arbitraged away, falter due to macroeconomic change, or cease to be relevant."
              </p>
            </div>
            <p className="from">- Thomas Lyck</p>
          </p>
        </CollapseSegment>
      </section>)
  }
}

export default HowWeBeatTheMarket
