import _ from 'lodash'

import {
  FETCHING_SESSION,
  RECEIVE_SESSION,
  SET_SESSION_ITEM,
  UPDATE_USER,
  SAW_SUGGESTIONS,
  LOG_IN,
  LOG_IN_ERROR,
  LOG_OUT,
  SIGN_UP_ERROR,
  CANCEL_SUBSCRIPTION,
} from '../actions/session'

const initialState = {
  isFetching: false,
  location: {},
  lastSeen: new Date()
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCHING_SESSION:
      return Object.assign({}, state, { isFetching: true })
    case RECEIVE_SESSION:
      return Object.assign({}, state, { isFetching: false }, action.data)
    case SET_SESSION_ITEM:
      state[action.key] = action.value
      return Object.assign({}, state)
    case UPDATE_USER:
      return Object.assign({}, state)
    case SAW_SUGGESTIONS:
      return Object.assign({}, state, { lastSeenSuggestions: action.time })
    case SIGN_UP_ERROR:
      return Object.assign({}, state, { signupError: action.error })
    case LOG_IN:
      if (!action.data.error) {
        action.data.authtoken = action.data._kmd.authtoken
        localStorage.setItem('authtoken', action.data._kmd.authtoken)
      }
      return Object.assign({}, state, action.data)
    case LOG_IN_ERROR:
      return Object.assign({}, state, { loginError: action.error })
    case LOG_OUT:
      localStorage.removeItem('authtoken')
      state = initialState
      return Object.assign({}, state)
    case CANCEL_SUBSCRIPTION:
      console.log('cancelling ', action);
      state.stripe.subscriptions = { data: [action.subscription] }
      return Object.assign({}, state)
    default:
      return state
  }
}
