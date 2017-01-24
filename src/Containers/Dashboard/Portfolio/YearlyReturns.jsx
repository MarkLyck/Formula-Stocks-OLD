import React from 'react'
import store from '../../../store'
import './yearlyReturns.css'


class YearlyReturns extends React.Component {
  constructor(props) {
    super(props)
    this.updateState = this.updateState.bind(this)
    this.resetState = this.resetState.bind(this)
    this.state = { fetching: false, portfolioYields: store.plans.get(store.selectedPlan).toJSON().portfolioYields }
  }

  componentDidMount() {
    store.plans.get(store.selectedPlan).on('change', this.updateState)
    store.plans.on('plan-change', this.resetState)
  }

  componentWillReceiveProps() {
    this.updateState()
  }

  resetState() {
    this.setState({ portfolioYields: [] })
    this.updateState()
  }

  componentWillUnmount() {
    store.plans.get('basic').off('change', this.updateState)
    store.plans.get('premium').off('change', this.updateState)
    store.plans.get('business').off('change', this.updateState)
    store.plans.get('fund').off('change', this.updateState)
  }

  updateState() {
    if (!this.state.portfolioYields.length && store.plans.get(store.selectedPlan).get('portfolioYields').length) {
      this.setState({ portfolioYields: store.plans.get(store.selectedPlan).toJSON().portfolioYields })
    }
    else if (this.state.portfolioYields.length && store.plans.get(store.selectedPlan).get('portfolioYields').length) {
      if (this.state.portfolioYields[10] !== store.plans.get(store.selectedPlan).get('portfolioYields')[10]) {
        this.setState({ portfolioYields: store.plans.get(store.selectedPlan).toJSON().portfolioYields })
      }
    }
  }

  render() {
    if (!this.state.portfolioYields.length) {
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
    const fiveYearStart = this.state.portfolioYields.slice(-(12 * 5 + 1))[0].balance
    const threeYearStart = this.state.portfolioYields.slice(-(12 * 3 + 1))[0].balance
    const twoYearStart = this.state.portfolioYields.slice(-(12 * 2 + 1))[0].balance
    const oneYearStart = this.state.portfolioYields.slice(-12 + 1)[0].balance
    const lastBalance = this.state.portfolioYields[this.state.portfolioYields.length - 1].balance

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
