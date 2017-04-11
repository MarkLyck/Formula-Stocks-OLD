/* eslint-disable */
import store from '../../rstore'

export function isAllowedToView(plan) {
  const demoAccounts = [ 'demo@formulastocks.com', 'mads@m2film.dk' ]
  if (demoAccounts.indexOf(store.getState().session.email) > -1) { return true }

  let planLevel = 1
  if (plan === 'premium') { planLevel = 2 }
  if (plan === 'business') { planLevel = 3 }
  if (plan === 'fund') { planLevel = 4 }

  let accountType = store.getState().session.type

  if (accountType >= planLevel && accountType !== 4) {
    return true
  } else if (accountType === planLevel) {
    return true
  } else {
    return false
  }
}


export function formatPrice(value) {
  while(/(\d+)(\d{3})/.test(value.toString())) {
    value = value.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2')
  }
  let price = value
  if (Number(value.replace(',','')) > 0) { price = '+' + price }
  return price
}
