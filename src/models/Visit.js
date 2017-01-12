import Backbone from 'backbone'
import $ from 'jquery'
import platform from 'platform'
import store from '../store'

const Visit = Backbone.Model.extend({
  url: `https://baas.kinvey.com/appdata/kid_rJRC6m9F/visits`,
  defaults: {
    device: '',
    os: platform.os,
    ip: '',
    location: {},
    browser: platform.name,
    type: -1,
    referer: document.referrer
  },
  getData(type) {
    if (store.session.get('type') === 5)
      return null
    $.ajax('https://freegeoip.net/json/')
    .then((r) => {
      const newLocation = {
        city: r.city,
        country_code: r.country_code,
        country_name: r.country_name,
        ip: r.ip,
        latitude: r.latitude,
        longitude: r.longitude,
        zip_code: r.zip_code
      }
      this.set('location', newLocation)
      this.set('ip', r.ip)
      this.set('device', store.session.deviceType())
      if (platform.os.family) {
        this.set('os', platform.os.family)
      }
      this.set('type', type || -1)
      console.log(this.toJSON())
      store.session.set('location', r)
      if (!localStorage.getItem('visitorID')) {
        this.save(null, {
          url: `https://baas.kinvey.com/appdata/kid_rJRC6m9F/visits`,
          type: 'POST',
          success: (r) => {
            localStorage.visitorID = r.get('_id')
          },
          error: (e) => {
            console.error('failed posting visit: ', e)
          }
        })
      } else {
        this.set('_id', localStorage.visitorID)
        this.save(null, {
          url: `https://baas.kinvey.com/appdata/kid_rJRC6m9F/visits/${localStorage.visitorID}`,
          type: 'PUT',
          success: () => {
            if (store.session.get('username') !== 'anom') {
              store.session.set('location', newLocation)
              store.session.set('lastSeen', new Date())
              store.session.set('device', store.session.deviceType())
              store.session.set('visits', store.session.set('visits') + 1)
              store.session.updateUser()
            }
          },
          error: (e) => {
            console.error('failed putting visit: ', e)
          }
        })
      }
    })
  }
})

export default Visit
