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
      this.set('location', r)
      this.set('type', type || -1)
      if (!localStorage.getItem('visitorID')) {
        this.save(null, {
          url: `https://baas.kinvey.com/appdata/kid_rJRC6m9F/visits`,
          type: 'POST',
          success: (r) => {
            console.log('response: ', r);
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
          success: (r) => {
            // console.log('updated visit: ', r);
          },
          error: (e) => {
            console.error('failed putting visit: ', e)
          }
        })
        // console.log('already visited');
      }

    })
  }
})

export default Visit
