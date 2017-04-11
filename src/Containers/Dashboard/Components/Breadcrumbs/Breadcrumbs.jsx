import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import './breadcrumbs.css'

const Breadcrumbs = ({ plans, selectedPlan, location }) => {
  let page
  if (location.indexOf('portfolio') > -1 || location === '/dashboard') {
    page = 'Portfolio'
  } else if (location.indexOf('suggestions') > -1) {
    page = 'Suggestions'
  } else if (location.indexOf('trades') > -1) {
    page = 'Portfolio trades'
  } else {
    return null
  }

  let lastUpdated, lastRebalanced, lastUpdatedTag
  if (plans.data[selectedPlan]) {
    if (page === 'Suggestions' && plans.data[selectedPlan].suggestions) {
      let date = plans.data[selectedPlan].suggestions[0].date
      let month = date.month
      let fixedDate = date.day
      if (Number(date.month) <= 9) { month = '0' + date.month}
      if (Number(date.day) <= 9) { fixedDate = '0' + date.day}
      lastUpdated = moment(date.year + month + fixedDate, 'YYYYMMDD').format('MMM D, YYYY')

      lastUpdatedTag = <p>Last updated - <span className="semi-bold">{lastUpdated}</span></p>
    } else if (page === 'Portfolio' && plans.data[selectedPlan].portfolio){
      let date = plans.data[selectedPlan].portfolio[0].date
      lastRebalanced = moment(date.year + date.month + date.date, 'YYYYMMDD').format('MMMM D, YYYY')

      lastUpdatedTag = <p>Last rebalanced - <span className="semi-bold">{lastRebalanced}</span></p>
    }
  }

  return (
    <div className="breadcrumbs">
      <p>{page} <i className="fa fa-chevron-right" aria-hidden="true"></i> <span className="blue-color capitalize">{selectedPlan}</span></p>
      {lastUpdatedTag}
    </div>
  )
}

function mapStateToProps(state) {
  const { plans } = state
  const { selectedPlan } = plans
  return { plans, selectedPlan }
}

export default connect(mapStateToProps)(Breadcrumbs)
