import React from 'react'
import _ from 'underscore'

import SuggestionChart from './SuggestionChart'
import store from '../../../store'

class Suggestion extends React.Component {
  constructor(props) {
    super(props)

    this.moreInfo = this.moreInfo.bind(this)
    this.closeModal = this.closeModal.bind(this)

    this.state = { fetched: false, fetching: true, failed: false, showModal: false }
  }

  componentDidMount() {
    store.plans.get(store.selectedPlan).getHistoricData(this.props.suggestion.ticker, this.props.i, 120)
    .then(data => { this.setState({ data: data, fetching: false, fetched: true }) })
    .catch(() => this.setState({ fetching: false }))
  }

  componentWillReceiveProps(newProps) {
    if (newProps.planName !== this.props.planName) {
      if(!store.plans.get(newProps.planName).get('suggestions')[newProps.i].data) {
        console.log('get stock info in props')
        // store.plans.get(newProps.planName).getStockInfo(newProps.suggestion.ticker, newProps.i, false, this.props.suggestion.model)
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
    let lastPrice
    if (this.state.data) {
      lastPrice = this.state.data[0][1].toFixed(2)
    }

    let allocation
    let allocationText = 'Cash allocation'
    if (this.props.suggestion.percentage_weight) {
      allocation = this.props.suggestion.percentage_weight.toFixed(2)
    } else if (this.props.suggestion.portfolio_weight) {
      allocationText = 'Portfolio allocation'
      allocation = this.props.suggestion.portfolio_weight.toFixed(2)
    }
    let listClass = 'fade-in white suggestion'
    let actionClass = ''
    let textColor = ''
    let SuggestedPriceText = 'Buy at'

    let allocationElement = (
      <li className={actionClass}>
        <h4 className="value">{allocation}%</h4>
        <p>{allocationText}</p>
      </li>
    )

    if (this.props.suggestion.action === 'SELL') {
      listClass = 'fade-in sell-suggestion'
      textColor = 'white-color'
      actionClass = 'sell'
      SuggestedPriceText = 'Sell at'
      allocationElement = <li></li>;
    }

    let chartArea;
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
      // console.log(this.props.suggestion.data)
      chartArea = (
        <SuggestionChart
          data={this.state.data}
          suggestedPrice={this.props.suggestion.suggested_price}
          ticker={this.props.suggestion.ticker}
          action={this.props.suggestion.action}
          allData={this.state.showModal}/>
      )
    }

    let modal
    if (this.state.showModal) {
      let advancedData = this.props.suggestion.advanced_data.map((dataPoint, i) => {
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
              <h3 className={textColor}>{this.props.suggestion.name}</h3>
              <h3 className={`action ${actionClass}`}>{this.props.suggestion.action}</h3>
            </div>
            {chartArea}
            <ul className="advanced-data-list">
              {advancedData}
            </ul>
          </div>
        </div>
      )
    }

    return (
      <li className={listClass}>
        <div className="top">
          <h3 className={textColor}>{this.props.suggestion.name}</h3>
          <h3 className={`action ${actionClass}`}>{this.props.suggestion.action}</h3>
        </div>

        {chartArea}

        <ul className="bottom">
          <li className={actionClass}>
            <h4 className="value">{this.props.suggestion.ticker}</h4>
            <p>Ticker</p>
          </li>

          {allocationElement}

          <li className={actionClass}>
            <h4 className="value">${this.props.suggestion.suggested_price.toFixed(2)}</h4>
            <p>{SuggestedPriceText}</p>
          </li>
          <li className={actionClass}>
            <h4 className="value">${lastPrice}</h4>
            <p>Last price</p>
          </li>
        </ul>
        <button className={`more-info ${actionClass}`} onClick={this.moreInfo}>More info</button>
        {modal}
      </li>
    )
  }
}

export default Suggestion
