import _ from 'lodash'
import {
  SHOW_NOTIFICATION,
  DISMISS_NOTIFICATION
} from '../actions/notifications'


const initialState = {
  data: []
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      state.data.push({
        id: action.id,
        message: action.message,
        notificationType: action.notificationType,
        autoClear: action.autoClear
      })
      return Object.assign({}, state)
    case DISMISS_NOTIFICATION:
      state.data = _.remove(state.data, (notification) => notification.id === action.id ? false : true)
      return Object.assign({}, state)
    default:
      return state
  }
}
