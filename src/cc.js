/* eslint-disable */

import $ from 'jquery'
import _ from 'lodash'

import store from './OLD_store'
import rstore from './store'
import countries from './data/countries'

let cc = {
  commafy: function(num){
    var parts = (''+(num<0?-num:num)).split("."), s=parts[0], L, i=L= s.length, o=''
    while(i--){ o = (i===0?'':((L-i)%3?'':','))
                    +s.charAt(i) +o }
    return (num<0?'-':'') + o + (parts[1] ? '.' + parts[1] : '')
  },
  validateNewLocation(country, city, zip, address) {
    return new Promise((resolve, reject) => {
      if (!country) {
        reject('No country selected')
      } else if (!city) {
        reject('Please enter a city')
      } else if (!zip) {
        reject('Please enter postal code')
      } else if (!address) {
        reject('Please enter street address')
      } else {
        store.session.set('address', {
          country: country,
          city: city,
          zip: zip,
          address: address
        })
        resolve()
      }
    })
  },
  calculateTax(countryCode) {
    return new Promise((resolve, reject) => {
      let country = _.where(countries, { value: countryCode })
      if (country[0].taxPercent) {
        resolve(country[0].taxPercent)
      } else {
        resolve(0)
      }
    })
  },
  ccFormat: function(input) {
    let v = input.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    let matches = v.match(/\d{4,16}/g)
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
    if (v.length > 4) {
      let parts = v.split('')
      parts.splice(2, 1)
      v = parts.join('')
    }
    return v
  },
  checkPayment: function(card) {
    return new Promise((resolve, reject) => {
      if (String(card.number).split('').length < 16) {
        reject('Invalid card number')
      } else {
        Stripe.setPublishableKey('pk_live_UTFEdLHeTQIAA0o2JSBM3fwL')
        Stripe.card.createToken({
          number: card.number,
          cvc: card.cvc,
          exp_month: card.month,
          exp_year: card.year
        }, (status, response) => {
          if (status === 200) {
            resolve(response.id)
          } else if (response.error.message.indexOf('exp_year') !== -1) {
            reject('Missing expiry year')
          } else {
            reject(response.error.message)
          }
        })
      }
    })
  },
  createCustomer2: function(token, planName, cycle, taxPercent, coupon) {
    return new Promise((resolve, reject) => {
      let data = {
        plan: (planName+'-'+cycle.trim()),
        source: token,
        email: store.session.get('email'),
        tax_percent: taxPercent
      }
      // const url = `https://baas.kinvey.com/rpc/${store.settings.appKey}/custom/charge`
      const url = `https://h8pzebl60b.execute-api.us-west-2.amazonaws.com/prod/createCustomer`
      if (coupon) { data.coupon = coupon }
      $.ajax({
        type: "POST",
        url: url,
        crossDomain: true,
        dataType: 'json',
        contentType: "application/json",
        data: JSON.stringify(data),
        success: (customer) => {
          store.session.set('stripe', customer)

          let type = 0
          if (planName === 'basic')         { type = 1 }
          else if (planName === 'premium')  { type = 2 }
          else if (planName === 'business') { type = 3 }
          else if (planName === 'fund')     { type = 4 }
          store.session.set('type', type)
          store.session.signup2()
          resolve()
        },
        error: (response) => {
          console.error('error: ', response)
          reject(JSON.parse(response.responseText).error)
        }
      })
    })
  },
  cancelSubscription() {
    $.ajax({
      type: 'POST',
      url: `https://baas.kinvey.com/rpc/${store.settings.appKey}/custom/cancelsub`,
      data: {
        subId: store.session.get('stripe').subscriptions.data[0].id
      },
      success: (subscription) => {

        let customer = store.session.get('stripe')
        customer.subscriptions = { data: [subscription] }
        store.session.set('stripe', customer)

        store.session.updateUser()
      },
      fail: (e) => {
        console.error('failed cancelation: ', e)
      }
    })
  },
  updateSubscription(planName, cycle) {
    return new Promise((resolve, reject) => {
      if (planName !== store.session.get('stripe').subscriptions.data[0].plan.metadata.plan_name) {
        $.ajax({
          type: 'POST',
          url: `https://baas.kinvey.com/rpc/${store.settings.appKey}/custom/updatesub`,
          data: {
            plan: (planName+'-'+cycle),
            subId: store.session.get('stripe').subscriptions.data[0].id
          },
          success: (subscription) => {
            console.log('successfully changed subscription: ', subscription);

            let customer = store.session.get('stripe')
            customer.subscriptions = {data: [subscription]}
            store.session.set('stripe', customer)

            let type = 0
            if (planName === 'basic')         { type = 1 }
            else if (planName === 'premium')  { type = 2 }
            else if (planName === 'business') { type = 3 }
            else if (planName === 'fund')     { type = 4 }
            store.session.set('type', type)

            store.session.updateUser()
            resolve()
          },
          fail: (e) => {
            console.error('failed changing subscription: ', e)
            reject(e)
          }
        })
      }
    })
  },
  newSubscription(planName, cycle) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'POST',
        url: `https://baas.kinvey.com/rpc/${store.settings.appKey}/custom/newsub`,
        data: {
          plan: (planName+'-'+cycle),
          customer: store.session.get('stripe').sources.data[0].customer
        },
        success: (subscription) => {
          console.log('successfully created new subscription: ', subscription)

          let customer = store.session.get('stripe')
          customer.subscriptions = {data: [subscription]}
          store.session.set('stripe', customer)

          let type = 0
          if (planName === 'entry')         { type = 1 }
          else if (planName === 'premium')  { type = 2 }
          else if (planName === 'business') { type = 3 }
          else if (planName === 'fund')     { type = 4 }
          store.session.set('type', type)

          store.session.updateUser()
          resolve()
        },
        fail: (e) => {
          console.error('failed creating subscription: ', e)
          reject()
        }
      })
    })

  }
}

export default cc
