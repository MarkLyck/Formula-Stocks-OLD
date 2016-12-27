import React from 'react'
import store from '../../../store'

class WinRateGraph extends React.Component {
  constructor() {
    super()

    this.updateState = this.updateState.bind(this)
    this.state = { premium: 0, business: 0, fund: 0, market: 0 }
  }

  componentDidMount() {
    store.plans.on('update', this.updateState)
  }

  componentWillUnmount() {
    store.plans.off('update', this.updateState)
  }

  updateState() {
    this.setState({
      premium: Math.floor(store.plans.get('premium').get('stats').WLRatio),
      business: Math.floor(store.plans.get('business').get('stats').WLRatio),
      fund: Math.floor(store.plans.get('fund').get('stats').WLRatio),
      market: 59
    })
  }

  render() {
    let preStyle = { height: `${this.state.premium}%` }
    let busStyle = { height: `${this.state.business}%` }
    let funStyle = { height: `${this.state.fund}%` }
    let marStyle = { height: `${this.state.market}%` }
    return (
      <div className="win-rate-graph">
        <div className="bar premium-bar" style={preStyle}><p>{this.state.premium}%</p><p className="plan-name">Premium</p></div>
        <div className="bar business-bar" style={busStyle}><p>{this.state.business}%</p><p className="plan-name">Business</p></div>
        <div className="bar fund-bar" style={funStyle}><p>{this.state.fund}%</p><p className="plan-name">Fund</p></div>
        <div className="sp-bar" style={marStyle}><p>{this.state.market}%</p><p className="plan-name">Market</p></div>
      </div>
    )
  }
}

export default WinRateGraph
