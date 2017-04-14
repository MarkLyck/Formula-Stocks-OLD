import React from 'react'

const Notification = ({ notification, dismissNotification }) => (
  <div className={`notification ${notification.notificationType}`}>
    <p>{notification.message}</p>
    <button className="dismiss" onClick={dismissNotification.bind(null, notification.id)}>
      <i className="fa fa-times" aria-hidden="true"></i>
    </button>
  </div>
)

export default Notification
