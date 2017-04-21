import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchVisitsCount } from '../../../../actions/visits'
import { fetchUsers } from '../../../../actions/admin'
import UserList from './UserList'
import Headers from '../Headers'

class Users extends React.Component {
  componentDidMount() {
    this.props.actions.fetchVisitsCount()
    this.props.actions.fetchUsers()
  }

  render() {
    const { actions, users, visitsCount } = this.props
    return (
      <div className="users">
        <Headers visitsCount={visitsCount} users={users} fetchVisitsCount={actions.fetchVisitsCount} fetchUsers={actions.fetchUsers}/>
        <div className="user-list-container">
          <UserList users={users}/>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { admin, visits } = state
  const { users } = admin
  const { visitsCount } = visits
  return { users, visitsCount }
}

function mapDispatchToProps(dispatch) {
  const actions = { fetchVisitsCount, fetchUsers }
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
