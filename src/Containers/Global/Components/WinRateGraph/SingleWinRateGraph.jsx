import React from 'react'
import store from '../../../../store'
import './winRateGraph.css'

class SingleWinRateGraph extends React.Component {
  constructor() {
    super()

    this.updateState = this.updateState.bind(this)
    this.state = { fs: 0, market: 0 }
  }

  componentDidMount() {
    if (store.plans.get(this.props.plan).get('stats').WLRatio) { this.updateState() }
    store.plans.on('change', this.updateState)
  }

  componentWillUnmount() {
    store.plans.off('change', this.updateState)
  }

  updateState() {
    this.setState({
      fs: Math.floor(store.plans.get(this.props.plan).get('stats').WLRatio),
      market: 59
    })
  }

  render() {
    let fsStyle = { height: `${this.state.fs}%` }
    let marStyle = { height: `${this.state.market}%` }

    return (
      <div className="win-rate-graph single-win-rate-graph">
        <div className="graph-beside">
          <div className="bar fs-bar" style={fsStyle}><p>{this.state.fs}%</p><p className="plan-name">{this.props.name}</p></div>
          <div className="sp-bar" style={marStyle}><p>{this.state.market}%</p><p className="plan-name">Market</p></div>
        </div>
        <h3>Win ratio</h3>
      </div>
    )
  }
}

export default SingleWinRateGraph
