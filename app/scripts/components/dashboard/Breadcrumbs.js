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

    let lastUpdated

    if (page === 'Suggestions' && store.plans.get(planName).get('suggestions')[0]) {
      let date = store.plans.get(planName).get('suggestions')[0].date

      lastUpdated = moment(date.year + date.month + date.date, 'YYYYMMDD').format('MMMM, Do')
      console.log('LU: ', lastUpdated);
    } else if (page === 'Portfolio' && store.plans.get(planName).get('portfolio')[0]){
      let date = store.plans.get(planName).get('portfolio')[0].date

      lastUpdated = moment(date.year + date.month + date.date, 'YYYYMMDD').format('MMMM D')
      console.log('LU: ', lastUpdated);
    }

    return (
      <div className="breadcrumbs">
        <p>{page} <i className="fa fa-chevron-right" aria-hidden="true"></i> <span className="blue-color capitalize">{planName}</span></p>
        <p>Last updated: {lastUpdated}</p>
      </div>
    )
  }
})

export default Breadcrumbs
