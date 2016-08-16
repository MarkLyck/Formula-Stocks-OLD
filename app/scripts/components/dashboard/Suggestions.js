import React from 'react'

import Suggestion from './Suggestion'

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
  componentWillReceiveProps(newPlan) {
    store.plans.get(newPlan.plan).on('change', this.updateState)
    store.plans.get(newPlan.plan).getSuggestions()
  },
  render() {
    console.log('rendering');
    let suggestions = store.plans.get(this.props.plan).get('suggestions').map((suggestion, i) => {
      return (
        <Suggestion key={i} suggestion={suggestion}/>
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
