export const FETCHING_PUBLIC_PLAN = 'FETCHING_PUBLIC_PLAN'
export const RECEIVE_PUBLIC_PLAN = 'RECEIVE_PUBLIC_PLAN'
export const FETCHING_DJIA = 'FETCHING_DJIA'
export const RECEIVE_DJIA = 'RECEIVE_DJIA'


function fetchingPublicPlan(plan) {
  return {
    type: FETCHING_PUBLIC_PLAN,
    plan
  }
}

function fetchingDJIA() {
  return { type: FETCHING_DJIA }
}

export function fetchPulicPlan(plan) {
  return (dispatch) => {
    dispatch(fetchingPublicPlan(plan))
    fetch(`https://formulastocks-server.tk:3001/public/${plan}`)
      .then(response => response.json())
      .then(json => dispatch(receivePublicPlan(plan, json)))
  }
}
function receivePublicPlan(plan, json) {
  return {
    type: RECEIVE_PUBLIC_PLAN,
    plan,
    data: json
  }
}

export function fetchDJIA() {
  return (dispatch) => {
    dispatch(fetchingDJIA())
    fetch(`https://www.quandl.com/api/v1/datasets/YAHOO/INDEX_DJI.json?trim_start=2009-01-01&collapse=monthly&column=4&auth_token=6SfHcXos6YBX51kuAq8B`)
      .then(response => response.json())
      .then(json => dispatch(receiveDJIA(json)))
  }
}
function receiveDJIA(json) {
  return {
    type: RECEIVE_DJIA,
    data: json
  }
}
