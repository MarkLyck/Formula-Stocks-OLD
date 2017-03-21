import React from 'react'
import store from '../../../../store'

class MainButton extends React.Component {
  select() {
    if (this.props.select) {
      this.props.select(this.props.title.toLowerCase())
    } else if (this.props.title.toLowerCase() === "log out") {
      store.session.logout()
    } else if (this.props.title.toLowerCase() === "support") {
      window.Intercom("boot", {
        app_id: "i194mpvo",
        email: store.session.get('email'),
        name: store.session.get('name')
      })
      window.Intercom('showNewMessage')
    }
  }

  render() {
    return (
      <li className={`main-button ${this.props.selected ? 'selected' : ''}`} onClick={this.select.bind(this)}>
        <i className={`icon ${this.props.icon}`}></i>
        <h4>{this.props.title}</h4>
      </li>
    )
  }
}

export default MainButton
