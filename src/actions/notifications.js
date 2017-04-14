export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION'
export const DISMISS_NOTIFICATION = 'DISMISS_NOTIFICATION'

export function showNotification(message, notificationType = 'message', autoClear = true) {
  return function(dispatch) {
    const notificationID = Date.now()
    if (notificationType === 'error') { autoClear = false }
    dispatch({
      type: SHOW_NOTIFICATION,
      id: notificationID,
      message: message,
      notificationType: notificationType,
      autoClear: autoClear
    })
    if (autoClear) { setTimeout(() => dispatch(dismissNotification(notificationID)), 30000) }
  }
}

export function dismissNotification(notificationID) {
  return { type: DISMISS_NOTIFICATION, id: notificationID }
}
