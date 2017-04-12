import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchVisits, fetchVisitsCount, fetchUsers } from '../../../../actions/admin'
import UserList from './UserList'
import Headers from '../Headers'

class Users extends React.Component {
  componentDidMount() {
    this.props.actions.fetchVisitsCount()
    this.props.actions.fetchVisits()
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
  const { admin } = state
  const { users, visitsCount } = admin
  return { users, visitsCount }
}

function mapDispatchToProps(dispatch) {
  const actions = { fetchVisits, fetchVisitsCount, fetchUsers }
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
