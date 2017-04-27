/* eslint-disable */
import store from '../../store'
import moment from 'moment'

export function isAllowedToView(plan) {
  const demoAccounts = [ 'demo@formulastocks.com', 'mads@m2film.dk' , 'falster@lp.dk', 'jmiller@ecamail.com']
  if (demoAccounts.indexOf(store.getState().session.email) > -1) { return true }

  if (store.getState().session.stripe.subscriptions) {
    if (store.getState().session.stripe.subscriptions.data) {
      if (store.getState().session.stripe.subscriptions.data[0]) {
        if (store.getState().session.stripe.subscriptions.data[0].canceled_at) {
          if (store.getState().session.stripe.subscriptions.data[0].current_period_end < moment().unix()) {
            return false
          }
        }
      }
    }
  }

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


export function adjustBrightness(col, amt) {
    var usePound = true
    if (col[0] === "#") {
        col = col.slice(1)
        usePound = true
    }
    var R = parseInt(col.substring(0,2),16)
    var G = parseInt(col.substring(2,4),16)
    var B = parseInt(col.substring(4,6),16)
    R += amt
    G += amt
    B += amt
    if (R > 255) R = 255
    else if (R < 0) R = 0
    if (G > 255) G = 255
    else if (G < 0) G = 0
    if (B > 255) B = 255
    else if (B < 0) B = 0
    var RR = ((R.toString(16).length===1)?"0"+R.toString(16):R.toString(16))
    var GG = ((G.toString(16).length===1)?"0"+G.toString(16):G.toString(16))
    var BB = ((B.toString(16).length===1)?"0"+B.toString(16):B.toString(16))
    return (usePound?"#":"") + RR + GG + BB;
}
