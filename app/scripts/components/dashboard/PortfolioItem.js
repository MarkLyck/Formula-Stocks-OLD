import React from 'react'

import PortfolioItemGraph from './PortfolioItemGraph'
import store from '../../store'
import cc from '../../cc'

const PortfolioItem = React.createClass({
  getInitialState() {
    return {data: [], lastPrice: this.props.stock.latest_price}
  },
  componentDidMount() {
    console.log(store.plans.get(this.props.plan).get('portfolio'));
    store.plans.get(this.props.plan).getStockInfo(this.props.stock.ticker, this.props.number, true)
    .then((r) => {
      // console.log(r);
      this.setState({data: r.data, lastPrice: r.data[0][4]})
    })
  },
  render() {
    let stock = this.props.stock
    if (!this.props.graph) {
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
            <td><p className="blue-color">{stock.percentage_weight.toFixed(2)}%</p></td>
            <td><p className={this.props.changeClass}>{((this.state.lastPrice - stock.purchase_price) * 100 / stock.purchase_price).toFixed(2)}%</p></td>
            <td><p className="blue-color">${stock.purchase_price.toFixed(2)}</p></td>
            <td><p>${this.state.lastPrice.toFixed(2)}</p></td>
            <td><p>{cc.commafy(stock.days_owned)}</p></td>
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
            <td><p className="blue-color">{stock.percentage_weight.toFixed(2)}%</p></td>
            <td><p className={this.props.changeClass}>{((this.state.lastPrice - stock.purchase_price) * 100 / stock.purchase_price).toFixed(2)}%</p></td>
            <td><p className="blue-color">${stock.purchase_price.toFixed(2)}</p></td>
            <td><p>${this.state.lastPrice.toFixed(2)}</p></td>
            <td><p>{cc.commafy(stock.days_owned)}</p></td>
          </tr>
          <tr>
            <td colSpan="6">
              <PortfolioItemGraph stock={this.props.stock} plan={this.props.plan} data={this.state.data}/>
            </td>
          </tr>
        </tbody>
      )
    }

  }
})

export default PortfolioItem
