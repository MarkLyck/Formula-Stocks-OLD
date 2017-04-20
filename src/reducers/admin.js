import {
  FETCHING_USERS,
  RECEIVE_USERS
} from '../actions/admin'

const initialState = {
  isFetchingUsers: false,
  users: []
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCHING_USERS:
      return Object.assign({}, state, { isFetchingUsers: true })
    case RECEIVE_USERS:
      return Object.assign({}, state, { isFetchingUsers: false, users: action.data })
    default:
      return state
  }
}
