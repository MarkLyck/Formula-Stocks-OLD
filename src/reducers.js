/**
 * Combines all reducers into the root reducer.
 * @module reducers
 */

import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import plans from './reducers/plans'
import market from './reducers/market'

export default combineReducers({
  plans,
  market,
  routing
})
