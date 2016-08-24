import React from 'react'

import store from '../../store'

const Notification = React.createClass({
  dismiss() {
    store.session.set('notification', false)
  },
  render() {
    return (
      <div className={`notification ${this.props.type}`}>
        <p>{this.props.text}</p>
        <button className="dismiss" onClick={this.dismiss}><i className="fa fa-times" aria-hidden="true"></i></button>
      </div>
    )
  }
})

export default Notification
