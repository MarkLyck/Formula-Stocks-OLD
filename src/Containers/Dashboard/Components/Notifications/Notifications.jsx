import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { dismissNotification } from '../../../../actions/notifications'
import Notification from './Notification'
import './notification.css'

const Notifications = ({ notifications, actions }) => {
  return (
    <ul className="notifications">
      {notifications.data.map(notification => <Notification
                                            notification={notification}
                                            key={notification.id}
                                            dismissNotification={actions.dismissNotification}/>)}
    </ul>
  )
}

function mapStateToProps(state) {
  const { notifications } = state
  return { notifications }
}

function mapDispatchToProps(dispatch) {
  const actions = { dismissNotification }
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
