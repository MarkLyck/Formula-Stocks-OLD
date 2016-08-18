import $ from 'jquery'
import Backbone from 'backbone'
import {hashHistory} from 'react-router'

import store from '../store'

const Session = Backbone.Model.extend({
  urlRoot: `https://baas.kinvey.com/user/kid_rJRC6m9F/login`,
  idAttribute: '_id',
  defaults: {
    email: '',
    name: '',
    stripe: {},
    type: 0
  },
  parse: function(response) {
    if (response) {
      return {
        authtoken: response._kmd.authtoken,
        email: response.username,
        userId: response._id,
        name: response.name,
        stripe: response.stripe,
        type: response.type
        // plan: response.stripe.subscriptions.data[0].plan.
      }
    }
  },
  login: function(username, password) {
    return new Promise((resolve, reject) => {
      this.save({username: username, password: password},
      {
        success: (model, response) => {
          console.log(response._kmd.authtoken);
          localStorage.authtoken = response._kmd.authtoken
          this.unset('password')
          this.set('showModal', false)
          resolve()
          store.settings.history.push('/dashboard')
        },
        error: function(model, response) {
          console.log('ERROR: Login failed: ', response.responseText);
          if (response.responseText.indexOf('IncompleteRequestBody') !== -1) {
            if (username === '') {
              reject('Email missing')
            } else {
              reject('Password missing')
            }
          } else if (response.responseText.indexOf('InvalidCredentials') !== -1) {
            reject('Wrong email or password')
          }
        }
      })
    })
  },
  signup: function(email, password) {
    store.session.save({
      username: email,
      password: password
    },
    {
      url: `https://baas.kinvey.com/user/${store.settings.appKey}/`,
      success: function(model, response) {
        model.unset('password')
        localStorage.authtoken = response._kmd.authtoken
        store.settings.history.push('/dashboard')
      },
      error: function(model, response) {
        console.log('ERROR: ', arguments);
      }
    })
  },
  logout: function() {
    $.ajax({
      type: 'POST',
      url: `https://baas.kinvey.com/user/${store.settings.appKey}/_logout`,
    })
    localStorage.removeItem('authtoken')
    this.clear()
    store.settings.history.push('/')
  },
  retrieve: function() {
    this.fetch({
      url: `https://baas.kinvey.com/user/${store.settings.appKey}/_me`,
      success: function() {
        // console.log('fetched user: ', store.session);
      },
      error: function(response) {
        throw new Error('FETCHING USER FAILED!')
      }
    })
  },
  updateUser: function() {
    this.save(null, {
      type: 'PUT',
      url: `https://baas.kinvey.com/user/${store.settings.appKey}/${this.get('userId')}`,
    }, {silent: true})
  },
  validateNewUser: function(user) {
    return new Promise((resolve, reject) => {
      if(!this.validateName(user.name)) {
        reject('Please enter your first and last name')
      } else if (!this.validateEmail(user.email)) {
        reject('Please enter a valid email address')
      } else if (this.validatePasswords(user.password, user.verifyPassword) === 'no pass') {
        reject('Please enter a password')
      } else if (this.validatePasswords(user.password, user.verifyPassword) === 'not long enough') {
        reject('Password must be at least 6 characters long')
      } else if (this.validatePasswords(user.password, user.verifyPassword) === 'no match') {
        reject('Passwords doesn\'t match')
      } else {
        resolve()
      }
    })
  },
  validateName: function(name) {
    if (name.length === 0 || name.indexOf(' ') === -1) {
      return false
    } else {
      return true
    }
  },
  validateEmail: function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },
  validatePasswords: function(pass, verifyPass) {
    if (pass.length === 0) {
      return 'no pass'
    } else if (pass.length <= 5) {
      return 'not long enough'
    } else if (pass !== verifyPass) {
      return 'no match'
    } else {
      return true
    }
  },
  isAllowedToView(plan) {
    let type = 5
    if (plan === 'basic')         { type = 1 }
    else if (plan === 'premium')  { type = 2 }
    else if (plan === 'business') { type = 3 }
    else if (plan === 'fund')     { type = 4 }

    if (this.get('type') === 4 && type !== 4) {
      return false
    } else if (this.get('type') >= type) {
      return true
    } else {
      return false
    }
  }
})

export default Session
