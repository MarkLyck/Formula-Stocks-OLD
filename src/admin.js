import $ from 'jquery'
import store from './store'

import Visits from './collections/Visits'
import NewsletterSubs from './collections/NewsletterSubs'

let admin = {
  visits: new Visits(),
  newsletterSubs: new NewsletterSubs(),
  file: {},
  fileID: '',
  articleID: '',
  model: {},
  images: [],
  filesToUpload: 0,
  filesUploaded: 0,
  uploadImage(file, model) {
    return new Promise((resolve, reject) => {
      let fileID = ''
      this.postToKinveyFile(file)
        .then((KinveyFile) => {
          fileID = KinveyFile._id
          this.putToGoogle(file, KinveyFile)
            .then(this.putToKinveyCollection.bind(this, model, fileID))
            .then(this.getFromKinveyCollection.bind(this))
            .then((article) => {
              console.log('ARTICLE: ', article);
              resolve(article)
            })
        })
    })
  },
  postToKinveyFile(file) {
    return $.ajax({
      url: `https://baas.kinvey.com/blob/kid_rJRC6m9F?tls=true`,
      type: 'POST',
      headers: {
        Authorization: `Kinvey ${store.session.get('authtoken')}`,
        "X-Kinvey-Content-Type": file.type
      },
      data: JSON.stringify({
        _public: true,
        mimeType: file.type
      }),
      contentType: 'application/json',
    })
  },
  putToGoogle(file, KinveyFile) {
    return $.ajax({
      url: KinveyFile._uploadURL,
      type: 'PUT',
      headers: KinveyFile._requiredHeaders,
      contentLength: file.size,
      data: file,
      processData: false,
      contentType: false
    })
  },
  putToKinveyCollection(model, fileID) {
    let newModel = model.toJSON()
    this.articleID = newModel._id

    newModel.images.push({
      _type: 'KinveyFile',
      _id: fileID
    })

    return $.ajax({
      url: `https://baas.kinvey.com/appdata/kid_rJRC6m9F/articles/${newModel._id}`,
      type: 'PUT',
      data: JSON.stringify(newModel),
      contentType: 'application/json'
    })
  },
  getFromKinveyCollection(article) {
    console.log('article from FromKinvey: ', article);
    return $.ajax(`https://baas.kinvey.com/appdata/kid_rJRC6m9F/articles/${article._id}`)
  }
}


export default admin
