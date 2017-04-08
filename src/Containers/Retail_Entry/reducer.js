import _ from 'lodash'

import {
  FETCHING_PUBLIC_PLAN,
  RECEIVE_PUBLIC_PLAN
} from './actions'

const initialState = {
  selectedPlan: 'entry',
  isFetching: false,
  plans: {}
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCHING_PUBLIC_PLAN:
      return Object.assign({}, state, { isFetching: true })
    case RECEIVE_PUBLIC_PLAN:
      let plans = state.plans
      if (!plans[action.plan]) {
        plans[action.plan] = action.data
      } else {
        plans[action.plan] = _.merge(action.data, plans[action.plan])
      }
      return Object.assign({}, state, { isFetching: false, plans: plans })
    default:
      return state
  }
}
