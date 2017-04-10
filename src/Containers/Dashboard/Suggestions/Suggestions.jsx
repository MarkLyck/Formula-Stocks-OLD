import _ from 'underscore'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { isAllowedToView } from '../helpers'
import { fetchPlanIfNeeded, fetchHistoricStockData } from '../../../actions/plans'
import { sawSuggestions } from '../../../actions/session'
import moment from 'moment'
import {Link} from 'react-router'

import Suggestion from './Stock'
import SmallStock from './SmallStock'
import SuggestionHeader from './SuggestionsHeader'
import './suggestions.css'

class Suggestions extends React.Component {
  componentDidMount() {
    const { selectedPlan, actions } = this.props
    actions.fetchPlanIfNeeded(selectedPlan)
    actions.sawSuggestions()
    // FIXME
    // store.session.set('lastSeenSuggestions', new Date())
    // store.session.updateUser()
  }

  render() {
    const { plans, selectedPlan, actions } = this.props
    const plan = plans.data[selectedPlan]

    let SuggHeader = <SuggestionHeader
                        stats={plan ? plan.stats : {}}
                        portfolio={plan ? plan.portfolio : []}
                        suggestions={plan ? plan.suggestions : []}
                        isPortfolioTrades={this.props.location.indexOf('trades') === -1 ? false : true}/>

    let suggestionsList
    if (isAllowedToView(selectedPlan)) {
      if (!plan) { return ( <div className="suggestions"> {SuggHeader} </div> ) }
      else if (!plan.suggestions.length) { return ( <div className="suggestions"> {SuggHeader} </div> ) }
      let suggestions = []
      if (this.props.location.indexOf('trades') === -1) {
        suggestions = plan.suggestions.filter(sug => sug.model && sug.action === 'BUY' ? false : true)
      } else {
        suggestions = plan.suggestions.filter(sug => sug.model ? true : false).reverse()
      }

      suggestions = suggestions.map((suggestion, i) => {
        let numerator = i
        if (this.props.location.indexOf('trades') > -1) {
          numerator = _.findIndex(plan.suggestions, (sug) => sug.model && sug.ticker === suggestion.ticker)
        }
        if (selectedPlan !== 'fund') {
          return <Suggestion
                    key={plan.name+suggestion.ticker+i}
                    suggestion={suggestion} i={numerator}
                    trades={this.props.location.indexOf('trades') === -1 ? false : true}
                    planName={selectedPlan}
                    fetchHistoricStockData={actions.fetchHistoricStockData}/>
        } else {
          return <SmallStock
                    key={plan.name+suggestion.ticker+i}
                    suggestion={suggestion} i={numerator}
                    trades={this.props.location.indexOf('trades') === -1 ? false : true}
                    planName={selectedPlan}
                    fetchHistoricStockData={actions.fetchHistoricStockData}/>
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
          <h3>Upgrade to the <span className="capitalize blue-color ">{this.state.plan} formula</span> to see these suggestions</h3>
          <Link to="/dashboard/account" className="filled-btn upgrade-your-plan">Upgrade your plan</Link>
        </section>
      )
    }

    let lastUpdatedText
    if (plan.suggestions.length) {
      let date = plan.suggestions[0].date

      let month = date.month
      let fixedDate = date.day
      if (Number(date.month) <= 9) { month = '0' + date.month}
      if (Number(date.day) <= 9) { fixedDate = '0' + date.day}
      let lastUpdatedDate = moment(date.year + month + fixedDate, 'YYYYMMDD').format('MMM D, YYYY')
      let endWindowDate = moment(date.year + month + fixedDate, 'YYYYMMDD').add(30, 'days').format('MMM D, YYYY')
      lastUpdatedText = <h3 className="timeStamp">Trading window: {lastUpdatedDate} to {endWindowDate}</h3>
    }

    return (
      <div className="suggestions">
        {SuggHeader}
        {suggestionsList}
        {lastUpdatedText}
      </div>
    )
  }
}


function mapStateToProps(state) {
  const { plans, session } = state
  const { selectedPlan } = plans

  return { plans, selectedPlan, session }
}

function mapDispatchToProps(dispatch) {
  const actions = { fetchPlanIfNeeded, fetchHistoricStockData, sawSuggestions }
  return { actions: bindActionCreators(actions, dispatch) }
}


export default connect(mapStateToProps, mapDispatchToProps)(Suggestions)
