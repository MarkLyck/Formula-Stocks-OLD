import React from 'react'
import {Link} from 'react-router'

import Suggestion from './Suggestion'
import SuggestionHeader from './SuggestionHeader'

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
  componentWillUnmount() {
    store.plans.get('basic').off('change', this.updateState)
    store.plans.get('premium').off('change', this.updateState)
    store.plans.get('business').off('change', this.updateState)
    store.plans.get('fund').off('change', this.updateState)
  },
  render() {

    let suggestionsList;
    if(store.session.isAllowedToView(this.props.plan)) {
      let suggestions = store.plans.get(this.props.plan).get('suggestions').map((suggestion, i) => {
        return (
          <Suggestion key={i} suggestion={suggestion}/>
        )
      })
      suggestionsList = (
        <ul className="suggestions-list">
          {suggestions}
        </ul>
      )
    } else {
      suggestionsList = (
        <section className="no-permissions">
          <h3>Upgrade to the <span className="capitalize blue-color ">{this.props.plan} formula</span> to see these suggestions</h3>
          <Link to="/dashboard/account" className="filled-btn">Upgrade your plan</Link>
        </section>
      )
    }

    return (
      <div className="suggestions">
        <SuggestionHeader plan={this.props.plan}/>
        {suggestionsList}
      </div>
    )
  }
})

export default Suggestions
