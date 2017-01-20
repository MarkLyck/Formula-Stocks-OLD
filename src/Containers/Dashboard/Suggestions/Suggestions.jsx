import _ from 'underscore'
import React from 'react'
import moment from 'moment'
import {Link} from 'react-router'

import Suggestion from './Stock'
import FundStock from './FundStock'
import SuggestionHeader from './SuggestionsHeader'
import './suggestions.css'
import store from '../../../store'

class Suggestions extends React.Component {
  constructor(props) {
    super(props)

    this.updateState = this.updateState.bind(this)

    this.state = { fetching: true }
  }

  componentDidMount() {
    store.plans.get(this.props.plan).on('change', this.updateState)
  }

  updateState() {
    if (store.selectedPlan === this.props.plan) {
      this.setState({ fetching: false })
    }
  }

  componentWillReceiveProps(newPlan) {
    store.plans.get(newPlan.plan).on('change', this.updateState)
  }

  componentWillUnmount() {
    store.plans.get('basic').off('change', this.updateState)
    store.plans.get('premium').off('change', this.updateState)
    store.plans.get('business').off('change', this.updateState)
    store.plans.get('fund').off('change', this.updateState)
  }

  render() {
    let suggestionsList
    if(store.session.isAllowedToView(this.props.plan)) {
      let suggestions = store.plans.get(this.props.plan).get('suggestions').map((suggestion, i) => {
        if (this.props.plan !== 'fund') {
          return <Suggestion key={this.props.plan+suggestion.ticker+i} suggestion={suggestion} i={i} planName={this.props.plan}/>
        } else {
          return <FundStock key={this.props.plan+suggestion.ticker+i} suggestion={suggestion} i={i} planName={this.props.plan}/>
        }
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
        let date = store.plans.get(this.props.plan).get('suggestions')[0].date
        let month = date.month
        let fixedDate = date.day
        if (Number(date.month) <= 9) { month = '0' + date.month}
        if (Number(date.day) <= 9) { fixedDate = '0' + date.day}
        let lastUpdatedDate = moment(date.year + month + fixedDate, 'YYYYMMDD').format('MMM D, YYYY')
        let endWindowDate = moment(date.year + month + '01', 'YYYYMMDD').add(30, 'days').format('MMM D, YYYY')
        lastUpdatedText = <h3 className="timeStamp">Trading window: {lastUpdatedDate} to {endWindowDate}</h3>
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
}

export default Suggestions
