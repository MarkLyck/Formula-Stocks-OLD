import React from 'react'
import store from '../../store'
import Scroll from 'react-scroll'
import $ from 'jquery'
import TheResultsGraph from './TheResultsGraph'

function formatPrice(value) {
  while(/(\d+)(\d{3})/.test(value.toString())) {
    value = value.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2')
  }
  let price = '$' + value
  return price
}

class Performance extends React.Component {
  constructor(props) {
    super(props)
    this.getData = this.getData.bind(this)
    this.createChartData = this.createChartData.bind(this)
    this.renderChart = this.renderChart.bind(this)

    this.state = { chartData: [] }
  }

  componentDidMount() {
    this.getData()
    store.plans.on('update', this.getData.bind(this, 'plans'))
    store.market.data.on('change', this.getData.bind(this, 'market'))
  }

  componentWillUnmount() {
    store.plans.off('update', this.getData)
    store.market.data.off('update', this.getData)
  }

  getData() {
    if (!this.state.chartData.length) {
      let basicData = store.plans.get('basic').get('annualData')
      let premiumData = store.plans.get('premium').get('annualData')
      let businessData = store.plans.get('business').get('annualData')
      // let fundData = store.plans.get('fund').get('annualData')
      let marketData = store.market.data.get('annualData')

      if (basicData.length && premiumData.length && businessData.length && marketData.length) {
        this.createChartData(basicData, premiumData, businessData, marketData)
      }
    }
  }

  createChartData(basicData, premiumData, businessData, marketData) {
    let fixedData = basicData.map((point, i) => {

      let basicBalance = 25000
      let premiumBalance = 25000
      let businessBalance = 25000
      let marketBalance = 25000

      if (basicData[i]) { basicBalance = basicData[i].balance }
      if (premiumData[i]) { premiumBalance = premiumData[i].balance }
      if (businessData[i]) { businessBalance = businessData[i].balance }
      if (marketData[i]) { marketBalance = marketData[i] }

      let month = point.date.month
      if (Number(point.date.month) <= 9) {
        month = '0' + point.date.month
      }

      return {
        basic: point.balance,
        premium: premiumBalance,
        business: businessBalance,
        market: marketBalance,

        basicBalloon: formatPrice(point.balance),
        premiumBalloon: formatPrice(premiumBalance),
        businessBalloon: formatPrice(businessBalance),
        marketBalloon: formatPrice(marketBalance),

        date: `${point.date.year}-${month}-${point.date.day}`
      }
    })
    this.setState({ chartData: fixedData})
  }

  renderChart() {
    if (!this.state.chartData.length) {
      return (<div id="result-chart" className={this.state.chartClass + ' loading'}>
                <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
              </div>)
    } else {
      return (
        <div id="result-chart" className={this.state.chartClass}>
          {TheResultsGraph(this.state.chartData)}
        </div>
      )
    }
  }

  render() {
    let Element = Scroll.Element;
    return (
      <section className="the-results">
        <Element name="performance"></Element>
        <div className="content" ref="content">
          <h2 className="title">Performance</h2>
          <div className="divider"></div>
          <h3 className="subtitle" onClick={this.toggleLogScale} ref="subtitle">Log graph</h3>
          {this.renderChart()}
          <h2 className="second title">Formula Stocks vs. S&P 500</h2>
          <p>
            Log scale graph of Formula Stocks products (white) versus S&P 500 (gray).
            The observed outperformance is the result of cumulatively 9,800 buy & sell recommendations.
            To date the winners of the future have been identified with an accuracy of {Math.floor(store.plans.get('basic').get('stats').WLRatio)}%, {Math.floor(store.plans.get('premium').get('stats').WLRatio)}%, and {Math.floor(store.plans.get('business').get('stats').WLRatio)}%,
            respectively*. Random stocks measured by the same yardstick win ~59% of the time.
            The difference is very significant.<br/><br/>

            Formula Stocks’ strategies have outperformed the S&P 500 between 71% and 88% of the time.
            Modern risk benchmarks indicate that Formula Stocks’ strategies exhibit
            less risk than the general market. Backtested data has been employed in the
            construction of this graph. Please see our ToS for additional details.
          </p>
        </div>
      </section>
    )

  }
}

export default Performance
