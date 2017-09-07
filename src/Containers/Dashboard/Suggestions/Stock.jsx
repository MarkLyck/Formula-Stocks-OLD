import React from 'react'
import _ from 'underscore'

import SuggestionChart from './SuggestionChart'

class Suggestion extends React.Component {
  constructor(props) {
    super(props)

    this.moreInfo = this.moreInfo.bind(this)
    this.closeModal = this.closeModal.bind(this)

    this.state = { fshowModal: false, useAlt: false }
  }

  componentDidMount() {
    this.props.fetchHistoricStockDataIfNeeded(this.props.suggestion.ticker, 120)
  }

  componentWillReceiveProps(newProps) {
    if (newProps.stock && this.props.stock) {
      if (newProps.stock.newPrice !== this.props.stock.newPrice) {
        this.setState({ useAlt: !this.state.useAlt })
      }
    }
  }

  moreInfo() {
    this.setState({ showModal: true })
  }

  closeModal(e) {
    if (_.toArray(e.target.classList).indexOf('db-modal-container') !== -1) {
      this.setState({ showModal: false })
    }
  }

  render() {
    const { suggestion, stock = {} } = this.props

    let priceUpdate = stock.newPrice !== stock.lastPrice ? true : false
    let lastPriceClass = 'class-checker'

    if (priceUpdate) {
      if (stock.lastPrice < stock.newPrice) {
        lastPriceClass += !this.state.useAlt ? ' realtime-positive' : ' realtime-positive-alt'
      } else {
        lastPriceClass += !this.state.useAlt ? ' realtime-negative' : ' realtime-negative-alt'
      }
    }

    let allocation
    let allocationText = 'Cash allocation'
    if (suggestion.percentage_weight) {
      allocation = suggestion.percentage_weight.toFixed(2)
    } else if (suggestion.portfolio_weight) {
      allocationText = 'Portfolio allocation'
      allocation = suggestion.portfolio_weight.toFixed(2)
    }
    let listClass = 'fade-in white suggestion'
    let actionClass = ''
    let textColor = ''
    let SuggestedPriceText = 'Buy at'

    let allocationElement = (
      <li className={actionClass}>
        <p>{allocationText}</p>
        <h4 className="value">{allocation}%</h4>
      </li>
    )

    if (suggestion.action === 'SELL') {
      listClass = 'fade-in sell-suggestion'
      textColor = 'white-color'
      actionClass = 'sell'
      SuggestedPriceText = 'Sell at'
      allocationElement = (
        <li>
          <p>Purchase price</p>
          <h4 className="value">${suggestion.original_purchase.toFixed(2)}</h4>
        </li>)
    }

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
          <p className="failed">Chart data not available for this stock</p>
        </div>)
    } else if (stock.data.length) {
      chartArea = (
        <SuggestionChart
          data={stock.data}
          suggestedPrice={suggestion.suggested_price}
          ticker={suggestion.ticker}
          action={suggestion.action}
          />
      )
    }

    let modal
    if (this.state.showModal) {
      let advancedData = suggestion.advanced_data.map((dataPoint, i) => {
        let value = dataPoint.value
        if (dataPoint.unit === 'percent') {
          value += '%'
        }
        return (
          <li key={i}>
            <h3>{dataPoint.display_name}</h3>
            <h3>{value}</h3>
          </li>
        )
      })
      modal = (
        <div className="db-modal-container" onClick={this.closeModal}>
          <div className="db-modal advanced-data-modal">
            <div className="top">
              <h3 className={textColor}>{suggestion.name}</h3>
              <h3 className={`action ${actionClass}`}>{suggestion.action}</h3>
            </div>
            {chartArea}
            <ul className="advanced-data-list">
              {advancedData}
            </ul>
          </div>
        </div>
      )
    }

    console.log(stock);

    return (
      <li className={listClass}>

        <div className="top">
          <h3 className="stock-name">{suggestion.name}</h3>
          <h3 className={`action ${actionClass}`}>{suggestion.action}</h3>
        </div>

        <div className="sugg-content">
          <ul className="left">
            <li className={actionClass}>
              <p>Ticker</p>
              <h4 className="value">{suggestion.ticker}</h4>
            </li>
            <li className={actionClass}>
              <p>{SuggestedPriceText}</p>
              <h4 className="value">${suggestion.suggested_price.toFixed(2)}</h4>
            </li>
            <li className={actionClass}>
              <p>Last price</p>
              <h4 className={lastPriceClass + ' value'}>${stock.newPrice && typeof stock.newPrice === 'number '? stock.newPrice.toFixed(2) : suggestion.suggested_price.toFixed(2)}</h4>
            </li>
            {allocationElement}
            <button className={`more-info ${actionClass}`} onClick={this.moreInfo}>More info</button>
          </ul>
          <div className="right">
            {chartArea}
          </div>
        </div>
        <div className="bottom-bar"/>
        {modal}
      </li>
    )
  }
}

export default Suggestion
