import _ from 'lodash'

import {
  FETCHING_PUBLIC_PLAN,
  RECEIVE_PUBLIC_PLAN
} from '../actions/plans'

const initialState = {
  selectedPlan: 'entry',
  isFetchingPlan: false,
  data: {}
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCHING_PUBLIC_PLAN:
      return Object.assign({}, state, { isFetchingPlan: true })
    case RECEIVE_PUBLIC_PLAN:
      let newData = state.data
      if (!newData[action.plan]) {
        newData[action.plan] = action.data
      } else {
        newData[action.plan] = _.merge(action.data, newData[action.plan])
      }
      return Object.assign({}, state, { isFetchingPlan: false, data: newData })
    default:
      return state
  }
}
