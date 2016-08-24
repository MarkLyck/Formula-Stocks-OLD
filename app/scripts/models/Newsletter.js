import Backbone from 'backbone'

const Newsletter = Backbone.Model.extend({
  urlRoot: `https://baas.kinvey.com/appdata/kid_rJRC6m9F/newsletter`,
  defaults: {
    email: ''
  }
})

export default Newsletter
