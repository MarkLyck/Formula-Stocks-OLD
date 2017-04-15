import _ from 'lodash'

import {
  FETCHING_SESSION,
  RECEIVE_SESSION,
  UPDATE_USER,
  SAW_SUGGESTIONS,
  LOG_IN,
  LOG_OUT
} from '../actions/session'

const initialState = {
  isFetching: false,
  error: false
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCHING_SESSION:
      return Object.assign({}, state, { isFetching: true })
    case RECEIVE_SESSION:
      return Object.assign({}, state, { isFetching: false }, action.data)
    case UPDATE_USER:
      return Object.assign({}, state)
    case SAW_SUGGESTIONS:
      return Object.assign({}, state, { lastSeenSuggestions: action.time })
    case LOG_IN:
      action.data.authtoken = action.data._kmd.authtoken
      localStorage.setItem('authtoken', action.data._kmd.authtoken)
      return Object.assign({}, state, action.data)
    case LOG_OUT:
      localStorage.removeItem('authtoken')
      state = initialState
      return Object.assign({}, state)
    default:
      return state
  }
}
