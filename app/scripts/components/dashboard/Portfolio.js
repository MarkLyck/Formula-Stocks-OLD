import React from 'react'
import _ from 'underscore'
import {Link} from 'react-router'

import store from '../../store'
import cc from '../../cc'

import unnamedChartComponent from '../../libraries/amcharts3-react';
import PortfolioGraph from './PortfolioGraph';
import PortfolioItem from './PortfolioItem'

const Portfolio = React.createClass({
  getInitialState() {
    return {fetching: true, selectedStock: ''}
  },
  componentDidMount() {
    store.plans.get(this.props.plan).on('change', this.updateState)
    store.market.data.on('change', this.updateState)
    store.market.data.getPortfolioData()
  },
  updateState() {
    this.setState({fetching: false})
  },
  componentWillReceiveProps(newPlan) {
    store.plans.get(newPlan.plan).on('change', this.updateState)
  },
  componentWillUnmount() {
    store.market.data.off('change', this.updateState)
    store.plans.get('basic').off('change', this.updateState)
    store.plans.get('premium').off('change', this.updateState)
    store.plans.get('business').off('change', this.updateState)
    store.plans.get('fund').off('change', this.updateState)
  },
  expandStock(stock,e) {
    if(_.toArray(e.target.classList)[0]) {
      if (this.state.selectedStock !== stock.ticker) {
        this.setState({selectedStock: stock.ticker})
      } else {
        this.setState({selectedStock: ''})
      }
    } else {
      console.log('clicked: ', e.target.classList);
    }
  },
  render() {

    let holdings;
    if(store.session.isAllowedToView(this.props.plan)) {
      let portfolio;
      portfolio = store.plans.get(this.props.plan).get('portfolio').map((stock, i) => {
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
        return (<PortfolioItem stock={stock} plan={this.props.plan} key={stock.ticker} expandStock={this.expandStock} number={i}/>)
      } else {
        return (<PortfolioItem stock={stock} plan={this.props.plan} graph={true} key={stock.ticker} expandStock={this.expandStock} number={i}/>)
      }
    })

    holdings = (
      <section className="holdings">
        <div className="top">
          <h2>Holdings</h2>
          <h2 className="blue-color">{store.plans.get(this.props.plan).get('portfolio').length - 1} Stocks</h2>
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
      </section>
    )
  } else {
    holdings = (
      <section className="no-permissions">
        <h3>Upgrade to the <span className="capitalize blue-color ">{this.props.plan} formula</span> to see this portfolio</h3>
        <Link to="/dashboard/account" className="filled-btn">Upgrade your plan</Link>
      </section>
    )
  }

    let startValue;
    let marketStartValue;
    if (store.plans.get(this.props.plan).get('portfolioYields')[0]) {
      startValue = store.plans.get(this.props.plan).get('portfolioYields')[0].balance
    }
    if (store.market.data.get('portfolioData')[0]) {
      marketStartValue = store.market.data.get('portfolioData')[0]
    }

    let portfolioYieldsLength = store.plans.get(this.props.plan).get('portfolioYields').length
    let lastValue = 0;
    let lastMarketValue = 0;
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
            <h2>Portfolio Yields</h2>
            <PortfolioGraph plan={this.props.plan}/>
          </div>

          <div className="right">

            <div className="fs stats">
              <h3 className="fs-plan blue-color">{this.props.plan} Formula</h3>
              <div className="wrapper">
                <i className="fa fa-caret-up" aria-hidden="true"></i>
                <p><span className="blue-color">{FSPercent}%</span> since 2009</p>
              </div>
            </div>

            <div className="stats">
              <h3>S&P 500</h3>
              <div className="wrapper">
                <i className="fa fa-caret-up" aria-hidden="true"></i>
                <p><span className="green-color">{SP500Percent}%</span> since 2009</p>
              </div>
            </div>

          </div>
        </section>
        {holdings}

      </div>
    )
  }
})

export default Portfolio
