import React from 'react'
import moment from 'moment'
// import store from '../../../store'
import './yearlyReturns.css'


class YearlyReturns extends React.Component {
  constructor(props) {
    super(props)
    // this.updateState = this.updateState.bind(this)
    this.resetState = this.resetState.bind(this)
  }

  // componentDidMount() {
  //   store.plans.get(store.selectedPlan).on('change', this.updateState)
  //   store.plans.on('plan-change', this.resetState)
  // }

  // componentWillReceiveProps() {
  //   this.updateState()
  // }

  resetState() {
    this.setState({ portfolioYields: [] })
    this.updateState()
  }

  // componentWillUnmount() {
  //   store.plans.get('basic').off('change', this.updateState)
  //   store.plans.get('premium').off('change', this.updateState)
  //   store.plans.get('business').off('change', this.updateState)
  //   store.plans.get('fund').off('change', this.updateState)
  // }

  // updateState() {
  //   if ((!this.state.portfolioYields.length && store.plans.get(store.selectedPlan).get('portfolioYields').length)
  //       || this.state.portfolioYields.length < store.plans.get(store.selectedPlan).get('portfolioYields').length) {
  //     this.setState({ portfolioYields: store.plans.get(store.selectedPlan).toJSON().portfolioYields })
  //   }
  //   else if (this.state.portfolioYields.length && store.plans.get(store.selectedPlan).get('portfolioYields').length) {
  //     if (this.state.portfolioYields[10] !== store.plans.get(store.selectedPlan).get('portfolioYields')[10]) {
  //       this.setState({ portfolioYields: store.plans.get(store.selectedPlan).toJSON().portfolioYields })
  //     }
  //   }
  // }

  render() {
    const { portfolioYields } = this.props
    if (!portfolioYields.length) {
      return (
        <div className="yearly-returns">
          <ul className="return-list">
            <li className="return five-year">
              <h3 className="year">5 years</h3>
              <h4 className="return"></h4>
            </li>
            <div className="vert-divider"/>
            <li className="return three-year">
              <h3 className="year">36 months</h3>
              <h4 className="return"></h4>
            </li>
            <div className="vert-divider"/>
            <li className="return two-year">
              <h3 className="year">24 months</h3>
              <h4 className="return"></h4>
            </li>
            <div className="vert-divider"/>
            <li className="return">
              <h3 className="year">12 months</h3>
              <h4 className="return"></h4>
            </li>
          </ul>
        </div>
      )
    }

    let additionalMonths = 1
    if (portfolioYields.slice(-13)[0].date.month === moment().format('M')) {
      additionalMonths = 2
    }

    const fiveYearStart = portfolioYields.slice(-(12 * 5 + additionalMonths))[0].balance
    const threeYearStart = portfolioYields.slice(-(12 * 3 + additionalMonths))[0].balance
    const twoYearStart = portfolioYields.slice(-(12 * 2 + additionalMonths))[0].balance
    const oneYearStart = portfolioYields.slice(-12 - additionalMonths)[0].balance
    const lastBalance = portfolioYields[portfolioYields.length - 1].balance

    return (
      <div className="yearly-returns">
        <ul className="return-list">
          <li className="return five-year">
            <h3 className="year">5 years</h3>
            <h4 className="return">+{((lastBalance - fiveYearStart) / fiveYearStart * 100).toFixed(2)}%</h4>
          </li>
          <div className="vert-divider"/>
          <li className="return three-year">
            <h3 className="year">36 months</h3>
            <h4 className="return">+{((lastBalance - threeYearStart) / threeYearStart * 100).toFixed(2)}%</h4>
          </li>
          <div className="vert-divider"/>
          <li className="return two-year">
            <h3 className="year">24 months</h3>
            <h4 className="return">+{((lastBalance - twoYearStart) / twoYearStart * 100).toFixed(2)}%</h4>
          </li>
          <div className="vert-divider"/>
          <li className="return">
            <h3 className="year">12 months</h3>
            <h4 className="return">+{((lastBalance - oneYearStart) / oneYearStart * 100).toFixed(2)}%</h4>
          </li>
        </ul>
      </div>
    )
  }
}

export default YearlyReturns
