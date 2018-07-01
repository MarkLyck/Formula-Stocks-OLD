import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import Lockr from 'lockr'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPlanIfNeeded } from '../../../actions/plans'
import { fetchSP500 } from '../../../actions/market'
import {
  fetchHistoricStockDataIfNeeded,
  fetchLastPriceIfNeeded,
  receiveRealTimeQuote,
  receiveAllRealTimeQuotes } from '../../../actions/stocks'
import { isAllowedToView } from '../helpers'
import { Link } from 'react-router'
import { adjustBrightness } from '../helpers'

// import io from 'socket.io-client/dist/socket.io.min'
// let socket
// let socketURL = 'wss://formulastocks-server.ga:8080'

import Loader from '../../../components/Loader/Loader'
import PortfolioGraph from './PortfolioGraph';
import PortfolioItem from './Stock'
import PieChart from '../../../components/Graphs/PieChart/PieChart'
import Info from '../../../components/Info/Info'
import Stats from './Stats'
import YearlyReturns from './YearlyReturns'
import './portfolio.css'

class Portfolio extends React.Component {
  constructor(props) {
    super(props)
    this.expandStock = this.expandStock.bind(this)
    this.renderHoldings = this.renderHoldings.bind(this)

    this.state = { selectedStock: '', receivedAllQuotes: false }
  }

  componentDidMount() {
    const { selectedPlan, actions } = this.props
    actions.fetchPlanIfNeeded(selectedPlan)
    actions.fetchSP500('2009-01-01')

    // socket = io.connect(socketURL)
    // socket.on(`latest_${selectedPlan}_quotes`, data => {
    //   if (!this.state.receivedAllQuotes) {
    //     actions.receiveAllRealTimeQuotes(data)
    //     this.setState({ receivedAllQuotes: true })
    //   }
    // })
    // socket.emit('getAllQuotes', true)
    // socket.on(`realtime_${selectedPlan}_quotes`, data => {
    //   console.log(data)
    //   actions.receiveRealTimeQuote(data)
    // })
  }

  // componentWillUnmount() { socket.disconnect() }

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
    const { plans, stocks, selectedPlan, actions } = this.props
    const portfolio = plans.data[selectedPlan].portfolio || []
    if (!isAllowedToView(selectedPlan)) {
      return (
        <section className="no-permissions">
          <h3>Upgrade to <span className="capitalize blue-color ">{selectedPlan}</span> to see this portfolio</h3>
          <Link to="/dashboard/account" className="filled-btn upgrade-your-plan">Upgrade your plan</Link>
        </section>
      )
    } else {
      let portfolioItems = portfolio.map((portfolioItem, i) => {
        if (portfolioItem.name === 'CASH') {
          return (
            <tbody key={i} className="cash">
              <tr>
                <td className="stock-name"><i className="fa fa-usd" aria-hidden="true"></i>{portfolioItem.name}</td>
                <td>{portfolioItem.percentage_weight.toFixed(2)}%</td>
              </tr>
            </tbody>
          )
        }

        return <PortfolioItem
          portfolioItem={portfolioItem}
          stock={stocks[portfolioItem.ticker]}
          fetchLastPriceIfNeeded={actions.fetchLastPriceIfNeeded}
          fetchHistoricStockDataIfNeeded={actions.fetchHistoricStockDataIfNeeded}
          selectedPlan={selectedPlan}
          graph={this.state.selectedStock === portfolioItem.ticker ? true : false }
          key={portfolioItem.ticker + i}
          expandStock={this.expandStock}
          number={i}/>
    })



    let amountOfStocks = portfolio.length ? plans.data[selectedPlan].portfolio.length - 1 : ''

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
              <th>Return<Info title="Return" explanation="Percent increase from Cost basis to Last price." left/></th>
              <th>Cost basis<Info title="Cost basis"
                              explanation="Averaged purchase price adjusted for dividends earned."
                              left/></th>
              <th>Last price<Info title="Last price"
                              explanation="Latest price available for stocks. Updated realtime or End of Day."
                              left/></th>
              <th>Days owned</th>
            </tr>
          </thead>
          {portfolioItems}
        </table>
      </section>)
    }
  }

  calculateAllocationData() {
    const { plans, selectedPlan } = this.props
    let colors = []
    const portfolio = plans.data[selectedPlan].portfolio || []
    let allocation = portfolio.map(stock => {
      if (stock.latest_price > (stock.purchase_price - stock.dividends)) {
        let amount = Math.round(Math.random() * 80 - 40)
        colors.push(adjustBrightness('#27A5F9', amount))
      } else if (stock.ticker === 'CASH') {
        colors.push('#12D99E')
      } else {
        colors.push('#49494A')
      }
      return { title: stock.ticker, value: stock.percentage_weight }
    })
    return { colors: colors, allocation: allocation }
  }

  render() {
    const { plans, selectedPlan, market } = this.props
    if (!plans.data[selectedPlan]) {
      return ( <div><Loader/></div> )
    }

    // calculate up to date numbers
    let portfolioYields = plans.data[selectedPlan].portfolioYields
    if (portfolioYields.length) {
      if (portfolioYields[portfolioYields.length - 1].date.day !== moment().format('DD')
        || portfolioYields[portfolioYields.length - 1].date.month !== moment().format('M')) {

        let portfolio = plans.data[selectedPlan].portfolio || []
        let stocks = Lockr.get('stocks')
        let newBalance = 0

        portfolio.forEach(stock => {
          if (stock.ticker !== 'CASH') {
            let newestPrice = stock.latest_price
            if (stocks[stock.ticker]) {
              if (stocks[stock.ticker].newPrice) {
                newestPrice = stocks[stock.ticker].newPrice
              }
            }
            newBalance += newestPrice * stock.number_held
          }
        })
        newBalance += portfolioYields[portfolioYields.length - 1].cash

        portfolioYields = portfolioYields.concat({
          balance: Number(newBalance.toFixed(0)),
          cash: portfolioYields[portfolioYields.length - 1].cash,
          date: {
            day: moment().format('DD'),
            month: moment().format('M'),
            year: moment().format('YYYY')
          }
        })
      }
    }

    let FSPercent = <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw Spinner"></i>
    if (portfolioYields.length) {
      const startSum = portfolioYields[0].balance
      const lastSum = portfolioYields[portfolioYields.length - 1].balance
      const increase = (lastSum - startSum) / startSum * 100
      FSPercent = increase.toFixed(2)
    }

    let marketStartValue, lastMarketValue
    if (market.SP500) {
      if (market.SP500.length) {
        marketStartValue = market.SP500[0]
        lastMarketValue = market.SP500[market.SP500.length - 1]
      }
    }
    let SP500Percent = <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw Spinner"></i>
    if (lastMarketValue && marketStartValue) { SP500Percent = ((lastMarketValue / marketStartValue * 100 - 100).toFixed(2)) }

    const allocationData = this.calculateAllocationData()

    return (
      <div className="portfolio">
        <section className="portfolio-yields">

          <div className="left">
            <h2>Portfolio yields</h2>
            <PortfolioGraph
                portfolioYields={portfolioYields ? portfolioYields : []}
                selectedPlan={selectedPlan}
                marketData={market.SP500 ? market.SP500 : []}/>
          </div>

          <div className="right">
            <div className="fs stats">
              <h3 className="fs-plan blue-color">
                <span className="capitalize">{selectedPlan}</span> formula
              </h3>
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

            { allocationData.allocation.length && isAllowedToView(selectedPlan)
              ? <PieChart title="allocation" data={allocationData.allocation} colors={allocationData.colors} unit="%"/>
              : <div className="browserChart"/>}

          </div>
        </section>

        { isAllowedToView(selectedPlan) ? <YearlyReturns portfolioYields={portfolioYields} /> : ''}
        {this.renderHoldings()}

        { isAllowedToView(selectedPlan)
          ? (<p className="disclaimer price-origin">Realtime prices are provided by
              <a href="https://intrinio.com" target="_blank"> Intrinio</a>
            </p>)
          : '' }

        { isAllowedToView(selectedPlan)
          ? <Stats stats={plans.data[selectedPlan].stats} portfolio={plans.data[selectedPlan].portfolio}/>
          : '' }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { plans, stocks, market } = state
  const { selectedPlan } = plans

  return { plans, selectedPlan, stocks, market }
}

function mapDispatchToProps(dispatch) {
  const actions = {
    fetchPlanIfNeeded,
    fetchHistoricStockDataIfNeeded,
    fetchLastPriceIfNeeded,
    fetchSP500,
    receiveRealTimeQuote,
    receiveAllRealTimeQuotes
  }
  return { actions: bindActionCreators(actions, dispatch) }
}


export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)
