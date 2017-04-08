import $ from 'jquery'
import Backbone from 'backbone'
import moment from 'moment'
import platform from 'platform'
import store from '../store'

import Visit from './Visit'

const Session = Backbone.Model.extend({
  urlRoot: `https://baas.kinvey.com/user/kid_rJRC6m9F/login`,
  idAttribute: '_id',
  defaults: {
    email: '',
    name: '',
    stripe: '',
    location: '',
    address: '',
    referer: '',
    type: 0,
    lastSeenSuggestions: new Date(),
    lastSeen: new Date(),
    visits: 0,
    browser: platform.name,
    os: platform.os.family,
    product: platform.product,
    device: '',
    cancelReason: ''
  },
  parse: function(response) {
    if (response) {
      return {
        authtoken: response._kmd.authtoken,
        email: response.username,
        userId: response._id,
        name: response.name,
        stripe: response.stripe,
        type: response.type,
        location: response.location,
        address: response.address,
        referer: response.referer,
        visits: response.visits,
        cancelReason: response.cancelReason
      }
    }
  },
  login: function(username, password) {
    return new Promise((resolve, reject) => {
      this.save({ username: username, password: password },
      {
        success: (model, response) => {
          localStorage.authtoken = response._kmd.authtoken
          this.unset('password')
          this.set('showModal', false)
          resolve()
          if (store.session.get('username') !== 'anom') {
            this.set('lastSeen', new Date())
            this.updateUser()
          }
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
  signup2: function() {
    const email = this.get('email')
    const password = this.get('password')
    const address = this.get('address')
    const name = this.get('name')

    store.session.save({
      _acl: {
        r: [ '57d838197909a93d3863ceef', '57bdf1db65033d3044e27fa2' ],
        w: [ '57d838197909a93d3863ceef', '57bdf1db65033d3044e27fa2' ]
      },
      username: email,
      password: password,
      address: address,
      referer: document.referrer
    },
    {
      url: `https://baas.kinvey.com/user/${store.settings.appKey}/`,
      success: function(model, response) {
        model.unset('password')
        localStorage.authtoken = response._kmd.authtoken
        store.settings.history.push('/dashboard')
        window.Intercom("update", {
          name: name,
          email: email,
          created_at: moment().unix()
        })
      },
      error: function(model, response) {
        console.error('ERROR: ', arguments)
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
    this.set('authtoken', store.settings.anomToken)
    this.set('location', {})
    this.set('type', 0)
    this.set('email', '')
    this.set('stripe', {})
    window.Intercom("shutdown")
  },
  retrieve: function() {
    this.fetch({
      url: `https://baas.kinvey.com/user/${store.settings.appKey}/_me`,
      success: () => {
        let visit = new Visit()
        visit.getData(this.get('type'))
        if (store.session.get('username') !== 'anom') {
          this.set('lastSeen', new Date())
          this.updateUser()
        }
      },
      error: function(response) {
        throw new Error('FETCHING USER FAILED!')
      }
    })
  },
  updateUser: function() {
    if (this.get('username') !== 'anom') {
      this.save(null, {
        type: 'PUT',
        url: `https://baas.kinvey.com/user/${store.settings.appKey}/${this.get('userId')}`,
      }, { silent: true })
    }
  },
  isAllowedToView(plan) {
    if (this.get('email') === 'demo@formulastocks.com' || this.get('email') === 'mads@m2film.dk') {
      return true
    }
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
  },
  deviceType() {
    var isMobile = false
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)))
    isMobile = true

    return isMobile ? 'mobile' : 'desktop'
  },
})

export default Session
