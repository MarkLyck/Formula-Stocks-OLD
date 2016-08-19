import Backbone from 'backbone'

import $ from 'jquery'

const Visit = Backbone.Model.extend({
  url: `https://baas.kinvey.com/appdata/kid_rJRC6m9F/visits`,
  defaults: {
    device: '',
    location: {},
    browser: '',
    type: -1,

  },
  getData(type) {
    $.ajax('https://freegeoip.net/json/')
    .then((r) => {
      console.log(r.ip);
      let str = r.ip.replace('.', '')
      // this.set('id', r.ip)
      this.set('_id', str)
      this.set('location', r)
      this.set('type', type || -1)
      if (this.get('type') === -1) {
        this.save(null, {
          url: `https://baas.kinvey.com/appdata/kid_rJRC6m9F/visits`,
          type: 'POST',
          error: (e) => {
            console.error('failed posting visit: ', e)
          }
        })
      }

    })
  }
})

export default Visit
