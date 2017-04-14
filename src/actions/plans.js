import store from '../rstore'
export const FETCHING_PLAN = 'FETCHING_PLAN'
export const RECEIVE_PLAN = 'RECEIVE_PLAN'
export const SELECT_NEW_PLAN = 'SELECT_NEW_PLAN'


export function fetchPlanIfNeeded(plan) {
  return (dispatch) => {
    if (window.location.pathname.indexOf('dashboard') > -1) {
      if (store.getState().plans.data[plan]) {
        if (store.getState().plans.data[plan].suggestions.length && store.getState().plans.data[plan].portfolio.length) {
          dispatch({ type: "PLAN_ALREADY_EXISTS" })
          return false
        }
      }
      dispatch(fetchPlan(plan, 'private'))
    } else if (store.getState().plans.data[plan]) {
      dispatch({ type: "PLAN_ALREADY_EXISTS" })
      return false
    }
    dispatch(fetchPlan(plan, 'public'))
  }
}

export function fetchPlan(plan, type) {
  return (dispatch) => {
    dispatch(fetchingPlan(plan))
    fetch(`https://formulastocks-server.tk:3001/${type}/${plan}`)
      .then(response => response.json())
      .then(json => dispatch(receivePlan(plan, json)))
  }
}
function fetchingPlan(plan) { return { type: FETCHING_PLAN, plan } }
function receivePlan(plan, json) {
  return { type: RECEIVE_PLAN, plan: plan, data: json }
}


export function selectNewPlan(plan) {
  return (dispatch) => {
    dispatch(fetchPlanIfNeeded(plan))
    dispatch({ type: SELECT_NEW_PLAN, plan: plan })
  }
}
