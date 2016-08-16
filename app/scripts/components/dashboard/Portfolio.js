import React from 'react'

import store from '../../store'
import cc from '../../cc'

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
      // console.log(stock);
      if (stock.name === 'CASH') {
        return (
          <tbody key={i}>
            <tr>
              <td>{stock.name}</td>
              <td>{stock.percentage_weight.toFixed(2)}%</td>
            </tr>
          </tbody>
        )
      }

      let changeClass = 'positive'
      if ((stock.latest_price - stock.purchase_price).toFixed(2) < 0) {
        changeClass = 'negative'
      }

      return (
        <tbody key={i}>
          <tr>
            <td className="stock-name"><p>{stock.name}</p></td>
            <td><p className="blue">{stock.percentage_weight.toFixed(2)}%</p></td>
            <td><p className={changeClass}>{(stock.latest_price - stock.purchase_price).toFixed(2)}%</p></td>
            <td><p className="blue">${stock.purchase_price.toFixed(2)}</p></td>
            <td><p>${stock.latest_price.toFixed(2)}</p></td>
            <td><p>{cc.commafy(stock.days_owned)}</p></td>
          </tr>
        </tbody>
      )
    })

    return (
      <div className="portfolio">
        <section className="holdings">
          <div className="top">
            <h2>Holdings</h2>
            <h2 className="blue">{store.plans.get(this.props.plan).get('portfolio').length - 1} Stocks</h2>
          </div>
          <table className="portfolio-table">
            <thead className="labels">
              <tr>
                <th>Name</th>
                <th>Allocation</th>
                <th>changes</th>
                <th>Bought at</th>
                <th>Last price</th>
                <th>Days owned</th>
                <th>See more</th>
              </tr>
            </thead>

            {portfolio}
          </table>
        </section>
      </div>
    )
  }
})

export default Portfolio
