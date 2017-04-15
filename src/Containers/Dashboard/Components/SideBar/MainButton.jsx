import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logOut } from '../../../../actions/session'
import store from '../../../../rstore'

class MainButton extends React.Component {
  select() {
    if (this.props.select) {
      this.props.select(this.props.title.toLowerCase())
    } else if (this.props.title.toLowerCase() === "log out") {
      this.props.actions.logOut()
    } else if (this.props.title.toLowerCase() === "support") {
      window.Intercom("boot", {
        app_id: "i194mpvo",
        email: store.getState().session.email,
        name: store.getState().session.name
      })
      window.Intercom('showNewMessage')
    }
  }

  render() {
    return (
      <li className={`main-button ${this.props.selected ? 'selected' : ''}`} onClick={this.select.bind(this)}>
        <i className={`icon ${this.props.icon}`}>
          { this.props.notification ? <div className="notification-icon">{this.props.notification}</div> : ''}
        </i>
        <h4>{this.props.title}</h4>
      </li>
    )
  }
}

function mapDispatchToProps(dispatch) {
  const actions = { logOut }
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(null, mapDispatchToProps)(MainButton)
