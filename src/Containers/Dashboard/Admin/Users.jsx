import React from 'react'
import UserList from './UserList'
import Headers from './Headers'

class Users extends React.Component {
  render() {
    return (
      <div className="users">
        <Headers/>
        <div className="user-list-container">
          <UserList/>
        </div>
      </div>
    )
  }
}

export default Users
