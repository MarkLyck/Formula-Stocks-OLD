import _ from 'lodash'

import {
  FETCHING_DJIA,
  RECEIVE_DJIA,
  FETCHING_SP500,
  RECEIVE_SP500
} from '../actions/market'

const initialState = {
  isFetchingDJIA: false,
  isFetchingSP: false,
  DJIA: [],
  SP500: [],
  annualSP500: []
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCHING_DJIA:
      return Object.assign({}, state, { isFetchingDJIA: true })
    case RECEIVE_DJIA:
      let DJIAData = action.data.data.reverse().map(point => point[1].toFixed(0))
      return Object.assign({}, state, { isFetchingDJIA: false, DJIA: DJIAData })
    case FETCHING_SP500:
      return Object.assign({}, state, { isFetchingSP: true })
    case RECEIVE_SP500:
      let percent = 0
      let SPData = action.data.data.reverse().map((point, i) => {
        if (i < 1) { percent = (25000 * 100) / point[1] / 100 }
        return Math.floor(percent * point[1].toFixed(0))
      })
      if (action.startTrim.indexOf('1970') > -1) {
        return Object.assign({}, state, { isFetchingSP: false, annualSP500: SPData })
      } else {
        return Object.assign({}, state, { isFetchingSP: false, SP500: SPData })
      }
    default:
      return state
  }
}
