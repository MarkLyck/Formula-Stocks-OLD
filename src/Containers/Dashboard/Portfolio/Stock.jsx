import React from 'react'
import $ from 'jquery'
import moment from 'moment'

import StockGraph from './StockGraph'
import cc from '../../../cc'

let useAltClass = false

class Stock extends React.Component {
  constructor(props) {
    super(props)
    this.checkScreenSize = this.checkScreenSize.bind(this)
    this.renderGraph = this.renderGraph.bind(this)

    this.state = { chartSpan: 6 }
  }

  componentDidMount() {
    $(window).on('resize', this.checkScreenSize)
    this.props.fetchLastPriceIfNeeded(this.props.portfolioItem.ticker)
    this.checkScreenSize()
  }

  componentWillReceiveProps(newProps) {
    if (newProps.stock && this.props.stock) {
      if (newProps.stock.newPrice !== this.props.stock.newPrice) {
        useAltClass = !useAltClass
      }
    }
  }

  componentWillUnmount() { $(window).off('resize', this.checkScreenSize) }
  checkScreenSize() {
    if ($(window).width() > 850 && $(window).width() < 950 ) {
      this.setState({ chartSpan: 5 })
    } else if ($(window).width() > 650 && $(window).width() < 850 ) {
      this.setState({ chartSpan: 4 })
    } else if ($(window).width() > 525 && $(window).width() < 650 ) {
      this.setState({ chartSpan: 3 })
    } else if ($(window).width() > 400 && $(window).width() < 525 ) {
      this.setState({ chartSpan: 2 })
    }
  }

  renderGraph() {
    const { portfolioItem, stock } = this.props
    const daysToFetch = portfolioItem.days_owned > 120 ? portfolioItem.days_owned : 120
    let startLoading = false
    if (!stock) {
      this.props.fetchHistoricStockDataIfNeeded(portfolioItem.ticker, daysToFetch)
      startLoading = true
      return <StockGraph stock={portfolioItem} data={[]} isLoading={true} />
    }
    if (!stock.data && !stock.fetchFailed) {
      this.props.fetchHistoricStockDataIfNeeded(portfolioItem.ticker, daysToFetch)
      startLoading = true
    } else if (stock.failed) {
      return <StockGraph stock={portfolioItem} data={[]} isLoading={false} />
    }

    return <StockGraph stock={portfolioItem} data={stock.data} isLoading={startLoading} />
  }

  render() {
    const { portfolioItem, stock = {}, selectedPlan } = this.props

    let latestPrice = stock.newPrice ? stock.newPrice : portfolioItem.latest_price
    let priceUpdate = stock.newPrice !== stock.lastPrice ? true : false

    let costBasisPrice = portfolioItem.purchase_price - portfolioItem.dividends

    let changeClass = 'positive'
    if ((latestPrice - costBasisPrice).toFixed(2) < 0) { changeClass = 'negative' }

    var a = moment([Number(portfolioItem.date.year), Number(portfolioItem.date.month - 1), Number(portfolioItem.date.day)])
    var b = moment()
    const daysToAdd = b.diff(a, 'days')

    let percentChange = ((latestPrice - costBasisPrice) * 100 / costBasisPrice).toFixed(2)

    let allocationWeight = portfolioItem.percentage_weight.toFixed(2)
    if (selectedPlan === 'fund') { allocationWeight = portfolioItem.percentage_weight.toFixed(4) }
    else if (allocationWeight < 0.006) { allocationWeight = portfolioItem.percentage_weight.toFixed(3) }
    if (allocationWeight < 0.0001) { allocationWeight = 0.0001 }
    let allocation = <td className="portfolio-td"><p className="blue-color">{allocationWeight}%</p></td>

    let lastPriceClass = 'class-checker'

    if (priceUpdate) {
      if (stock.lastPrice < stock.newPrice) {
        lastPriceClass += !useAltClass ? ' realtime-positive' : ' realtime-positive-alt'
      } else {
        lastPriceClass += !useAltClass ? ' realtime-negative' : ' realtime-negative-alt'
      }
    }

    return (
      <tbody onClick={this.props.expandStock.bind(null, portfolioItem)}>
        <tr className="stock-table-row">
          <td className="stock-name">
            <i className="fa fa-flask" aria-hidden="true"></i>
            <div className="wrapper">
              <p className="stock-name-tag">{portfolioItem.name}</p>
              <p className="ticker">{portfolioItem.ticker}</p>
            </div>
          </td>
          {allocation}
          <td className="portfolio-td"><p className={changeClass}>{percentChange}%</p></td>
          <td className="portfolio-td"><p className="blue-color">${costBasisPrice.toFixed(2)}</p></td>
          <td className="portfolio-td"><p className={lastPriceClass}>${latestPrice.toFixed(2)}</p></td>
          <td className="portfolio-td"><p className="class-checker">{cc.commafy(portfolioItem.days_owned + daysToAdd)}</p></td>
        </tr>
        {this.props.graph
          ? (<tr><td colSpan={this.state.chartSpan}>
                {this.renderGraph()}
             </td></tr>)
          : null}
      </tbody>
    )
  }
}

export default Stock
