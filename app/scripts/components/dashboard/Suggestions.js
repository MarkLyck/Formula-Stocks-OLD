import _ from 'underscore'
import React from 'react'
import moment from 'moment'
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
  },
  updateState() {
    this.setState({fetching: false})
  },
  componentWillReceiveProps(newPlan) {
    store.plans.get(newPlan.plan).on('change', this.updateState)
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
          <Suggestion key={this.props.plan+suggestion.ticker+i} suggestion={suggestion} i={i} planName={this.props.plan}/>
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
          <Link to="/dashboard/account" className="filled-btn upgrade-your-plan">Upgrade your plan</Link>
        </section>
      )
    }

    let lastUpdatedText;
    if (!this.state.fetching) {
      let lastUpdated = store.plans.get(this.props.plan).toJSON()
      if (lastUpdated._kmd) {
        lastUpdatedText = <h3 className="timeStamp">Last updated: {moment(lastUpdated._kmd.lmt).format("MMM Do YYYY")}</h3>
      }

    }


    return (
      <div className="suggestions">
        <SuggestionHeader plan={this.props.plan}/>
        {suggestionsList}
        {lastUpdatedText}
      </div>
    )
  }
})

export default Suggestions
