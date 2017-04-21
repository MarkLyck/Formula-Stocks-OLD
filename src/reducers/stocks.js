import _ from 'lodash'
import Lockr from 'lockr'

import {
  RECEIVE_HISTORIC_STOCK_DATA,
  RECEIVE_LAST_PRICE,
  RECEIVE_REALTIME_QUOTE,
  RECEIVE_ALL_REALTIME_QUOTES
} from '../actions/stocks'

const initialState = {}

export default function reducer(state = initialState, action = {}) {
  let stocks = Lockr.get('stocks')
  switch (action.type) {
    case RECEIVE_HISTORIC_STOCK_DATA:
      action.ticker = action.ticker.replace('_', '.')
      if (!stocks[action.ticker]) { stocks[action.ticker] = {} }
      if (!action.data.dataset) {
        stocks[action.ticker].fetchFailed = true
        return Object.assign({}, state, stocks)
      }

      stocks[action.ticker].date = new Date()
      stocks[action.ticker].lastPrice = stocks[action.ticker] ? stocks[action.ticker].newPrice : action.data.dataset.data[0][1]
      stocks[action.ticker].newPrice = action.data.dataset.data[0][1]
      stocks[action.ticker].data = action.data.dataset.data

      Lockr.set('stocks', stocks)
      return Object.assign({}, state, stocks)
    case RECEIVE_LAST_PRICE:
      if (!stocks[action.ticker]) { stocks[action.ticker] = {} }
      if (action.data.dataset) {
        stocks[action.ticker].date = new Date()
        stocks[action.ticker].lastPrice = stocks[action.ticker] ? stocks[action.ticker].newPrice : action.data.dataset.data[0][1]
        stocks[action.ticker].newPrice = action.data.dataset.data[0][1]
        Lockr.set('stocks', stocks)
      }
      return Object.assign({}, state, stocks)
    case RECEIVE_REALTIME_QUOTE:
      action.ticker = action.ticker.replace('_', '.')
      if (!stocks[action.ticker]) { stocks[action.ticker] = {} }

      stocks[action.ticker].lastPrice = stocks[action.ticker] ? stocks[action.ticker].newPrice : action.price
      stocks[action.ticker].newPrice = action.price
      stocks[action.ticker].date = new Date()

      Lockr.set('stocks', stocks)

      return Object.assign({}, state, stocks)
    case RECEIVE_ALL_REALTIME_QUOTES:

      _.forIn(action.quotes, (value, key) => {
        const ticker = key.replace('_', '.')
        if (!stocks[ticker]) { stocks[ticker] = {} }
        stocks[ticker].lastPrice = stocks[action.ticker] ? stocks[action.ticker].newPrice : action.price
        stocks[ticker].newPrice = value
        stocks[ticker].date = new Date()
      })
      Lockr.set('stocks', stocks)
      return Object.assign({}, state, stocks)
    default:
      return state
  }
}
