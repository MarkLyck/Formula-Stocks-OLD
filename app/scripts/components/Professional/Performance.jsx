import React from 'react'
import Scroll from 'react-scroll'
import _ from 'underscore'
import store from '../../store'
import LineGraph from './components/LineGraph'

function formatPrice(value) {
  while(/(\d+)(\d{3})/.test(value.toString())) {
    value = value.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2')
  }
  let price = value + '%'
  if (Number(value.replace(',','')) > 0) { price = '+' + price }
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
      const premiumData = store.plans.get('premium').get('portfolioYields')
      const businessData = store.plans.get('business').get('portfolioYields')
      const fundData = store.plans.get('fund').get('portfolioYields')
      const marketData = store.market.data.get('djia')

      if (premiumData.length && businessData.length && fundData.length && marketData.length) {
        this.createChartData(premiumData, businessData, fundData, marketData)
      }
    }
  }

  createChartData(premiumData, businessData, fundData, marketData) {

    let startValue = premiumData[0].balance
    let marketStartValue = Number(marketData[0])

    let fixedData = premiumData.map((point, i) => {

      const premiumBalance = ((premiumData[i].balance - startValue) / startValue * 100).toFixed(2)
      const businessBalance = ((businessData[i].balance - startValue) / startValue * 100).toFixed(2)
      const fundBalance = ((fundData[i].balance - startValue) / startValue * 100).toFixed(2)
      const marketBalance = ((Number(marketData[i]) - marketStartValue) / marketStartValue * 100).toFixed(2)

      let month = point.date.month
      if (Number(point.date.month) <= 9) {
        month = '0' + point.date.month
      }

      return {
        premium: premiumBalance,
        business: businessBalance,
        fund: fundBalance,
        market: marketBalance,

        premiumBalloon: formatPrice(premiumBalance),
        businessBalloon: formatPrice(businessBalance),
        fundBalloon: formatPrice(fundBalance),
        marketBalloon: formatPrice(marketBalance),

        date: `${point.date.year}-${month}-${point.date.day}`
      }
    })
    this.setState({ chartData: fixedData })
  }

  renderChart() {
    if (!this.state.chartData.length) {
      return (<div id="result-chart" className={this.state.chartClass + ' loading'}>
                <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
              </div>)
    } else {

      const preMin = Number(_.min(this.state.chartData, (point) => Number(point.premium)).premium)
      const busMin = Number(_.min(this.state.chartData, (point) => Number(point.business)).business)
      const funMin = Number(_.min(this.state.chartData, (point) => Number(point.fund)).fund)
      const marMin = Number(_.min(this.state.chartData, (point) => Number(point.market)).market)

      let minimum = _.min([preMin, busMin, funMin, marMin])
      minimum = Math.floor(minimum / 50) * 50
      let maximum = _.max(this.state.chartData, (point) => Number(point.business)).business
      maximum = Math.ceil(maximum/100) * 100

      const graphs = [
            {
              id: "market",
              lineColor: "#989898",

              bullet: "square",
              bulletBorderAlpha: 1,
              bulletColor: "#989898",
              bulletSize: 5,
              hideBulletsCount: 10,
              lineThickness: 2,
              useLineColorForBulletBorder: true,
              valueField: "market",
              "balloonText": "<div class=\"chart-balloon\"><span class=\"plan-name market-name\">DJIA</span><span class=\"balloon-value\">[[marketBalloon]]</span></div>",
            },
            {
              id: "premium",
              lineColor: "#6FCEE1",

              bullet: "square",
              bulletBorderAlpha: 1,
              bulletColor: "#6FCEE1",
              bulletSize: 5,
              hideBulletsCount: 10,
              lineThickness: 2,
              useLineColorForBulletBorder: true,
              valueField: "premium",
              balloonText: "<div class=\"chart-balloon\"><span class=\"plan-name\">Premium</span><span class=\"balloon-value\">[[premiumBalloon]]</span></div>"
            },
            {
              id: "business",
              lineColor: "#27A5F9",

              bullet: "square",
              bulletBorderAlpha: 1,
              bulletColor: "#27A5F9",
              bulletSize: 5,
              hideBulletsCount: 10,
              lineThickness: 2,
              useLineColorForBulletBorder: true,
              valueField: "business",
              "balloonText": "<div class=\"chart-balloon\"><span class=\"plan-name\">Business</span><span class=\"balloon-value\">[[businessBalloon]]</span></div>",
            },
            {
              id: "fund",
              lineColor: "#49494A",

              bullet: "square",
              bulletBorderAlpha: 1,
              bulletColor: "#49494A",
              bulletSize: 5,
              hideBulletsCount: 10,
              lineThickness: 2,
              useLineColorForBulletBorder: true,
              valueField: "fund",
              "balloonText": "<div class=\"chart-balloon\"><span class=\"plan-name\">Fund</span><span class=\"balloon-value\">[[fundBalloon]]</span></div>",
            }
          ]
      return (
        <div id="result-chart" className={this.state.chartClass}>
          <div className="chart-indicators">
            <div className="chart-indicator business">Business</div>
            <div className="chart-indicator fund">Fund</div>
            <div className="chart-indicator premium">Premium</div>
            <div className="chart-indicator djia">DJIA</div>
          </div>
          <LineGraph graphs={graphs}
                     data={this.state.chartData}
                     unit="%"
                     unitPosition="right"
                     maximum={maximum}
                     minimum={minimum}/>
        </div>
      )
    }
  }

  render() {
    const Element = Scroll.Element
    return (
      <section className="prof-performance">
        <Element name="performance"/>
        <h2 className="title">Performance</h2>
        <div className="divider"/>
        <h3 className="subtitle">Unleveraged performance in %, of 3 strategies since 2009 launch, with DJIA as a baseline</h3>
        {this.renderChart()}
      </section>
    )
  }
}

export default Performance
