import Backbone from 'backbone'

import $ from 'jquery'

const Visit = Backbone.Model.extend({
  url: `https://baas.kinvey.com/appdata/kid_rJRC6m9F/visits`,
  defaults: {
    device: '',
    location: {},
    browser: '',
    type: -1
  },
  getData(type) {
    $.ajax('https://freegeoip.net/json/')
    .then((r) => {
      this.set('location', r)
      this.set('type', type || -1)
      this.save()
    })
  }
})

export default Visit
