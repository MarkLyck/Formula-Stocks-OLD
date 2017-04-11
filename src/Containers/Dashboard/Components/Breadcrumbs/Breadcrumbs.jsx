import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import store from '../../../../store'
import './breadcrumbs.css'

class Breadcrumbs extends React.Component {
  constructor(props) {
    super(props)
    this.updateState = this.updateState.bind(this)
    this.state = { fetched: false }
  }

  componentDidMount() {
    store.plans.on('change', this.updateState)
  }

  updateState() {
    this.setState({ fetched: true })
  }

  componentWillUnmount() {
    store.plans.off('change', this.updateState)
  }

  render() {
    const { plans, selectedPlan } = this.props

    let page
    if (this.props.location.indexOf('portfolio') > -1 || this.props.location === '/dashboard') {
      page = 'Portfolio'
    } else if (this.props.location.indexOf('suggestions') > -1) {
      page = 'Suggestions'
    } else if (this.props.location.indexOf('trades') > -1) {
      page = 'Portfolio trades'
    } else {
      return null
    }

    let lastUpdated, lastRebalanced
    let lastUpdatedTag
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

        lastUpdatedTag = <p>Prices updated - <span className="semi-bold">yesterday</span>, Last rebalanced - <span className="semi-bold">{lastRebalanced}</span></p>
      }
    }

    return (
      <div className="breadcrumbs">
        <p>{page} <i className="fa fa-chevron-right" aria-hidden="true"></i> <span className="blue-color capitalize">{selectedPlan}</span></p>
        {lastUpdatedTag}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { plans } = state
  const { selectedPlan } = plans

  return { plans, selectedPlan }
}

export default connect(mapStateToProps)(Breadcrumbs)
