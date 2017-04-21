import { anomToken } from '../store'

export const FETCHING_USERS = 'FETCHING_USERS'
export const RECEIVE_USERS = 'RECEIVE_USERS'

export function fetchUsers() {
  return (dispatch) => {
    dispatch(fetchingUsers())

    let fetchHeaders = new Headers();
    const authToken = localStorage.getItem('authtoken') ? localStorage.authtoken : anomToken
    fetchHeaders.append('Authorization', `Kinvey ${authToken}`)
    let options = { method: 'GET', headers: fetchHeaders }

    fetch(`https://baas.kinvey.com/user/kid_rJRC6m9F/`, options)
      .then(response => response.json())
      .then(json => dispatch(receiveUsers(json)))
  }
}
function fetchingUsers() { return { type: FETCHING_USERS } }
function receiveUsers(json) { return { type: RECEIVE_USERS, data: json } }
