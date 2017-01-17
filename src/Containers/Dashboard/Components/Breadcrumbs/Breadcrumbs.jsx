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
    store.plans.on('update', this.updateState)
  }

  updateState() {
    this.setState({ fetched: true })
  }

  render() {
    let plans = ['basic', 'premium', 'business', 'fund']
    let planName = ''

    plans.forEach((plan) => {
      if (this.props.location.indexOf(plan) > -1) {
        planName = plan
      }
    })

    let page
    if (this.props.location.indexOf('portfolio') > -1) {
      page = 'Portfolio'
    } else if (this.props.location.indexOf('suggestions') > -1) {
      page = 'Suggestions'
    } else {
      return null
    }

    let lastUpdated, lastRebalanced
    let lastUpdatedTag
    if (page === 'Suggestions' && store.plans.get(planName).get('suggestions')[0]) {
      let date = store.plans.get(planName).get('suggestions')[0].date
      let month = date.month
      let fixedDate = date.day
      if (Number(date.month) <= 9) { month = '0' + date.month}
      if (Number(date.day) <= 9) { fixedDate = '0' + date.day}
      lastUpdated = moment(date.year + month + fixedDate, 'YYYYMMDD').format('MMM D, YYYY')

      // console.log(lastUpdated, date)
      // let endWindow = moment(date.year + date.month + date.date, 'YYYYMMDD').add(30, 'days').format('MMM D, YYYY')
      // lastUpdatedTag = <p>Trading Window: <span>{lastUpdated}</span> to <span>{endWindow}</span></p>
      lastUpdatedTag = <p>Last updated: <span>{lastUpdated}</span></p>
    } else if (page === 'Portfolio' && store.plans.get(planName).get('portfolio')[0]){
      let date = store.plans.get(planName).get('portfolio')[0].date
      lastRebalanced = moment(date.year + date.month + date.date, 'YYYYMMDD').format('MMMM D, YYYY')

      lastUpdatedTag = <p>Prices updated: <span className="semi-bold">yesterday</span>, Last rebalanced: <span className="semi-bold">{lastRebalanced}</span></p>
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
