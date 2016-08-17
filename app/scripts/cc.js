import $ from 'jquery'
import _ from 'underscore'

import store from './store'

let cc = {
  commafy: function(num){
    var parts = (''+(num<0?-num:num)).split("."), s=parts[0], L, i=L= s.length, o='';
    while(i--){ o = (i===0?'':((L-i)%3?'':','))
                    +s.charAt(i) +o }
    return (num<0?'-':'') + o + (parts[1] ? '.' + parts[1] : '');
  },
  ccFormat: function(input) {
    let v = input.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    let matches = v.match(/\d{4,16}/g);
    let match = matches && matches[0] || ''
    let parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  },
  dateFormat: function(e, input) {
    let v = input
    if (e.which !== 8) {
      v = input.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
      if (v.length === 1 && v > 1) {
        v = '0' + v
      }
      if (v.length === 2) {
        if (v > 12) {
          let parts = v.split('')
          parts.splice(1, 1)
          v = parts.join('')
        } else {
          v = v + ' / '
        }
      } else if (v.length > 2) {
        let parts = v.split('')
        parts.splice(2, 0, ' / ')
        v = parts.join('')
      }
      if (v.length > 7) {
        let parts = v.split('')
        parts.splice(6, 1)
        v = parts.join('')
      }
    } else {
      if (v.length === 4) {
        let parts = v.split('')
        parts = _.without(parts, '/')
        parts = _.without(parts, ' ')
        parts.splice(1, 1)
        v = parts.join('')
      }

      if (v.length > 2) {
        let parts = v.split('')
        parts = _.without(parts, '/')
        parts = _.without(parts, ' ')
        parts.splice(2, 0, ' / ')
        v = parts.join('')
      }
    }
    return v
  },
  cvcFormat: function(input) {
    let v = input.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length > 3) {
      let parts = v.split('')
      parts.splice(2, 1)
      v = parts.join('')
    }
    return v
  },
  checkPayment: function(card) {
    return new Promise((resolve, reject) => {
      Stripe.setPublishableKey('pk_test_hh5vsZ7wNnMi80XJgzHVanEm');
      Stripe.card.createToken({
        number: card.number,
        cvc: card.cvc,
        exp_month: card.month,
        exp_year: card.year
      }, (status, response) => {
        if (status === 200) {
          resolve(response.id)
        } else if (response.error.message.indexOf('required param: exp_year') !== -1) {
          reject('Missing expiry year')
        } else {
          reject(response.error.message)
        }
      });
    })
  },
  createCustomer: function(token, planName, cycle) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'POST',
        url: `https://baas.kinvey.com/rpc/${store.settings.appKey}/custom/charge`,
        data: {
          plan: (planName+'-'+cycle),
          source: token,
          email: store.session.get('email')
        },
        headers: {
          Authorization: 'Kinvey 9dbd2146-9b76-4c06-85a2-70229ac93cbf.3JRWuuAKqMI2ZuoFJI3Ui3SoD5NquLLXhe+wtBYxH28='
        },
        success: (customer) => {
          console.log(customer);

          // let ccInfo = {
          //   last4: customer.sources.data[0].last4,
          //   brand: customer.sources.data[0].brand,
          //   exp_month: customer.sources.data[0].exp_month,
          //   exp_year: customer.sources.data[0].exp_year
          // }
          // let trial = {
          //   trial_start: customer.subscriptions.data[0].trial_start,
          //   trial_end: customer.subscriptions.data[0].trial_end,
          // }
          // let newCustomer = {
          //   tax_percent: customer.subscriptions.data[0].tax_percent,
          //   id: customer.id,
          //   plan: customer.subscriptions.data[0].plan.id,
          //   status: customer.subscriptions.data[0].status,
          //   active_till: customer.subscriptions.data[0].current_period_end,
          //   ccInfo: ccInfo,
          // }
          // let subscription = {
          //   id: customer.subscriptions.data[0]
          // }

          // store.session.set('trial', trial)
          // store.session.set('customer', newCustomer)
          store.session.set('stripe', customer)

          store.session.signup(store.session.get('email'), store.session.get('password'))
          resolve()
        },
        error: (response) => {
          reject(JSON.parse(response.responseText).error)
        }
      })
    })
  },
  cancelSubscription() {
    console.log(store.session.get('stripe').subscriptions.data[0].id);
    $.ajax({
      type: 'POST',
      url: `https://baas.kinvey.com/rpc/${store.settings.appKey}/custom/cancelsub`,
      data: {
        subId: store.session.get('stripe').subscriptions.data[0].id,
        at_period_end: true
      },
      success: (customer) => {
        console.log('successful cancelation: ', customer);
        store.session.set('stripe', customer)
      },
      fail: (e) => {
        console.error('failed cancelation: ', e)
      }
    })
  }
}

export default cc
