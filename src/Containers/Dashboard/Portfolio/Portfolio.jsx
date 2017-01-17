import React from 'react'
import _ from 'underscore'
import {Link} from 'react-router'
import store from '../../../store'

import PortfolioGraph from './PortfolioGraph';
import PortfolioItem from './Stock'
import './portfolio.css'

class Portfolio extends React.Component {
  constructor(props) {
    super(props)
    this.updateState = this.updateState.bind(this)
    this.expandStock = this.expandStock.bind(this)
    this.renderHoldings = this.renderHoldings.bind(this)

    this.state = { fetching: true, selectedStock: '' }
  }

  componentDidMount() {
    store.plans.get(this.props.plan).on('change', this.updateState)
    store.market.data.on('update', this.updateState)
    if (!store.market.data.get('portfolioData')[0]) {
      store.market.data.getPortfolioData()
    }
  }

  componentWillReceiveProps(newPlan) {
    store.plans.get(newPlan.plan).on('update', this.updateState)
  }

  componentWillUnmount() {
    store.market.data.off('update', this.updateState)
    store.plans.get('basic').off('change', this.updateState)
    store.plans.get('premium').off('change', this.updateState)
    store.plans.get('business').off('change', this.updateState)
    store.plans.get('fund').off('change', this.updateState)
  }

  updateState() {
    if (this.props.plan === store.selectedPlan) {
      this.setState({ fetching: false })
    }
  }

  expandStock(stock,e) {
    if(_.toArray(e.target.classList)[0]) {
      if (this.state.selectedStock !== stock.ticker) {
        this.setState({selectedStock: stock.ticker})
      } else {
        this.setState({selectedStock: ''})
      }
    }
  }

  renderHoldings() {
    if (!store.session.isAllowedToView(this.props.plan)) {
      return (
        <section className="no-permissions">
          <h3>Upgrade to the <span className="capitalize blue-color ">{this.props.plan} formula</span> to see this portfolio</h3>
          <Link to="/dashboard/account" className="filled-btn upgrade-your-plan">Upgrade your plan</Link>
        </section>
      )
    } else {
      let portfolio = store.plans.get(this.props.plan).get('portfolio').map((stock, i) => {
        if (stock.name === 'CASH') {
          return (
            <tbody key={i} className="cash">
              <tr>
                <td className="stock-name"><i className="fa fa-usd" aria-hidden="true"></i>{stock.name}</td>
                <td>{stock.percentage_weight.toFixed(2)}%</td>
              </tr>
            </tbody>
          )
        }

      if (this.state.selectedStock !== stock.ticker) {
        return (<PortfolioItem stock={stock} plan={this.props.plan} key={stock.ticker + i} expandStock={this.expandStock} number={i}/>)
      } else {
        return (<PortfolioItem stock={stock} plan={this.props.plan} graph={true} key={stock.ticker + i} expandStock={this.expandStock} number={i}/>)
      }
    })

    let amountOfStocks = store.plans.get(this.props.plan).get('portfolio').length ? store.plans.get(this.props.plan).get('portfolio').length - 1 : ''

    return (
      <section className="holdings">
        <div className="top">
          <h2>Holdings</h2>
          <h2 className="blue-color">{amountOfStocks} stocks</h2>
        </div>
        <table className="portfolio-table">
          <thead className="labels">
            <tr>
              <th>Name</th>
              <th>Allocation</th>
              <th>Change</th>
              <th>Bought at avg.</th>
              <th>Last price</th>
              <th>Days owned</th>
            </tr>
          </thead>
          {portfolio}
        </table>
      </section>)
    }
  }

  render() {
    let startValue
    let marketStartValue
    if (store.plans.get(this.props.plan).get('portfolioYields')[0]) {
      startValue = store.plans.get(this.props.plan).get('portfolioYields')[0].balance
    }
    if (store.market.data.get('portfolioData')[0]) {
      marketStartValue = store.market.data.get('portfolioData')[0]
    }

    let portfolioYieldsLength = store.plans.get(this.props.plan).get('portfolioYields').length
    let lastValue = 0
    let lastMarketValue = 0
    if (store.plans.get(this.props.plan).get('portfolioYields')[0]) {
      lastValue = store.plans.get(this.props.plan).get('portfolioYields')[portfolioYieldsLength - 1].balance
    }
    if (store.market.data.get('portfolioData')[0]) {
      lastMarketValue = store.market.data.get('portfolioData')[portfolioYieldsLength - 1]
    }

    let FSPercent = <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw Spinner"></i>
    if (lastValue && startValue) {FSPercent = ((lastValue - startValue) / startValue * 100).toFixed(2)}

    let SP500Percent = <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw Spinner"></i>
    if (lastMarketValue && marketStartValue) { SP500Percent = ((lastMarketValue / marketStartValue * 100 - 100).toFixed(2)) }

    return (
      <div className="portfolio">

        <section className="portfolio-yields">

          <div className="left">
            <h2>Portfolio yields</h2>
            <PortfolioGraph plan={this.props.plan}/>
          </div>

          <div className="right">

            <div className="fs stats">
              <h3 className="fs-plan blue-color"><span className="capitalize">{this.props.plan}</span> formula</h3>
              <div className="wrapper">
                <i className="fa fa-caret-up" aria-hidden="true"></i>
                <p><span className="blue-color number">{FSPercent}%</span> since 2009</p>
              </div>
            </div>

            <div className="stats">
              <h3>S&P 500</h3>
              <div className="wrapper market-change">
                <i className="fa fa-caret-up" aria-hidden="true"></i>
                <p><span className="number">{SP500Percent}%</span> since 2009</p>
              </div>
            </div>

          </div>
        </section>
        {this.renderHoldings()}
      </div>
    )
  }
}

export default Portfolio
