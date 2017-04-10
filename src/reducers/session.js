import _ from 'lodash'

import {
  FETCHING_SESSION,
  RECEIVE_SESSION,
  UPDATE_USER,
  SAW_SUGGESTIONS
} from '../actions/session'

const initialState = {
  isFetching: false
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
    default:
      return state
  }
}
