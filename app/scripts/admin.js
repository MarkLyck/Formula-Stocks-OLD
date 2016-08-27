import $ from 'jquery'
import store from './store'

import Visits from './collections/Visits'

let admin = {
  visits: new Visits(),
  file: {},
  fileID: '',
  articleID: '',
  model: {},
  uploadImage(file, model) {
    return new Promise((resolve, reject) => {
      this.file = file
      this.model = model
      // console.log('Model in uploadImage: ', model);
      // console.log('file in uploadImage: ', this.file);
      this.postToKinveyFile()
        .then(this.putToGoogle.bind(this, file))
        .then(this.putToKinveyCollection.bind(this, model))
        .then(this.getFromKinveyCollection)
        .then((article) => {
          console.log('ARTICLE: ', article);
          resolve(article)
        })
    })
  },
  postToKinveyFile() {
    // console.log('file in postToKinveyFile: ', this.file);
    return $.ajax({
      url: `https://baas.kinvey.com/blob/kid_rJRC6m9F`,
      type: 'POST',
      headers: {
        Authorization: `Kinvey ${store.session.get('authtoken')}`,
        "X-Kinvey-Content-Type": this.file.type
      },
      data: JSON.stringify({
        _public: true,
        mimeType: this.file.type
      }),
      contentType: 'application/json',
    })
  },
  putToGoogle(file, kinveyFile) {
    this.fileID = kinveyFile._id;
    // console.log('kinveyFile: ', kinveyFile);
    // console.log('file in putToGoogle: ', file);
    return $.ajax({
      url: kinveyFile._uploadURL,
      type: 'PUT',
      headers: kinveyFile._requiredHeaders,
      contentLength: file.size,
      data: file,
      processData: false,
      contentType: false
    })
  },
  putToKinveyCollection(model) {
    console.log('in put to kinvey collection');
    console.log('model: ', model);
    console.log('fileID: ', this.fileID);
    let newModel = model.toJSON()
    this.articleID = newModel._id
    newModel.image = {
      _type: 'KinveyFile',
      _id: this.fileID
    }
    return $.ajax({
      url: `https://baas.kinvey.com/appdata/kid_rJRC6m9F/articles/${newModel._id}`,
      type: 'PUT',
      data: JSON.stringify(newModel),
      contentType: 'application/json'
    })
  },
  getFromKinveyCollection(article) {
    // console.log(r);
    // console.log('in getFrom Kinvey collection');
    return $.ajax(`https://baas.kinvey.com/appdata/kid_rJRC6m9F/articles/${article._id}`)
  }
}


export default admin
