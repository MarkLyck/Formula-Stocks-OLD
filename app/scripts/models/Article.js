import Backbone from 'backbone'

const Article = Backbone.Model.extend({
  urlRoot: `https://baas.kinvey.com/appdata/kid_rJRC6m9F/articles`,
  idAttribute: '_id',
  defaults: {
    content: {}
  }
})

export default Article
