import store from '../rstore'
import moment from 'moment'
export const FETCHING_USERS = 'FETCHING_USERS'
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const FETCHING_VISITS = 'FETCHING_VISITS'
export const RECEIVE_VISITS = 'RECEIVE_VISITS'
export const RECEIVE_VISITS_COUNT = 'RECEIVE_VISITS_COUNT'

let fetchHeaders = new Headers();
const authToken = localStorage.getItem('authtoken') ? localStorage.authtoken : store.getState().settings.anomToken
fetchHeaders.append('Authorization', `Kinvey ${authToken}`)
let options = { method: 'GET', headers: fetchHeaders }

export function fetchVisits() {
  return (dispatch) => {
    dispatch(fetchingVisits())
    fetch(`https://baas.kinvey.com/appdata/kid_rJRC6m9F/visits?query={"_kmd.ect":{"$gte": "${moment().subtract(1, 'months').format('YYYY-MM-DD')}T00:00:00.000Z"}}&sort={"_kmd.ect": 1}`, options)
      .then(response => response.json())
      .then(json => dispatch(receiveVisits(json)))
  }
}
function fetchingVisits() { return { type: FETCHING_VISITS } }
function receiveVisits(json) { return { type: RECEIVE_VISITS, data: json } }

export function fetchVisitsCount() {
  return (dispatch) => {
    fetch(`https://baas.kinvey.com/appdata/kid_rJRC6m9F/visits/_count`, options)
      .then(response => response.json())
      .then(json => dispatch(receiveVisitsCount(json)))
  }
}
function receiveVisitsCount(json) { return { type: RECEIVE_VISITS_COUNT, data: json } }

export function fetchUsers() {
  return (dispatch) => {
    dispatch(fetchingUsers())
    fetch(`https://baas.kinvey.com/user/kid_rJRC6m9F/`, options)
      .then(response => response.json())
      .then(json => dispatch(receiveUsers(json)))
  }
}
function fetchingUsers() { return { type: FETCHING_USERS } }
function receiveUsers(json) { return { type: RECEIVE_USERS, data: json } }
