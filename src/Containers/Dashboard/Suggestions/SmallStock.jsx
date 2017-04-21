import React from 'react'
import _ from 'underscore'
import './smallStock.css'

import SuggestionChart from './SuggestionChart'

class SmallStock extends React.Component {
  constructor(props) {
    super(props)

    this.renderBottom = this.renderBottom.bind(this)
    this.toggleMoreInfo = this.toggleMoreInfo.bind(this)

    this.state = { expanded: false, useAlt: false }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.stock && this.props.stock) {
      if (newProps.stock.newPrice !== this.props.stock.newPrice) {
        this.setState({ useAlt: !this.state.useAlt })
      }
    }
  }

  renderBottom() {
    const { suggestion, stock = {} } = this.props
    if (this.state.expanded) {
      let chartArea
      let loadingColor = suggestion.action === 'SELL' ? 'white-color' : 'blue-color'

      if (!stock.data && !stock.fetchFailed) {
        chartArea = (
          <div className="fetching-data">
            <i className={`fa fa-circle-o-notch fa-spin fa-3x fa-fw ${loadingColor}`}></i>
            <p className={loadingColor}>Loading data</p>
          </div>)
      } else if (stock.fetchFailed) {
        chartArea = (
          <div className="fetching-data">
            <p className="failed"><i className="fa fa-exclamation-circle" aria-hidden="true"></i> Couldn't find data</p>
          </div>)
      } else {
        chartArea = (
          <SuggestionChart
            data={stock.data}
            suggestedPrice={suggestion.suggested_price}
            ticker={suggestion.ticker}
            action={suggestion.action}
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
    const { suggestion } = this.props
    this.setState({ expanded: !this.state.expanded })
    this.props.fetchHistoricStockDataIfNeeded(suggestion.ticker, this.props.i, 120)
  }

  render() {
    const { suggestion } = this.props
    let allocation
    let allocationText = 'Cash allocation'
    if (suggestion.percentage_weight > 0.0001) {
      allocation = suggestion.percentage_weight.toFixed(4)
    } else if (this.props.suggestion.portfolio_weight) {
      allocationText = 'Portfolio allocation'
      allocation = suggestion.portfolio_weight.toFixed(4)
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

    if (suggestion.action === 'SELL') {
      listClass = 'fade-in small-stock small-stock-sell'
      textColor = 'white-color'
      actionClass = 'sell'
      SuggestedPriceText = 'Sell at'
      allocationElement = <li></li>
    }

    return (
      <div className={listClass}>
        <div className="top">
          <h3 className={`action ${actionClass}`}>{suggestion.action}</h3>

          <div className="vertical name">
            <h3 className={textColor}>{suggestion.name}</h3>
            <h4 className="ticker">{suggestion.ticker}</h4>
          </div>

          <div className="vertical price">
            <h3>{SuggestedPriceText}</h3>
            <h4 className="value">${suggestion.suggested_price.toFixed(2)}</h4>
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
