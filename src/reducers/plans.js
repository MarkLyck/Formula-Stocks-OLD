import _ from 'lodash'
import Lockr from 'lockr'

import {
  FETCHING_PLAN,
  RECEIVE_PLAN,
  RECEIVE_HISTORIC_STOCK_DATA,
  SELECT_NEW_PLAN
} from '../actions/plans'

const initialState = {
  selectedPlan: 'entry',
  isFetchingPlan: false,
  data: {}
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCHING_PLAN:
      return Object.assign({}, state, { isFetchingPlan: true })
    case RECEIVE_PLAN:
      let newData = state.data
      if (!newData[action.plan]) {
        newData[action.plan] = action.data
      } else {
        newData[action.plan] = _.merge(action.data, newData[action.plan])
      }
      return Object.assign({}, state, { isFetchingPlan: false, data: newData })
    case RECEIVE_HISTORIC_STOCK_DATA:
      action.ticker = action.ticker.replace('_', '.')
      if (!action.data.dataset) {
        let newSuggestions = state.data[state.selectedPlan].suggestions
        const stockIndex = _.findIndex(newSuggestions, (sugg) => sugg.ticker === action.ticker)
        newSuggestions[stockIndex].fetchFailed = true
        state.data[state.selectedPlan].suggestions = newSuggestions
        return Object.assign({}, state)
      }
      let stocks = Lockr.get('stocks')
      stocks[action.ticker] = {
        date: new Date(),
        lastPrice: action.data.dataset.data[0][1],
        data: action.data.dataset.data.reverse()
      }
      let newSuggestions = state.data[state.selectedPlan].suggestions
      const stockIndex = _.findIndex(newSuggestions, (sugg) => sugg.ticker === action.ticker)
      newSuggestions[stockIndex].lastPrice = action.data.dataset.data[0][1]
      newSuggestions[stockIndex].data = action.data.dataset.data.reverse()

      state.data[state.selectedPlan].suggestions = newSuggestions
      Lockr.set('stocks', stocks)

      return Object.assign({}, state)
    case SELECT_NEW_PLAN:
      localStorage.setItem('selectedPlan', action.plan)
      return Object.assign({}, state, { selectedPlan: action.plan })
    default:
      return state
  }
}
