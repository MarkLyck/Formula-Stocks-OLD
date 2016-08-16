import React from 'react'

import SuggestionChart from './SuggestionChart'

const Suggestion = React.createClass({
  render() {
    // console.log(this.props.suggestion);
    return (
      <li>
        <h3>{this.props.suggestion.name}</h3>
        <h3 className="action">{this.props.suggestion.action}</h3>
        <SuggestionChart data={this.props.suggestion.data} suggestedPrice={this.props.suggestion.suggested_price}/>
      </li>
    )
  }
})

export default Suggestion
