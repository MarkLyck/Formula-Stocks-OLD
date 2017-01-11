import Backbone from 'backbone'

const MDArticle = Backbone.Model.extend({
  urlRoot: `https://baas.kinvey.com/appdata/kid_rJRC6m9F/mdarticles`,
  idAttribute: '_id',
  defaults: {
    content: {}
  }
})

export default MDArticle
