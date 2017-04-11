import _ from 'lodash'
import Lockr from 'lockr'

import {
  RECEIVE_HISTORIC_STOCK_DATA
} from '../actions/stocks'

const initialState = {}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case RECEIVE_HISTORIC_STOCK_DATA:
      action.ticker = action.ticker.replace('_', '.')
      if (!state[action.ticker]) { state[action.ticker] = {} }
      if (!action.data.dataset) {
        state[action.ticker].fetchFailed = true
        return Object.assign({}, state)
      }
      let stocks = Lockr.get('stocks')
      let newData = {
        date: new Date(),
        lastPrice: action.data.dataset.data[0][1],
        data: action.data.dataset.data
      }
      stocks[action.ticker] = Object.assign({}, stocks[action.ticker], newData)
      // Save to local
      Lockr.set('stocks', stocks)

      return Object.assign({}, state, stocks)
    default:
      return state
  }
}
