import _ from 'lodash'

import {
  FETCHING_SESSION,
  RECEIVE_SESSION
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
    default:
      return state
  }
}
