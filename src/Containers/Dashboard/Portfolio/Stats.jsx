import React from 'react'
import store from '../../../store'
import './stats.css'

class Stats extends React.Component {

  constructor(props) {
    super(props)
    this.updateState = this.updateState.bind(this)
    this.state = {
      portfolio: store.plans.get(this.props.plan).toJSON().portfolio,
      winrate: store.plans.get(this.props.plan).toJSON().stats.WLRatio
    }
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
      this.setState({
        portfolio: store.plans.get(this.props.plan).toJSON().portfolio,
        winrate: store.plans.get(this.props.plan).toJSON().stats.WLRatio
      })
    } else {
      store.plans.get(plan).on('change', this.updateState)
      this.setState({
        portfolio: store.plans.get(plan).toJSON().portfolio,
        winrate: store.plans.get(plan).toJSON().stats.WLRatio
      })
    }
  }

  render() {
    const positiveStocks = this.state.portfolio.filter(stock => stock.purchase_price <= stock.latest_price ? true : false).length
    const percentPositive = (positiveStocks / (this.state.portfolio.length - 1) * 100).toFixed(2)

    const avgSize = (this.state.portfolio.reduce((prev, stock) => {
      if (prev === 0) { prev = Number(stock.percentage_weight) }
      else if (stock.ticker !== 'CASH') { prev += Number(stock.percentage_weight) }
      return prev
    }, 0) / (this.state.portfolio.length - 1)).toFixed(2)

    let avgReturn = (this.state.portfolio.reduce((prev, stock) => {
      if (prev === 0) { prev = Number((stock.latest_price - stock.purchase_price) * 100 / stock.purchase_price) }
      else if (stock.ticker !== 'CASH') { prev += Number((stock.latest_price - stock.purchase_price) * 100 / stock.purchase_price) }
      return prev
    }, 0) / (this.state.portfolio.length - 1)).toFixed(2)

    return (
      <ul className="stats">
          <li className="statistic blue">
            <div className="symbol">
              <i className="fa fa-bar-chart white-color"></i>
            </div>
            <div className="value">
              <h3 className="white-color">{this.state.winrate.toFixed(2)}%</h3>
              <p className="white-color">Sold with profit</p>
            </div>
          </li>

          <li className="statistic white gray-border">
            <div className="symbol">
              <i className="fa fa-pie-chart blue-color"></i>
            </div>
            <div className="value">
              <h3 className="blue-color">{percentPositive}%</h3>
              <p className="blue-color">Curr. profitable stocks</p>
            </div>
          </li>

          <li className="statistic green">
            <div className="symbol">
              <i className="fa fa-th-large white-color"></i>
            </div>
            <div className="value">
              <h3 className="white-color">{avgSize}%</h3>
              <p className="white-color">Avg. size</p>
            </div>
          </li>

          <li className="statistic white gray-border">
            <div className="symbol">
              <i className="fa fa-line-chart green-color"></i>
            </div>
            <div className="value white">
              <h3 className="green-color">+{avgReturn}%</h3>
              <p className="green-color">Avg. return</p>
            </div>
          </li>
      </ul>
    )
  }
}

export default Stats
