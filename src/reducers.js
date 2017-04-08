/**
 * Combines all reducers into the root reducer.
 * @module reducers
 */

import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import retail from './Containers/Retail_Entry/reducer'

export default combineReducers({
  retail,
  routing
})
