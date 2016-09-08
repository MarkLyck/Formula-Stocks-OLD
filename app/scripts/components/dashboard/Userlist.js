import React from 'react'
import $ from 'jquery'
import _ from 'underscore'
import moment from 'moment'

const Userlist = React.createClass({
  getInitialState() {
    return {users: []}
  },
  componentDidMount() {
    $.ajax(`https://baas.kinvey.com/user/kid_rJRC6m9F/`)
    .then((r) => {
      this.setState({users: r})
    })
  },
  render() {
    let sortedUsers = _.sortBy(this.state.users, (user) => {
      return user.type
    }).reverse()

    let userlist = sortedUsers.map((user, i) => {

      if (user.username === 'anom' || user.username === 'demo@formulastocks.com') {
        return undefined;
      }

      let type = "Trial"
      if (user.type === 1) {
        type = "Basic"
      } else if (user.type === 2) {
        type = "Premium"
      } else if (user.type === 3) {
        type = "Business"
      } else if (user.type === 4) {
        type = "Fund"
      } else if (user.type === 5) {
        type = "Admin"
      } else if (user.type === -1) {
        type = "Unsubscribed"
      }

      return (
        <tbody key={i} className="user">
          <tr>
            <td>{user.email}</td>
            <td>{moment(user._kmd.lmt).fromNow()}</td>
            <td>{user.location.ip}</td>
            <td>{type}</td>
          </tr>
        </tbody>
      )
    })

    return (
      <table className="user-list">
        <thead className="labels">
          <tr>
            <th>Email</th>
            <th>Last Seen</th>
            <th>IP</th>
            <th>Type</th>
          </tr>
        </thead>
        {userlist}
      </table>
    )
  }
})

export default Userlist
