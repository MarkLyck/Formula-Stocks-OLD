import React from 'react'
import $ from 'jquery'

import PortfolioItemGraph from './PortfolioItemGraph'
import store from '../../store'
import cc from '../../cc'

const PortfolioItem = React.createClass({
  getInitialState() {

    let promise = {}
    let data = []

    if (!store.plans.get(this.props.plan).get('portfolio')[this.props.number].data) {
      promise = store.plans.get(this.props.plan).getStockInfo(this.props.stock.ticker, this.props.number, true)
    } else {
      data = store.plans.get(this.props.plan).get('portfolio')[this.props.number].data
    }

    return {
      data: data,
      lastPrice: this.props.stock.latest_price,
      promise: promise,
      chartSpan: 6,
      }
  },
  componentDidMount() {
    $(window).on('resize', this.checkScreenSize)
    if (!store.plans.get(this.props.plan).get('portfolio')[this.props.number].data) {
      this.state.promise.promise
      .then(r => {
        this.setState({data: r.data, lastPrice: r.data[0][4]})
      })
      .catch(e => {
        console.error(e);
      })
    }
    this.checkScreenSize()
  },
  componentWillUnmount() {
    $(window).off('resize', this.checkScreenSize)
    if (typeof this.state.promise.cancel === 'function') {
      this.state.promise.cancel()
    }
  },
  checkScreenSize() {
    if ($(window).width() > 850 && $(window).width() < 950 ) {
      this.setState({chartSpan: 5})
    } else if ($(window).width() > 650 && $(window).width() < 850 ) {
      this.setState({chartSpan: 4})
    } else if ($(window).width() > 525 && $(window).width() < 650 ) {
      this.setState({chartSpan: 3})
    } else if ($(window).width() > 400 && $(window).width() < 525 ) {
      this.setState({chartSpan: 2})
    }
  },
  render() {
    let stock = this.props.stock


    let changeClass = 'positive'
    if ((this.state.lastPrice - stock.purchase_price).toFixed(2) < 0) {
      changeClass = 'negative'
    }

    if (!this.props.graph) {
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
            <td className="portfolio-td"><p className="blue-color">{stock.percentage_weight.toFixed(2)}%</p></td>
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
              <PortfolioItemGraph stock={this.props.stock} plan={this.props.plan} data={this.state.data}/>
            </td>
          </tr>
        </tbody>
      )
    }

  }
})

export default PortfolioItem
