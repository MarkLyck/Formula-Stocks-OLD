import Backbone from 'backbone'
import MDArticle from '../models/MDArticle'

const MDArticles = Backbone.Collection.extend({
  url: `https://baas.kinvey.com/appdata/kid_rJRC6m9F/mdarticles`,
  model: MDArticle
})

export default MDArticles
