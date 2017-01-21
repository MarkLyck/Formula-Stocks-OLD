import React from 'react'
import $ from 'jquery'

import StockGraph from './StockGraph'
import store from '../../../store'
import cc from '../../../cc'

class Stock extends React.Component {
  constructor(props) {
    super(props)
    this.checkScreenSize = this.checkScreenSize.bind(this)

    let promise = store.plans.get(this.props.plan).getStockInfo(this.props.stock.ticker, this.props.number, true)
    let data = []

    if (store.plans.get(this.props.plan).get('portfolio')[this.props.number].data) {
      data = store.plans.get(this.props.plan).get('portfolio')[this.props.number].data
    }

    this.state = {
      data: data,
      lastPrice: this.props.stock.latest_price,
      promise: promise,
      chartSpan: 6,
      isLoading: true
      }
  }

  componentDidMount() {
    $(window).on('resize', this.checkScreenSize)
      this.state.promise.promise
      .then(r => {
        if (store.selectedPlan === this.props.plan) {
          let portfolio = store.plans.get(this.props.plan).get('portfolio')
          portfolio[this.props.number].latest_price = r.data[0][4]
          store.plans.get(this.props.plan).set('portoflio', portfolio)
          this.setState({ data: r.data, lastPrice: r.data[0][4], isLoading: false })
        }
      })
      .catch(e => {
        if (store.selectedPlan === this.props.plan) { this.setState({ isLoading: false }) }
      })
    this.checkScreenSize()
  }

  componentWillUnmount() {
    $(window).off('resize', this.checkScreenSize)
    if (typeof this.state.promise.cancel === 'function') {
      this.state.promise.cancel()
    }
  }

  checkScreenSize() {
    if (store.selectedPlan === this.props.plan) {
      if ($(window).width() > 850 && $(window).width() < 950 ) {
        this.setState({chartSpan: 5})
      } else if ($(window).width() > 650 && $(window).width() < 850 ) {
        this.setState({chartSpan: 4})
      } else if ($(window).width() > 525 && $(window).width() < 650 ) {
        this.setState({chartSpan: 3})
      } else if ($(window).width() > 400 && $(window).width() < 525 ) {
        this.setState({chartSpan: 2})
      }
    }
  }

  render() {
    let stock = this.props.stock

    let changeClass = 'positive'
    if ((this.state.lastPrice - stock.purchase_price).toFixed(2) < 0) {
      changeClass = 'negative'
    }

    if (!this.props.graph) {
      let allocationWeight = stock.percentage_weight.toFixed(2)
      if (this.props.plan === 'fund') { allocationWeight = stock.percentage_weight.toFixed(4) }
      else if (allocationWeight < 0.006) { allocationWeight = stock.percentage_weight.toFixed(3) }
      if (allocationWeight < 0.0001) { allocationWeight = 0.0001 }

      let allocation = <td className="portfolio-td"><p className="blue-color">{allocationWeight}%</p></td>

      // if (stock.ticker === 'DDE') {
      //   console.log('purchase: ', stock.purchase_price.toFixed(3))
      //   console.log('last: ', this.state.lastPrice)
      // }

      return (
        <tbody onClick={this.props.expandStock.bind(null, stock)}>
          <tr className="stock-table-row">
            <td className="stock-name">
              <i className="fa fa-flask" aria-hidden="true"></i>
              <div className="wrapper">
                <p className="stock-name-tag">{stock.name}</p>
                <p className="ticker">{stock.ticker}</p>
              </div>
            </td>
            {allocation}
            <td className="portfolio-td"><p className={changeClass}>{((this.state.lastPrice - stock.purchase_price) * 100 / stock.purchase_price).toFixed(2)}%</p></td>
            <td className="portfolio-td"><p className="blue-color">${stock.purchase_price.toFixed(2)}</p></td>
            <td className="portfolio-td"><p className="class-checker">${this.state.lastPrice.toFixed(2)}</p></td>
            <td className="portfolio-td"><p className="class-checker">{cc.commafy(stock.days_owned)}</p></td>
          </tr>
        </tbody>
      )
    } else {
      return (
        <tbody onClick={this.props.expandStock.bind(null, stock)}>
          <tr>
            <td className="stock-name">
              <i className="fa fa-flask" aria-hidden="true"></i>
              <div className="wrapper">
                <p className="stock-name-tag">{stock.name}</p>
                <p className="ticker">{stock.ticker}</p>
              </div>
            </td>
            <td className="portfolio-td"><p className="blue-color">{stock.percentage_weight.toFixed(2)}%</p></td>
            <td className="portfolio-td"><p className={changeClass}>{((this.state.lastPrice - stock.purchase_price) * 100 / stock.purchase_price).toFixed(2)}%</p></td>
            <td className="portfolio-td"><p className="blue-color">${stock.purchase_price.toFixed(2)}</p></td>
            <td className="portfolio-td"><p className="class-checker">${this.state.lastPrice.toFixed(2)}</p></td>
            <td className="portfolio-td"><p className="class-checker">{cc.commafy(stock.days_owned)}</p></td>
          </tr>
          <tr>
            <td colSpan={this.state.chartSpan}>
              <StockGraph stock={this.props.stock} plan={this.props.plan} data={this.state.data} isLoading={this.state.isLoading} />
            </td>
          </tr>
        </tbody>
      )
    }
  }
}

export default Stock
