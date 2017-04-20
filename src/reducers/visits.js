import {
  RECEIVE_SINGLE_VISIT,
  RECEIVE_VISITS,
  FETCHING_VISITS,
  RECEIVE_VISITS_COUNT
} from '../actions/visits'

const initialState = {
  isFetching: false,
  visit: {},
  visitsCount: '',
  visitsData: []
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case RECEIVE_SINGLE_VISIT:
      localStorage.setItem('visit_ID', action.visit._id)
      return Object.assign({}, state, { visit: action.visit })
    case FETCHING_VISITS:
      return Object.assign({}, state, { isFetching: true })
    case RECEIVE_VISITS:
      return Object.assign({}, state, { isFetching: false, visits: action.visits })
    case RECEIVE_VISITS_COUNT:
      return Object.assign({}, state, { visitsCount: action.data })
    default:
      return state
  }
}
