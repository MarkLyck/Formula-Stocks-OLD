import React from 'react'

import store from '../../store'

const SuggestionHeader = React.createClass({
  getInitialState() {
    return {
      stats: store.plans.get(this.props.plan).get('stats'),
      suggestionsLength: store.plans.get(this.props.plan).get('suggestions').length
    }
  },
  componentWillReceiveProps(newProps) {
    this.setState({
      stats: store.plans.get(newProps.plan).get('stats'),
      suggestionsLength: store.plans.get(newProps.plan).get('suggestions').length
    })
  },
  render() {
    let portfolio = store.plans.get(this.props.plan).get('portfolio')
    let cashAllocation;
    if (portfolio[0]) {
      cashAllocation = portfolio[portfolio.length - 1].percentage_weight.toFixed(2)
    }
    return (
      <section className="suggestion-header">
        <ul>
          <li className="panel cagr blue">
            <div className="symbol">
              <i className="fa fa-line-chart white-color"></i>
            </div>
            <div className="value">
              <h3 className="white-color">{this.state.stats.cagr.toFixed(2)}%</h3>
              <p className="white-color">CAGR</p>
            </div>
          </li>

          <li className="panel profitable-stocks white gray-border">
            <div className="symbol">
              <i className="fa fa-pie-chart blue-color"></i>
            </div>
            <div className="value">
              <h3 className="blue-color">{this.state.stats.WLRatio.toFixed(2)}%</h3>
              <p className="blue-color">Profitable Stocks</p>
            </div>
          </li>

          <li className="panel green">
            <div className="symbol">
              <i className="fa fa-list white-color"></i>
            </div>
            <div className="value">
              <h3 className="white-color">{this.state.suggestionsLength}</h3>
              <p className="white-color">Suggestions</p>
            </div>
          </li>



          <li className="panel white gray-border">
            <div className="symbol">
              <i className="fa fa-usd green-color"></i>
            </div>
            <div className="value white">
              <h3 className="green-color">{cashAllocation}%</h3>
              <p className="green-color">Percent in Cash</p>
            </div>
          </li>

        </ul>
      </section>
    )
  }
})

export default SuggestionHeader
