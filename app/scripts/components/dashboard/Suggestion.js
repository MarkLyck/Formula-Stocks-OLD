import React from 'react'

import SuggestionChart from './SuggestionChart'

const Suggestion = React.createClass({
  render() {
    console.log(this.props.suggestion);
    return (
      <li>
        <div className="top">
          <h3>{this.props.suggestion.name}</h3>
          <h3 className="action">{this.props.suggestion.action}</h3>
        </div>
        <SuggestionChart
          data={this.props.suggestion.data}
          suggestedPrice={this.props.suggestion.suggested_price}
          ticker={this.props.suggestion.ticker}/>
        <p>Percentage Weight: {this.props.suggestion.percentage_weight.toFixed(2)}%</p>
        <p>Suggested buy price: ${this.props.suggestion.suggested_price.toFixed(2)}</p>
      </li>
    )
  }
})

export default Suggestion
