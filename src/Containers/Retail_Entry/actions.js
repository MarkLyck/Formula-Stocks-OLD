export const FETCHING_PUBLIC_PLAN = 'FETCHING_PUBLIC_PLAN'
export const RECEIVE_PUBLIC_PLAN = 'RECEIVE_PUBLIC_PLAN'


function fetchingPublicPlan(plan) {
  return {
    type: FETCHING_PUBLIC_PLAN,
    plan
  }
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
