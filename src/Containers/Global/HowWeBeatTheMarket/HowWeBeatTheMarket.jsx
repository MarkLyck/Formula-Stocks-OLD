import React from 'react'
import Scroll from 'react-scroll'
import CollapseSegment from '../Components/CollapseSegment/CollapseSegment'
import './howWeBeatTheMarket.css'

class HowWeBeatTheMarket extends React.Component {
  render() {
    const Element = Scroll.Element
    return (
      <section className="section">
        <Element name="howItWorks"/>
        <h2 className="title">How we beat the market</h2>
        <div className="divider"/>
        <CollapseSegment title="Overview">
          <p>
            Outperforming the market has always been a challenge. The competition is extreme.
            The only way to succeed in a systematic and durable fashion is to
            possess some form of knowledge, skill, or information that other market
            participants do not possess in equal measure.<br/><br/>

            It is a widespread belief that the markets are efficient. They are not of
            course. Ample evidence disproving this theory was widely available decades ago. Our
            favorite has to be Warren Buffetts flawless argument presented in The
            Superinvestors of Graham-and-Doddsville<sup>1</sup>.<br/><br/>

            Some academics have continued to argue that the markets are efficient for
            years, effectively discounting all known information to the point where prices are considered
            "correct". This is mainly due to their inability to properly understand how the market
            operates and what really determines security prices.<br/><br/>

            This has been a main area of research at Formula Stocks since 2002.
            Utilizing 20 years of previous experience in HPC (high-performance computing), and
            pioneering scientific research in other areas, including N-dimensional geometry and 3D
            mathematics, our team has produced a much better understanding of what moves security
            prices than that the one available in contemporary published research. This involves
            machine-based learning, not unlike that employed by IBM when they constructed the chess
            computer, Deep Blue, which effectively beat then grandmaster Gary Kasparov 2-1 in 1997.
            <br/><br/>

            Our research has eventually enabled us to analyze a group of stocks and predict,
            a priori, its future returns as a group a posteriori within a reasonable margin of error.
          </p>
          <p className="disclaimer">
            <sup>1</sup>Buffett, Warren E. 1984. The Superinvestors of Graham-and-Doddsville. Hermes,
             Columbia Business School alumni magazine, now Columbia Business.
          </p>
        </CollapseSegment>
        <CollapseSegment title="Stock analysis">
          <p>
            The traditional human approach to stock analysis starts with an understanding of
            the story behind a stock. It is the preferred human method of analysis: to
            absorb and understand a story, because our brains are well-designed to respond to and
            understand stories. (Our ancestors probably communicated vital
            information for survival, when gathered around a bonfire using stories as their
            medium).<br/><br/>

            It is a different story, though, when it comes to hard facts. Scientific studies show that
            when the human brain has to respond to a limited number of variables, e.g. four
            simultanous variables in a product comparisons of cars, it responds reasonably well (60% correct),
            However already at 12 variables analysis has broken down and correct responses plummet to around
            20% due to information overload<sup>1</sup>. Formula Stocks' analysis method compares many hundreds
            of variables simultaneously a hundred times as many as the human brain is capable of.<br/><br/>

            Such analysis would be prohibitively expensive to perform manually. As a practical
            example, our business analytics software can analyze 5,000 businesses based on
            balance sheets, income and cash flow statements, and many other forms of
            fundamental business and economic data in less than a minute and at a level of
            detail that would probably take 100 men several months to do manually.<br/><br/>

            Being capable of such analysis is one thing. Acting upon the information is quite another.
            The human cognitive system is heavily reliant on bias. Short cuts are used to
            make quick decisions possible. Quick does not equal correct, and a cognitive
            tradeoff is made as we prefer arriving at a quick, if only
            occasionally correct conclusion over, arriving much more slowly at a correct
            conclusion. (This too is thought to have a basis in evolution. After all, if
            chased by a predator, slowly calculating the optimal escape route has generally
            not yielded as good a chance of evolutionary success as simply running as fast
            as possible in the approximate direction).<br/><br/>

            An analytical system designed to perform at greater depth and detail, to
            understand concepts more thoroughly, and to make unbiased decisions based on hard
            data has very good odds of outperforming the evolutionary baggage we all
            carry with us.<br/><br/>

            Formula Stocks embodies such analysis, as evidenced by our tested ratio of winners
            to losers in the neighborhood of 90%.
          </p>
          <p className="disclaimer">
            <sup>1</sup>A. Dijksterhuis, M. Bos, L. Nordgren, and R Van Baaren, "On making the right
            choice: The deliberation without attention effect", Science 311 (2007): 1005-1007
          </p>
        </CollapseSegment>
        <CollapseSegment title="Machine learning">
          <p>
            We use machine learning to obtain a level of experience that it is quite
            impossible to obtain through regular career experience.<br/><br/>

            We humans usually learn through experience and mistakes.
            However, there is a limit to the amount of experience and mistakes we can make during a
            normal career which can potentially teach us durable lessons of general value.
            Our machine learning software is capable of experiencing millions and millions
            of events and decision outcomes in the same time as human beings
            can experience less than a hundred. This greatly accelerates experience,
            rationalization, learning, and knowledge.
          </p>
        </CollapseSegment>
        <CollapseSegment title="Scientific method">
          <p>
            We develop investment strategies based on the "scientific method"<sup>*</sup>. A thesis is formed based on
            observation and logic, and a priori investment recommendations are selected in a
            randomized double-blind controlled trial based on the thesis. A posteriori results
            determine the validity of the thesis, which is tested and compared to a baseline.<br/><br/>

            By accepting or rejecting thousands of theses, using quantitative
            hard data, we have advanced the basic knowledge in our field over the last 14
            years. The speed of the process has been greatly accelerated by machine learning.<br/><br/>

            All our scientific studies are performed in an environment specifically built
            to be non-biased in every possible respect.
          </p>
          <p className="disclaimer"><sup>*</sup>3 Jevons, William Stanley (1874), The Principles of Science: A Treatise on Logic and Scientific Method, Dover Publications, ISBN 1-4304-8775-5. 1877, 1879. Reprinted with a foreword by Ernst Nagel, New York, NY, 1958</p>
        </CollapseSegment>
        <CollapseSegment title="Statistics">
          <p>
            Formula Stocks is strongly focused on high-probability events.
            Each method used has a strong devised mathematical probability of winning
            versus losing. The mathematical expectancy of every recommendation issued
            is known.<br/><br/>

            When producing statistical information, we go to great lengths to ensure that it is solid and
            based on timeless observations which are true not just in a specific time period or
            market, but generally and in the long run. All statistical material is derived from
            at least 50 years of measurements.
          </p>
        </CollapseSegment>
        <CollapseSegment title="Active management">
          <p>
            Formula Stocks does more than select equities. We also provide an active management system,
            which actively buys, holds, and sells equities when deemed most beneficial.
            Active management adds value. In a portfolio of random stocks, active management
            typically adds around 2.-4% to the annual performance. In a well-selected portfolio of
            attractive stocks, it typically adds around 6% to the annual performance, - compared to
            passive management.
          </p>
        </CollapseSegment>
        <CollapseSegment title="93 IITs™ and Robustness">
          <p>
            Users can access the results of up to 93 different Intelligent Investment
            Technologies, or IITs™ for short. IITs™ are Formula Stocks methods for outperforming the market. An
            IIT™ is specialized in a particular field and capable of making superior decisions
            in this field due to deep expert knowledge. Due to this
            specialization, our IITs™ are extremely capable within their respective fields. The IITs™ can work in
            any number of ways and within as many different investment disciplines but they
            always have one basic attribute in common: The mathematical probabilities and
            statistical properties of any IIT™ make it capable of outperforming the
            market, even on its own.<br/><br/>

            Generally, IIT™ decisions are made when mathematical and statistical properties
            indicate an approximate +90% probability a priori of winning in the long run.
          </p>
          <p className="quote">
            <div className="content">
              <i className="material-icons">format_quote</i>
              <p>
                "The fact that we do not rely on a single or even just a dozen strategies, and
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
