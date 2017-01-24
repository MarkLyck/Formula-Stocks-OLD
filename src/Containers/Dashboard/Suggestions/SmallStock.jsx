import React from 'react'
import _ from 'underscore'
import './smallStock.css'

import store from '../../../store'
import SuggestionChart from './SuggestionChart'

class SmallStock extends React.Component {
  constructor(props) {
    super(props)

    this.renderBottom = this.renderBottom.bind(this)
    this.toggleMoreInfo = this.toggleMoreInfo.bind(this)

    this.state = { fetched: false, fetching: true, failed: false, expanded: false }
  }

  componentDidMount() {
    if(!store.plans.get(this.props.planName).get('suggestions')[this.props.i].data) {
      this.setState({ fetched: false })
    }
  }

  renderBottom() {
    if (this.state.expanded) {

      let chartArea
      let loadingColor = 'blue-color'
      if (this.props.suggestion.action === 'SELL') {
        loadingColor = 'white-color'
      }
      if (this.state.fetching) {
        chartArea = (
          <div className="fetching-data">
            <i className={`fa fa-circle-o-notch fa-spin fa-3x fa-fw ${loadingColor}`}></i>
            <p className={loadingColor}>Loading data</p>
          </div>)
      } else if (this.state.failed) {
        chartArea = (
          <div className="fetching-data">
            <p className="failed"><i className="fa fa-exclamation-circle" aria-hidden="true"></i> Couldn't find data</p>
          </div>)
      } else if (this.state.fetched) {
        chartArea = (
          <SuggestionChart
            data={this.state.data}
            suggestedPrice={this.props.suggestion.suggested_price}
            ticker={this.props.suggestion.ticker}
            action={this.props.suggestion.action}
            allData={this.state.showModal}/>
        )
      }

      const advancedData = this.props.suggestion.advanced_data.map((dataPoint, i) => {
        let value = dataPoint.value
        if (dataPoint.unit === 'percent') {
          value += '%'
        }
        return (
          <li key={i}>
            <h3 className="data-type">{dataPoint.display_name}</h3>
            <h3 className="data-value">{value}</h3>
          </li>
        )
      })

      return (
        <div className="bottom">
          {chartArea}
          <ul className="advanced-data-list">
            {advancedData}
          </ul>
        </div>)
    }
  }

  toggleMoreInfo() {
    if (!this.state.expanded && !this.state.fetched) {
      store.plans.get(store.selectedPlan).getHistoricData(this.props.suggestion.ticker, this.props.i, 120)
      .then(data => { this.setState({ data: data, fetching: false, fetched: true }) })
      .catch(() => this.setState({ fetching: false }))
    }
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    let allocation
    let allocationText = 'Cash allocation'
    if (this.props.suggestion.percentage_weight > 0.0001) {
      allocation = this.props.suggestion.percentage_weight.toFixed(4)
    } else if (this.props.suggestion.portfolio_weight) {
      allocationText = 'Portfolio allocation'
      allocation = this.props.suggestion.portfolio_weight.toFixed(4)
    } else {
      allocation = 0.0001
    }

    let listClass = 'fade-in white small-stock'
    let actionClass = ''
    let textColor = ''
    let SuggestedPriceText = 'Buy at'

    let allocationElement = (
      <li className="vertical">
        <h3>{allocationText}</h3>
        <h4 className="value">{allocation}%</h4>
      </li>
    )

    if (this.props.suggestion.action === 'SELL') {
      listClass = 'fade-in small-stock small-stock-sell'
      textColor = 'white-color'
      actionClass = 'sell'
      SuggestedPriceText = 'Sell at'
      allocationElement = <li></li>
    }

    return (
      <div className={listClass}>
        <div className="top">
          <h3 className={`action ${actionClass}`}>{this.props.suggestion.action}</h3>

          <div className="vertical name">
            <h3 className={textColor}>{this.props.suggestion.name}</h3>
            <h4 className="ticker">{this.props.suggestion.ticker}</h4>
          </div>

          <div className="vertical price">
            <h3>{SuggestedPriceText}</h3>
            <h4 className="value">${this.props.suggestion.suggested_price.toFixed(2)}</h4>
          </div>

          {allocationElement}

          <button className={`more-info ${actionClass}`} onClick={this.toggleMoreInfo}>More info</button>
        </div>
        {this.renderBottom()}
      </div>
    )
  }
}

export default SmallStock
