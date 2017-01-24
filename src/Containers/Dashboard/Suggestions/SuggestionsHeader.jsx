import React from 'react'

import store from '../../../store'
import './suggestionsHeader.css'

class SuggestionsHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = { plan: this.props.plan }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.plan !== this.state.plan) { this.setState({ plan: newProps.plan }) }
  }

  render() {
    const stats = store.plans.get(this.state.plan).get('stats')
    const portfolio = store.plans.get(this.state.plan).get('portfolio')
    let cashAllocation
    if (portfolio[0]) { cashAllocation = portfolio[portfolio.length - 1].percentage_weight.toFixed(2) }

    let suggestions = store.plans.get(this.state.plan).get('suggestions').length ? store.plans.get(this.state.plan).get('suggestions').filter(sug => sug.model && sug.action === 'BUY' ? false : true).length : ''
    if (this.props.trades) {
      suggestions = store.plans.get(this.state.plan).get('suggestions').length ? store.plans.get(this.state.plan).get('suggestions').filter(sug => sug.model ? true : false).length : ''
    }

    return (
      <section className="suggestion-header">
        <ul>
          <li className="panel cagr blue">
            <div className="symbol">
              <i className="fa fa-line-chart white-color"></i>
            </div>
            <div className="value">
              <h3 className="white-color">{stats.CAGR.toFixed(2)}%</h3>
              <p className="white-color">Annual growth</p>
            </div>
          </li>

          <li className="panel profitable-stocks white gray-border">
            <div className="symbol">
              <i className="fa fa-pie-chart blue-color"></i>
            </div>
            <div className="value">
              <h3 className="blue-color">{stats.WLRatio.toFixed(2)}%</h3>
              <p className="blue-color">Sold with profit</p>
            </div>
          </li>

          <li className="panel green">
            <div className="symbol">
              <i className="fa fa-list white-color"></i>
            </div>
            <div className="value">
              <h3 className="white-color">{suggestions}</h3>
              <p className="white-color">{!this.props.trades ? 'Suggestions' : 'Trades'}</p>
            </div>
          </li>

          <li className="panel white gray-border">
            <div className="symbol">
              <i className="fa fa-usd green-color"></i>
            </div>
            <div className="value white">
              <h3 className="green-color">{cashAllocation ? cashAllocation + '%' : ''}</h3>
              <p className="green-color">Percent in cash</p>
            </div>
          </li>

        </ul>
      </section>
    )
  }
}

export default SuggestionsHeader
