import React from 'react'

import SuggestionChart from './SuggestionChart'

const Suggestion = React.createClass({
  render() {
    console.log(this.props.suggestion);
    let lastPrice;
    if (this.props.suggestion.data) {
      lastPrice = this.props.suggestion.data[0][3]
    }
    return (
      <li className="fade-in">
        <div className="top">
          <h3>{this.props.suggestion.name}</h3>
          <h3 className="action">{this.props.suggestion.action}</h3>
        </div>
        <SuggestionChart
          data={this.props.suggestion.data}
          suggestedPrice={this.props.suggestion.suggested_price}
          ticker={this.props.suggestion.ticker}/>
        <ul className="bottom">
          <li>
            <h4 className="value">{this.props.suggestion.ticker}</h4>
            <p>Ticker</p>
          </li>
          <li>
            <h4 className="value">{this.props.suggestion.percentage_weight.toFixed(2)}%</h4>
            <p>Allocation</p>
          </li>
          <li>
            <h4 className="value">${this.props.suggestion.suggested_price.toFixed(2)}</h4>
            <p>Buy price</p>
          </li>
          <li>
            <h4 className="value">${lastPrice}</h4>
            <p>Last Price</p>
          </li>
        </ul>
      </li>
    )
  }
})

export default Suggestion
