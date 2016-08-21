import Backbone from 'backbone'

import Article from '../models/Article'

const Articles = Backbone.Collection.extend({
  url: `https://baas.kinvey.com/appdata/kid_rJRC6m9F/articles`,
  model: Article
})

export default Articles
