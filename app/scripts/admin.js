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
  uploadImage(file, model) {
    return new Promise((resolve, reject) => {
      let fileID = ''
      let KinveyFile;
      this.postToKinveyFile(file)
        // .then(this.putToGoogle.bind(this, file))
        .then((KinveyFile) => {
          fileID = KinveyFile._id
          // console.log('fileID before putTOGoogle: ', fileID);
          // return new Promise((resolve, reject) => {
            this.putToGoogle(file, KinveyFile)
              .then(this.putToKinveyCollection.bind(this, model, fileID))
              .then(this.getFromKinveyCollection.bind(this))
              .then((article) => {
                console.log('ARTICLE: ', article);
                resolve(article)
              })
          // })
        })
        // .then(() => {
        //
        // })
        // .then((article) => {
        //   console.log('article before getFromK: ', article);
        //   this.getFromKinveyCollection(article)
        // })
        // .then((article) => {
        //   console.log('ARTICLE: ', article);
        //   resolve(article)
        // })
    })
  },
  postToKinveyFile(file) {
    return $.ajax({
      url: `https://baas.kinvey.com/blob/kid_rJRC6m9F`,
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
    // this.fileID = kinveyFile._id;
    // console.log('kinveyFile in putToGoogle: ', KinveyFile);
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
    // console.log('in put to kinvey collection');
    // console.log('model: ', model);
    // console.log('fileID: ', fileID);
    // console.log('google: ', google);
    // console.log('args: ', arguments);

    let newModel = model.toJSON()
    this.articleID = newModel._id
    console.log('newModel: ', newModel);

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
    console.log('article from egetFromKinvey: ', article);
    return $.ajax(`https://baas.kinvey.com/appdata/kid_rJRC6m9F/articles/${article._id}`)
  }
}


export default admin
