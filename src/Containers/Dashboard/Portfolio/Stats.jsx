import React from 'react'
import store from '../../../store'
import './stats.css'

class Stats extends React.Component {

  constructor(props) {
    super(props)
    this.updateState = this.updateState.bind(this)

    this.state = { portfolio: store.plans.get(this.props.plan).toJSON().portfolio }
  }

  componentDidMount() { store.plans.get(this.props.plan).on('change', this.updateState) }
  componentWillUnmount() {
    store.plans.get('basic').off('change', this.updateState)
    store.plans.get('premium').off('change', this.updateState)
    store.plans.get('business').off('change', this.updateState)
    store.plans.get('fund').off('change', this.updateState)
  }

  componentWillReceiveProps(newProps) {
    if (newProps.plan !== this.props.plan) {
      this.updateState(newProps.plan)
    }
  }

  updateState(plan) {
    if (typeof plan !== 'string') {
      this.setState({ portfolio: store.plans.get(this.props.plan).toJSON().portfolio })
    } else {
      store.plans.get(plan).on('change', this.updateState)
      this.setState({ portfolio: store.plans.get(plan).toJSON().portfolio })
    }

  }

  render() {
    const positiveStocks = this.state.portfolio.filter(stock => stock.purchase_price <= stock.latest_price ? true : false).length
    const percentPositive = (positiveStocks / (this.state.portfolio.length - 1) * 100).toFixed(2)

    const avgDaysHeld = (this.state.portfolio.reduce((prev, stock) => {
      if (prev === 0) { prev = Number(stock.days_owned) }
      else if (stock.ticker !== 'CASH') { prev += Number(stock.days_owned) }
      return prev
    }, 0) / (this.state.portfolio.length - 1)).toFixed(2)

    let sumOfReturns = this.state.portfolio.reduce((prev, stock) => {
      if (prev === 0) { prev = Number((stock.latest_price - stock.purchase_price) * 100 / stock.purchase_price) }
      else if (stock.ticker !== 'CASH') { prev += Number((stock.latest_price - stock.purchase_price) * 100 / stock.purchase_price) }
      return prev
    }, 0).toFixed(2)

    if (sumOfReturns >= 1000) {
      sumOfReturns = Math.round(sumOfReturns)
    }

    return (
      <ul className="stats">
          <li className="statistic blue">
            <div className="symbol">
              <i className="fa fa-bar-chart white-color"></i>
            </div>
            <div className="value">
              <h3 className="white-color">{percentPositive}%</h3>
              <p className="white-color">Curr. positive stocks</p>
            </div>
          </li>

          <li className="statistic white gray-border">
            <div className="symbol">
              <i className="fa fa-pie-chart blue-color"></i>
            </div>
            <div className="value">
              <h3 className="blue-color">{this.state.portfolio.length ? (100 / this.state.portfolio.length).toFixed(2) : ''}%</h3>
              <p className="blue-color">Avg. allocation</p>
            </div>
          </li>

          <li className="statistic green">
            <div className="symbol">
              <i className="fa fa-hourglass-half white-color"></i>
            </div>
            <div className="value">
              <h3 className="white-color">{avgDaysHeld}</h3>
              <p className="white-color">Avg. days held</p>
            </div>
          </li>

          <li className="statistic white gray-border">
            <div className="symbol">
              <i className="fa fa-line-chart green-color"></i>
            </div>
            <div className="value white">
              <h3 className="green-color">{sumOfReturns}%</h3>
              <p className="green-color">Sum of returns</p>
            </div>
          </li>
      </ul>
    )
  }
}

export default Stats
