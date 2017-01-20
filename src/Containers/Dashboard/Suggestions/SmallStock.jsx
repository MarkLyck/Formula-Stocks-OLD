import React from 'react'
import _ from 'underscore'
import './smallStock.css'

import store from '../../../store'

class SmallStock extends React.Component {
  constructor(props) {
    super(props)

    this.moreInfo = this.moreInfo.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.renderBottom = this.renderBottom.bind(this)
    this.toggleMoreInfo = this.toggleMoreInfo.bind(this)

    this.state = { fetched: false, fetching: false, failed: false, expanded: false }
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

  renderBottom() {
    if (this.state.expanded) {
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
          <ul className="advanced-data-list">
            {advancedData}
          </ul>
        </div>)
    }
  }

  toggleMoreInfo() {
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    let allocation
    if (this.props.suggestion.percentage_weight > 0.0001) {
      allocation = this.props.suggestion.percentage_weight.toFixed(4)
    } else {
      allocation = 0.0001
    }

    let listClass = 'fade-in white small-stock'
    let actionClass = ''
    let textColor = ''
    let SuggestedPriceText = 'Buy at'

    let allocationElement = (
      <li className="vertical">
        <h3>Cash allocation</h3>
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

          <div className="vertical">
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
