import React from 'react'

import store from '../../store'

const Suggestions = React.createClass({
  getInitialState() {
    return {fetching: true}
  },
  componentDidMount() {
    store.plans.get(this.props.plan).on('change', this.updateState)
    store.plans.get(this.props.plan).getSuggestions()
  },
  updateState() {
    this.setState({fetching: false})
  },
  render() {
    console.log('rendering');
    let suggestions = store.plans.get(this.props.plan).get('suggestions').map((suggestion, i) => {
      console.log(suggestion);
      return (
        <li key={i}>
          <h3>{suggestion.name}</h3>
        </li>
      )
    })

    return (
      <div className="suggestions">
        <ul className="suggestions-list">
          {suggestions}
        </ul>
      </div>
    )
  }
})

export default Suggestions
