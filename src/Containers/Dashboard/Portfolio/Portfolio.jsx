import React from 'react'
import _ from 'underscore'
import moment from 'moment'
import { Link } from 'react-router'
import store from '../../../store'

import PortfolioGraph from './PortfolioGraph';
import PortfolioItem from './Stock'
import PieChart from '../../Global/Components/PieChart/PieChart'
import Stats from './Stats'
import YearlyReturns from './YearlyReturns'
import './portfolio.css'

function adjustBrightness(col, amt) {
    var usePound = true
    if (col[0] === "#") {
        col = col.slice(1)
        usePound = true
    }
    var R = parseInt(col.substring(0,2),16)
    var G = parseInt(col.substring(2,4),16)
    var B = parseInt(col.substring(4,6),16)
    R += amt
    G += amt
    B += amt
    if (R > 255) R = 255
    else if (R < 0) R = 0
    if (G > 255) G = 255
    else if (G < 0) G = 0
    if (B > 255) B = 255
    else if (B < 0) B = 0
    var RR = ((R.toString(16).length===1)?"0"+R.toString(16):R.toString(16))
    var GG = ((G.toString(16).length===1)?"0"+G.toString(16):G.toString(16))
    var BB = ((B.toString(16).length===1)?"0"+B.toString(16):B.toString(16))
    return (usePound?"#":"") + RR + GG + BB;
}

class Portfolio extends React.Component {
  constructor(props) {
    super(props)
    this.updateState = this.updateState.bind(this)
    this.expandStock = this.expandStock.bind(this)
    this.renderHoldings = this.renderHoldings.bind(this)
    this.getAllocation = this.getAllocation.bind(this)

    this.state = { plan: store.selectedPlan, fetching: true, selectedStock: '', allocation: [], colors: [] }
  }

  componentDidMount() {
    if ((store.session.isAllowedToView(this.props.plan) && !store.plans.get(this.props.plan).get('portfolio').length)
        || (store.session.isAllowedToView(this.props.plan) && !store.plans.get(this.props.plan).get('portfolioYields').length)) {
      store.plans.get(this.props.plan).fetchPrivate(this.props.plan)
    } else if (!store.session.isAllowedToView(this.props.plan) && !store.plans.get(this.props.plan).get('portfolioYields').length) { store.plans.get(this.props.plan).fetch() }
    store.plans.get(this.props.plan).on('change', this.updateState)
    store.market.data.on('update', this.updateState)
    if (!store.market.data.get('portfolioData')[0]) {
      store.market.data.getPortfolioData()
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.plan !== this.state.plan) {
      this.getAllocation(newProps)
      if ((store.session.isAllowedToView(newProps.plan) && !store.plans.get(newProps.plan).get('portfolio').length)
          || (store.session.isAllowedToView(newProps.plan) && !store.plans.get(newProps.plan).get('portfolioYields').length)) { store.plans.get(newProps.plan).fetchPrivate(newProps.plan) }
      else if (!store.session.isAllowedToView(newProps.plan) && !store.plans.get(newProps.plan).get('portfolioYields').length) { store.plans.get(newProps.plan).fetch() }
      store.plans.get(newProps.plan).on('change', this.updateState)
      this.setState({ plan: newProps.plan })
    }
  }

  componentWillUnmount() {
    store.market.data.off('update', this.updateState)
    store.plans.get('basic').off('change', this.updateState)
    store.plans.get('premium').off('change', this.updateState)
    store.plans.get('business').off('change', this.updateState)
    store.plans.get('fund').off('change', this.updateState)
  }

  updateState() {
    if (this.state.plan === store.selectedPlan) {
      this.setState({ fetching: false })
      this.getAllocation()
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
    if (!store.session.isAllowedToView(this.state.plan)) {
      return (
        <section className="no-permissions">
          <h3>Upgrade to the <span className="capitalize blue-color ">{this.state.plan} formula</span> to see this portfolio</h3>
          <Link to="/dashboard/account" className="filled-btn upgrade-your-plan">Upgrade your plan</Link>
        </section>
      )
    } else {
      let portfolio = store.plans.get(this.state.plan).get('portfolio').map((stock, i) => {
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
        return (<PortfolioItem stock={stock} plan={this.state.plan} key={stock.ticker + i} expandStock={this.expandStock} number={i}/>)
      } else {
        return (<PortfolioItem stock={stock} plan={this.state.plan} graph={true} key={stock.ticker + i} expandStock={this.expandStock} number={i}/>)
      }
    })

    let amountOfStocks = store.plans.get(this.state.plan).get('portfolio').length ? store.plans.get(this.props.plan).get('portfolio').length - 1 : ''

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

  getAllocation(newPlan) {
    if (newPlan || !this.state.allocation.length) {
      let colors = []
      let allocation = store.plans.get(newPlan ? newPlan.plan : this.state.plan).get('portfolio').map(stock => {
        if (stock.latest_price > stock.purchase_price) {
          let amount = Math.round(Math.random() * 80 - 40)
          colors.push(adjustBrightness('#27A5F9', amount))
        } else if (stock.ticker === 'CASH') {
          colors.push('#12D99E')
        } else {
          colors.push('#49494A')
        }
        return {
          title: stock.ticker,
          value: stock.percentage_weight
        }
      })
      this.setState({ allocation: allocation, colors: colors })
    }
  }

  render() {
    // calculate up to date numbers
    let portfolioYields = store.plans.get(this.state.plan).get('portfolioYields')
    if (portfolioYields.length) {
      if (portfolioYields[portfolioYields.length - 1].date.day !== moment().format('DD')) {
        let portfolio = store.plans.get(this.state.plan).get('portfolio')
        let stocks = JSON.parse(localStorage.stocks).data
        let newBalance = 0

        portfolio.forEach(stock => {
          if (stock.ticker !== 'CASH') {
            let lastPrice = stock.latest_price
            if (stocks[stock.ticker]) {
              if (stocks[stock.ticker].lastPrice) {
                lastPrice = stocks[stock.ticker].lastPrice
              }
            }
            newBalance += lastPrice * stock.number_held
          }
        })
        newBalance += portfolioYields[portfolioYields.length - 1].cash
        let newYields = portfolioYields.concat({
          balance: Number(newBalance.toFixed(0)),
          cash: portfolioYields[portfolioYields.length - 1].cash,
          date: {
            day: moment().format('DD'),
            month: moment().format('MM'),
            year: moment().format('YYYY')
          }
        })
        store.plans.get(this.state.plan).set('portfolioYields', newYields)
      }
    }

    let marketStartValue
    if (store.market.data.get('portfolioData')[0]) { marketStartValue = store.market.data.get('portfolioData')[0] }
    let portfolioYieldsLength = portfolioYields.length

    let lastMarketValue = 0
    if (store.market.data.get('portfolioData')[0]) {
      lastMarketValue = store.market.data.get('portfolioData')[portfolioYieldsLength - 1]
    }

    let FSPercent = <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw Spinner"></i>

    if (portfolioYields.length) {
      const startSum = portfolioYields[0].balance
      const lastSum = portfolioYields[portfolioYields.length - 1].balance
      const increase = (lastSum - startSum) / startSum * 100
      FSPercent = increase.toFixed(2)
    }

    let SP500Percent = <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw Spinner"></i>
    if (lastMarketValue && marketStartValue) { SP500Percent = ((lastMarketValue / marketStartValue * 100 - 100).toFixed(2)) }

    return (
      <div className="portfolio">

        <section className="portfolio-yields">

          <div className="left">
            <h2>Portfolio yields</h2>
            <PortfolioGraph plan={this.state.plan}/>
          </div>

          <div className="right">

            <div className="fs stats">
              <h3 className="fs-plan blue-color"><span className="capitalize">{this.state.plan}</span> formula</h3>
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

            { this.state.allocation.length && store.session.isAllowedToView(this.state.plan) ? <PieChart title="allocation" data={this.state.allocation} colors={this.state.colors} unit="%"/> : <div className="browserChart"/>}

          </div>
        </section>
        { store.session.isAllowedToView(this.state.plan) ? <YearlyReturns plan={this.state.plan} /> : ''}
        {this.renderHoldings()}
        { store.session.isAllowedToView(this.state.plan) ? <Stats plan={this.state.plan}/> : '' }
      </div>
    )
  }
}

export default Portfolio
