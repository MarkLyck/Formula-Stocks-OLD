/**
 * Combines all reducers into the root reducer.
 * @module reducers
 */

import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import plans from './reducers/plans'
import market from './reducers/market'
import stocks from './reducers/stocks'
import session from './reducers/session'
import settings from './reducers/settings'

export default combineReducers({
  plans,
  market,
  stocks,
  session,
  settings,
  routing
})
