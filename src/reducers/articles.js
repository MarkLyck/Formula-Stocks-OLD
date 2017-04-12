import {
  FETCHING_ARTICLES,
  RECEIVE_ARTICLES
} from '../actions/articles'

const initialState = {
  isFetching: false,
  data: []
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCHING_ARTICLES:
      return Object.assign({}, state, { isFetching: true })
    case RECEIVE_ARTICLES:
      return Object.assign({}, state, { isFetching: false, data: action.data })
    default:
      return state
  }
}
