import React from 'react'
import $ from 'jquery'
import moment from 'moment'
import store from '../../../../store'

class User extends React.Component {

  constructor(props) {
    super(props)

    this.toggleActions = this.toggleActions.bind(this)
    this.renderActions = this.renderActions.bind(this)
    this.updateUser = this.updateUser.bind(this)

    this.state = { actions: false }
  }



  updateUser() {
    $.ajax({
      type: 'POST',
      url: `https://baas.kinvey.com/rpc/${store.settings.appKey}/custom/getcustomer`,
      data: {
        customer: this.props.user.stripe.id
      }
    })
    .then(customer => {
      let newUser = this.props.user
      newUser.stripe = customer
      $.ajax({
        type: 'PUT',
        url: `https://baas.kinvey.com/user/kid_rJRC6m9F/${this.props.user._id}`,
        data: newUser
      })
      .then(response => console.log(response))
      .catch(e => console.error(e))
    })
    .catch(e => console.error(e))
  }

  toggleActions() {
    this.setState({ actions: !this.state.actions })
  }

  renderActions() {
    if (!this.state.actions) { return '' }
    else return (
      <div className="actions">
        <button onClick={this.updateUser}>Update</button>
      </div>
    )
  }

  render() {
    let type = "Trial"
    if (this.props.user.username === 'demo@formulastocks.com') {
      type = "Demo"
    } else if (this.props.user.type === 1 && this.props.user.stripe) {
      if (this.props.user.stripe.subscriptions.total_count) {
        if (this.props.user.stripe.subscriptions.data[0].status !== 'trialing') {
          type = "Basic"
        }
      }
    } else if (this.props.user.type === 2) {
      type = "Premium"
    } else if (this.props.user.type === 3) {
      type = "Business"
    } else if (this.props.user.type === 4) {
      type = "Fund"
    } else if (this.props.user.type === -1) {
      type = "Unsubscribed"
    }
    if (this.props.user.stripe) {
      if (this.props.user.stripe.subscriptions.data) {
        if (this.props.user.stripe.subscriptions.data[0].canceled_at && this.props.user.username !== 'demo@formulastocks.com') {
          type = "Cancelled"
        }
      }
    }

    return (
      <tbody className="user">
        <tr>
          <td>{this.props.user.email}</td>
          <td>{moment(this.props.user._kmd.ect).format('MM/DD/YYYY')}</td>
          <td>{moment(this.props.user.lastSeen).fromNow()}</td>
          <td className={type.toLowerCase()}>{type}</td>
          <td className="settings">
            <i className="fa fa-cog" aria-hidden="true" onClick={this.toggleActions}/>
            {this.renderActions()}
          </td>
        </tr>
      </tbody>
    )
  }
}

export default User
