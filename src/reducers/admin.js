import {
  FETCHING_USERS,
  RECEIVE_USERS,
  FETCHING_VISITS,
  RECEIVE_VISITS,
  RECEIVE_VISITS_COUNT
} from '../actions/admin'

const initialState = {
  visitsCount: 0,
  visits: [],
  isFetchingVisits: false,
  isFetchingUsers: false,
  users: []
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCHING_VISITS:
      return Object.assign({}, state, { isFetchingVisits: true })
    case RECEIVE_VISITS:
      return Object.assign({}, state, { isFetchingVisits: false, visits: action.data })
    case RECEIVE_VISITS_COUNT:
      return Object.assign({}, state, { visitsCount: action.data.count })
    case FETCHING_USERS:
      return Object.assign({}, state, { isFetchingUsers: true })
    case RECEIVE_USERS:
      return Object.assign({}, state, { isFetchingUsers: false, users: action.data })
    default:
      return state
  }
}
