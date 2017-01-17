import React from 'react'
import $ from 'jquery'
import UserList from './UserList'
import Headers from '../Headers'

class Users extends React.Component {
  constructor(props) {
    super(props)

    this.state = { users: []}
  }

  componentDidMount() {
    $.ajax(`https://baas.kinvey.com/user/kid_rJRC6m9F/`)
    .then((r) => {
      this.setState({ users: r })
    })
  }

  render() {
    return (
      <div className="users">
        <Headers/>
        <div className="user-list-container">
          <UserList users={this.state.users}/>
        </div>
      </div>
    )
  }
}

export default Users
