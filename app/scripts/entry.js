import $ from 'jquery'
import ajax from './ajax'
import React from 'react'
import ReactDOM from 'react-dom'
import router from './router'
import store from './store'

import Visit from './models/Visit'


if (localStorage.getItem('authtoken')) {
  store.session.set('authtoken', localStorage.authtoken)
  store.session.retrieve()
} else {
  store.session.set('authtoken', store.settings.anomToken)
  store.session.retrieve()
}

store.plans.fetch({
  success: (r) => {
  },
  error: (e) => {
    console.error('error: ', e);
  }
})

ReactDOM.render(router, document.getElementById('container'))


// const imgMap = {
//   'gif': 'image/gif',
//   'png': 'image/png',
//   'jpg': 'image/jpeg',
//   'jpeg': 'image/jpeg'
// }
//
// let file;
// let fileId;
// function doItAll(e){
//   e.preventDefault()
//   file = e.target.files[0];
//   // console.log(this.refs.fileInput);
//   postToKinveyFile()
//   .then(putToGoogle)
//   // .then(putToKinveyUser)
//   .then(putToKinveyCollection)
//   // .then(getPicFromKinvey)
//   // .then(putToKinveyCollection)
//   .then(getFromKinveyCollection)
//   .then(putItOnThePage)
// }
//
// // Need to include public and mimetype with our data. Others are optional but preffered.
// function postToKinveyFile() {
//   return $.ajax({
//     url: `https://baas.kinvey.com/blob/kid_rJRC6m9F`,
//     type: 'POST',
//     headers: {
//       Authorization: `Kinvey ${store.session.get('authtoken')}`,
//       "X-Kinvey-Content-Type": file.type
//     },
//     data: JSON.stringify({
//       _public: true,
//       mimeType: file.type
//     }),
//     contentType: 'application/json',
//   })
// }
//
// function putToGoogle(kinveyFile) {
//   fileId = kinveyFile._id;
//   return $.ajax({
//     url: kinveyFile._uploadURL,
//     type: 'PUT',
//     headers: kinveyFile._requiredHeaders,
//     contentLength: file.size,
//     data: file,
//     processData: false,
//     contentType: false
//   })
// }
//
// // function putToKinveyUser() {
// //   return $.ajax({
// //     url: `https://baas.kinvey.com/user/kid_rJRC6m9F/${store.session.get('userId')}`,
// //     type: 'PUT',
// //     data: JSON.stringify({
// //       profilePic: fileId,
// //     }),
// //     contentType: 'application/json'
// //   })
// // }
//
// function putToKinveyCollection() {
//   return $.ajax({
//     url: `https://baas.kinvey.com/appdata/kid_rJRC6m9F/articles/${articleID}`,
//     type: 'PUT',
//     data: JSON.stringify({
//       image: {
//         _type: 'KinveyFile',
//         _id: fileId
//       },
//     }),
//     contentType: 'application/json'
//   })
// }
//
// function getFromKinveyCollection() {
//   return $.ajax({
//       url: `https://baas.kinvey.com/appdata/kid_rJRC6m9F/articles/${articleID}`,
//     })
// }
//
// // function getPicFromKinvey() {
// //   return $.ajax({
// //     url: `https://baas.kinvey.com/blob/kid_rJRC6m9F/${fileId}`,
// //   })
// // }
//
// function putItOnThePage(imgResponse) {
//   console.log(imgResponse._downloadURL);
// }
//
//
//
// let Fileuploader = (
//   <div>
//     <p>File uploader</p>
//     <form>
//       <input type="file" onChange={doItAll}/>
//       <input type="submit"/>
//     </form>
//   </div>
// )
//
//
// ReactDOM.render(Fileuploader, document.getElementById('container'))
