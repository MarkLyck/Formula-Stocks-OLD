import Backbone from 'backbone'

import NewsletterSub from '../models/Newsletter'

const NewsletterSubs = Backbone.Collection.extend({
  url: `https://baas.kinvey.com/appdata/kid_rJRC6m9F/newsletter`,
  model: NewsletterSub
})

export default NewsletterSubs
