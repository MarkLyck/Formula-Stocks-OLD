import React from 'react'
import _ from 'underscore'
import User from './User'
import '../styles/userList.css'

class Userlist extends React.Component {
  constructor(props) {
    super(props)

    this.state = { users: this.props.users, sortBy: 'signup' }
  }

  render() {
    let sortedUsers = _.sortBy(this.props.users, (user) => user._kmd.ect).reverse()

    let userlist = sortedUsers.map((user, i) => {
      if (user.username === 'anom' || user.type === 5) { return undefined }
      return <User user={user} key={i}/>
    })

    return (
      <table className="user-list">
        <thead className="labels">
          <tr>
            <th>Email</th>
            <th>Signed up</th>
            <th>Last Seen</th>
            <th>Type</th>
            <th></th>
          </tr>
        </thead>
        {userlist}
      </table>
    )
  }
}

export default Userlist
