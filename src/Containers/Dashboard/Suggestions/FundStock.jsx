import React from 'react'
import _ from 'underscore'

import store from '../../../store'

class FundStock extends React.Component {
  constructor(props) {
    super(props)

    this.moreInfo = this.moreInfo.bind(this)
    this.closeModal = this.closeModal.bind(this)

    this.state = { fetched: false, fetching: false, failed: false, showModal: false }
  }

  componentDidMount() {
    if(!store.plans.get(this.props.planName).get('suggestions')[this.props.i].data) {
      this.setState({ fetched: true })
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.planName !== this.props.planName) {

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
    if (this.props.suggestion.data) {
      lastPrice = this.props.suggestion.data[0][3].toFixed(2)
    }
    let allocation
    if (this.props.suggestion.percentage_weight) {
      allocation = this.props.suggestion.percentage_weight.toFixed(2)
    }
    let listClass = 'fade-in white'
    let actionClass = ''
    let textColor = ''
    let SuggestedPriceText = 'Buy at'

    let allocationElement = (
      <li className={actionClass}>
        <h4 className="value">{allocation}%</h4>
        <p>Cash allocation</p>
      </li>
    )

    if (this.props.suggestion.action === 'SELL') {
      listClass = 'fade-in sell-suggestion'
      textColor = 'white-color'
      actionClass = 'sell'
      SuggestedPriceText = 'Sell at'
      allocationElement = <li></li>
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

export default FundStock
