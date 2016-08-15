import React from 'react'

import store from '../../store'

const Portfolio = React.createClass({
  getInitialState() {
    return {fetching: true}
  },
  componentDidMount() {
    store.plans.get(this.props.plan).on('change', this.updateState)
    store.plans.get(this.props.plan).getPortfolio()
  },
  updateState() {
    this.setState({fetching: false})
  },
  componentWillReceiveProps(newPlan) {
    store.plans.get(newPlan.plan).on('change', this.updateState)
    store.plans.get(newPlan.plan).getPortfolio()
  },
  render() {
    let portfolio = store.plans.get(this.props.plan).get('portfolio').map((stock, i) => {
      console.log(stock);
      return (
        <li key={i}>
          <h3>{stock.name}</h3>
        </li>
      )
    })
    return (
      <div className="portfolio">
        {portfolio}
      </div>
    )
  }
})


export default Portfolio
