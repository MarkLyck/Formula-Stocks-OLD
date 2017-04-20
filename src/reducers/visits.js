import {
  RECEIVE_SINGLE_VISIT,
  RECEIVE_VISITS
} from '../actions/visits'

const initialState = {
  isFetching: false,
  visit: {},
  visits: []
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case RECEIVE_SINGLE_VISIT:
      return Object.assign({}, state, { visit: action.visit })
    case RECEIVE_VISITS:
      return Object.assign({}, state, { isFetching: false, visits: action.visits })
    default:
      return state
  }
}
