import React from 'react'
import store from '../../../../store'
import './notification.css'

const dismissNotification = () => {
  store.session.set('notification', false)
}

const Notification = ({ text, type }) => (
  <div className={`notification ${type}`}>
    <p>{text}</p>
    <button className="dismiss" onClick={dismissNotification}>
      <i className="fa fa-times" aria-hidden="true"></i>
    </button>
  </div>
)

export default Notification
