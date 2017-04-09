import _ from 'lodash'

import {
  FETCHING_PUBLIC_PLAN,
  RECEIVE_PUBLIC_PLAN,
  FETCHING_DJIA,
  RECEIVE_DJIA
} from './actions'

const initialState = {
  selectedPlan: 'entry',
  isFetchingPlan: false,
  isFetchingDJIA: false,
  isFetchingSP: false,
  plans: {},
  DJIA: []
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCHING_PUBLIC_PLAN:
      return Object.assign({}, state, { isFetchingPlan: true })
    case RECEIVE_PUBLIC_PLAN:
      let plans = state.plans
      if (!plans[action.plan]) {
        plans[action.plan] = action.data
      } else {
        plans[action.plan] = _.merge(action.data, plans[action.plan])
      }
      return Object.assign({}, state, { isFetchingPlan: false, plans: plans })
    case FETCHING_DJIA:
      return Object.assign({}, state, { isFetchingDJIA: true })
    case RECEIVE_DJIA:
      return Object.assign({}, state, { isFetchingDJIA: false, DJIA: action.data.data })
    default:
      return state
  }
}
