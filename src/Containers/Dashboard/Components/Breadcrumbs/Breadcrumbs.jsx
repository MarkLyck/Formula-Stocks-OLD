import React from 'react'
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
    const planName = store.selectedPlan

    let page
    if (this.props.location.indexOf('portfolio') > -1 || this.props.location === '/dashboard' || this.props.location.indexOf('trades') > -1) {
      page = 'Portfolio'
    } else if (this.props.location.indexOf('suggestions') > -1) {
      page = 'Suggestions'
    } else {
      return null
    }

    let lastUpdated, lastRebalanced
    let lastUpdatedTag
    if (planName) {
      if (page === 'Suggestions' && store.plans.get(planName).get('suggestions')[0]) {
        let date = store.plans.get(planName).get('suggestions')[0].date
        let month = date.month
        let fixedDate = date.day
        if (Number(date.month) <= 9) { month = '0' + date.month}
        if (Number(date.day) <= 9) { fixedDate = '0' + date.day}
        lastUpdated = moment(date.year + month + fixedDate, 'YYYYMMDD').format('MMM D, YYYY')

        lastUpdatedTag = <p>Last updated - <span className="semi-bold">{lastUpdated}</span></p>
      } else if (page === 'Portfolio' && store.plans.get(planName).get('portfolio')[0]){
        let date = store.plans.get(planName).get('portfolio')[0].date
        lastRebalanced = moment(date.year + date.month + date.date, 'YYYYMMDD').format('MMMM D, YYYY')

        lastUpdatedTag = <p>Prices updated - <span className="semi-bold">yesterday</span>, Last rebalanced - <span className="semi-bold">{lastRebalanced}</span></p>
      }
    }


    return (
      <div className="breadcrumbs">
        <p>{page} <i className="fa fa-chevron-right" aria-hidden="true"></i> <span className="blue-color capitalize">{planName}</span></p>
        {lastUpdatedTag}
      </div>
    )
  }
}

export default Breadcrumbs
