import React from 'react'

import store from '../../store'
import cc from '../../cc'

const MyAccount = React.createClass({
  cancelSubscription() {
    cc.cancelSubscription()
  },
  render() {
    return (
      <div className="my-account-page">
        <h2 className="name">{store.session.get('name')}</h2>
        <h3 className="email">{store.session.get('email')}</h3>

        <button onClick={this.cancelSubscription} className="filled-btn cancel-btn red">Cancel Subscription</button>
      </div>
    )
  }
})

export default MyAccount
