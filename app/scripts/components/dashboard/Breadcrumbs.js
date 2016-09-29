import React from 'react'
import moment from 'moment'

import store from '../../store'

const Breadcrumbs = React.createClass({
  getInitialState() {
    return {fetched: false}
  },
  componentDidMount() {
    store.plans.on('update', this.updateState)
  },
  updateState() {
    this.setState({fetched: true})
  },
  render() {
    let plans = ['basic', 'premium', 'business', 'fund']
    let planName = ''

    plans.forEach((plan) => {
      if (this.props.location.indexOf(plan) > -1) {
        planName = plan
      }
    })

    let page;
    if (this.props.location.indexOf('portfolio') > -1) {
      page = 'Portfolio'
    } else if (this.props.location.indexOf('suggestions') > -1) {
      page = 'Suggestions'
    } else {
      return null
    }

    let lastUpdated;
    let lastUpdatedTag;
    if (page === 'Suggestions' && store.plans.get(planName).get('suggestions')[0]) {
      let date = store.plans.get(planName).get('suggestions')[0].date
      lastUpdated = moment(date.year + date.month + date.date, 'YYYYMMDD').format('MMM D, YYYY')
      let endWindow = moment(date.year + date.month + date.date, 'YYYYMMDD').add(30, 'days').format('MMM D, YYYY')
      lastUpdatedTag = <p>Trading Window: <span>{lastUpdated}</span> to <span>{endWindow}</span></p>
    } else if (page === 'Portfolio' && store.plans.get(planName).get('portfolio')[0]){
      let date = store.plans.get(planName).get('portfolio')[0].date
      lastUpdated = moment(date.year + date.month + date.date, 'YYYYMMDD').format('MMMM D, YYYY')
      lastUpdatedTag = <p>Last rebalanced: <span>{lastUpdated}</span></p>
    }

    return (
      <div className="breadcrumbs">
        <p>{page} <i className="fa fa-chevron-right" aria-hidden="true"></i> <span className="blue-color capitalize">{planName}</span></p>
        {lastUpdatedTag}
      </div>
    )
  }
})

export default Breadcrumbs
