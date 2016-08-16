import React from 'react'

import SuggestionChart from './SuggestionChart'

const Suggestion = React.createClass({
  render() {
    console.log(this.props.suggestion);
    return (
      <li>
        <div className="left">
          <h3>{this.props.suggestion.name}</h3>
          <SuggestionChart data={this.props.suggestion.data} suggestedPrice={this.props.suggestion.suggested_price}/>
        </div>
        <div className="right">
          <h3 className="action">{this.props.suggestion.action}</h3>
        </div>
      </li>
    )
  }
})

export default Suggestion
