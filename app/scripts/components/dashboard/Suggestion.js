import React from 'react'

import SuggestionChart from './SuggestionChart'
import store from '../../store'

const Suggestion = React.createClass({
  getInitialState() {
    return {fetched: false, fetching: false, failed: false}
  },
  componentDidMount() {
    if(!store.plans.get(this.props.planName).get('suggestions')[this.props.i].data) {
      this.setState({fetching: true})
      store.plans.get(this.props.planName).getStockInfo(this.props.suggestion.ticker, this.props.i)
      .promise.then(() => {
        console.log('finished getting data');
        this.setState({fetched: true, fetching: false})
      })
      .catch(() => {
        this.setState({fetched: false, fetching: false, failed: true})
      })
    } else {
      this.setState({fetched: true, fetching: false})
    }
  },
  componentWillReceiveProps(newProps) {
    if (newProps.planName !== this.props.planName) {
      if(!store.plans.get(newProps.planName).get('suggestions')[newProps.i].data) {
        store.plans.get(newProps.planName).getStockInfo(newProps.suggestion.ticker, newProps.i);
      }
    }
  },
  render() {
    let lastPrice;
    if (this.props.suggestion.data) {
      lastPrice = this.props.suggestion.data[0][3].toFixed(2)
    }
    let allocation;
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
      listClass = 'fade-in blue'
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
          <p className="red-color">Failed loading data</p>
        </div>)
    } else if (this.state.fetched) {
      chartArea = (
        <SuggestionChart
          data={this.props.suggestion.data}
          suggestedPrice={this.props.suggestion.suggested_price}
          ticker={this.props.suggestion.ticker}
          action={this.props.suggestion.action}/>
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
      </li>
    )
  }
})

export default Suggestion
