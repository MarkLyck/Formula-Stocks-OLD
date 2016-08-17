import React from 'react'

import SuggestionChart from './SuggestionChart'

const Suggestion = React.createClass({
  render() {
    let lastPrice;
    if (this.props.suggestion.data) {
      lastPrice = this.props.suggestion.data[0][3].toFixed(2)
    }
    let allocation;
    if (this.props.suggestion.percentage_weight) {
      allocation = this.props.suggestion.percentage_weight.toFixed(2)
    }
    let listClass = 'fade-in white'
    let actionClass = ''
    let textColor = ''
    if (this.props.suggestion.action === 'SELL') {
      listClass = 'fade-in blue'
      textColor = 'white-color'
      actionClass = 'sell'
    }

    return (
      <li className={listClass}>
        <div className="top">
          <h3 className={textColor}>{this.props.suggestion.name}</h3>
          <h3 className={`action ${actionClass}`}>{this.props.suggestion.action}</h3>
        </div>
        <SuggestionChart
          data={this.props.suggestion.data}
          suggestedPrice={this.props.suggestion.suggested_price}
          ticker={this.props.suggestion.ticker}
          action={this.props.suggestion.action}/>
        <ul className="bottom">
          <li className={actionClass}>
            <h4 className="value">{this.props.suggestion.ticker}</h4>
            <p>Ticker</p>
          </li>
          <li className={actionClass}>
            <h4 className="value">{allocation}%</h4>
            <p>Allocation</p>
          </li>
          <li className={actionClass}>
            <h4 className="value">${this.props.suggestion.suggested_price.toFixed(2)}</h4>
            <p>Buy price</p>
          </li>
          <li className={actionClass}>
            <h4 className="value">${lastPrice}</h4>
            <p>Last Price</p>
          </li>
        </ul>
      </li>
    )
  }
})

export default Suggestion
