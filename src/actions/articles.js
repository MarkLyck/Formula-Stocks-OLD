import store, { anomToken } from '../store'
export const FETCHING_ARTICLES = 'FETCHING_ARTICLES'
export const RECEIVE_ARTICLES = 'RECEIVE_ARTICLES'
export const UPDATE_ARTICLE = 'UPDATE_ARTICLE'
export const ARTICLE_UPDATED = 'ARTICLE_UPDATED'
export const POSTING_ARTICLE = 'POSTING_ARTICLE'

let articleHeaders = new Headers();
const authToken = localStorage.getItem('authtoken') ? localStorage.authtoken : anomToken
articleHeaders.append('Authorization', `Kinvey ${authToken}`)
articleHeaders.append('Content-type', `application/json`)


export function fetchArticlesIfNeeded() {
  return (dispatch) => {
    if (store.getState().articles.length) {
      dispatch({ type: 'ARTICLES_ALREADY_EXISTS' })
    } else {
      dispatch(fetchArticles())
    }
  }
}

export function fetchArticles() {
  return (dispatch) => {
    dispatch(fetchingArticles())
    const options = { method: 'GET', headers: articleHeaders }
    fetch(`https://baas.kinvey.com/appdata/kid_rJRC6m9F/articles`, options)
      .then(response => response.json())
      .then(json => dispatch(receiveArticles(json)))
  }
}
function fetchingArticles() { return { type: FETCHING_ARTICLES } }
function receiveArticles(json) {
  return { type: RECEIVE_ARTICLES, data: json }
}


export function updateArticle(article) {
  return (dispatch) => {
    const options = {
      method: 'PUT',
      headers: articleHeaders,
      body: JSON.stringify(article)
    }
    fetch(`https://baas.kinvey.com/appdata/kid_rJRC6m9F/articles/${article._id}`, options)
      .then(() => dispatch({ type: ARTICLE_UPDATED, data: article }))
  }
}

export function postArticle(markdown, title, author = store.getState().session.name, membersOnly, imageFile) {
  return (dispatch) => {
    dispatch(postingArticle())
    let article = {
      _acl: {
        r: [ '57d838197909a93d3863ceef', '57bdf1db65033d3044e27fa2' ],
        w: [ '57d838197909a93d3863ceef', '57bdf1db65033d3044e27fa2' ]
      },
      author: author,
      title: title,
      body: markdown,
      membersOnly: membersOnly
    }

    const options = {
      method: 'POST',
      headers: articleHeaders,
      body: JSON.stringify(article)
    }

    fetch(`https://baas.kinvey.com/appdata/kid_rJRC6m9F/articles`, options)
      .then((response) => response.json())
      .then((response) => uploadImage(imageFile, response))
  }
}
function postingArticle() { return { type: POSTING_ARTICLE } }

function uploadImage(file, article) {
  return new Promise((resolve, reject) => {
    let fileID = ''
    postToKinveyFile(file)
      .then((KinveyFile) => {
        fileID = KinveyFile._id
        putToGoogle(file, KinveyFile)
          .then(putToKinveyCollection.bind(null, article, fileID))
          .then(getFromKinveyCollection.bind(null, article))
          .then((data) => {
            resolve(data)
          })
      })
  })
}

function postToKinveyFile(file) {
  return new Promise((resolve, reject) => {
    let postToKinveyHeaders = new Headers()
    postToKinveyHeaders.append('Authorization', `Kinvey ${authToken}`)
    postToKinveyHeaders.append('X-Kinvey-Content-Type', file.type)
    const options = {
      method: 'POST',
      headers: postToKinveyHeaders,
      body: JSON.stringify({
        _public: true,
        mimeType: file.type
      })
    }
    fetch(`https://baas.kinvey.com/blob/kid_rJRC6m9F?tls=true`, options)
      .then((KinveyFile) => resolve(KinveyFile.json()))
  })
}

function putToGoogle(file, KinveyFile) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'PUT',
      headers: KinveyFile._requiredHeaders,
      body: file,
      contentLength: file.size,
      processData: false,
      contentType: false
    }
    fetch(KinveyFile._uploadURL, options)
      .then(() => resolve())
  })
}

function putToKinveyCollection(article, fileID) {
  return new Promise((resolve, reject) => {
    let newArticle = article

    newArticle.image = { _type: 'KinveyFile', _id: fileID }

    const options = {
      method: 'PUT',
      headers: articleHeaders,
      body: JSON.stringify(newArticle)
    }
    console.log('article id in put', article._id)
    console.log('article in put', newArticle)
    fetch(`https://baas.kinvey.com/appdata/kid_rJRC6m9F/articles/${newArticle._id}`, options)
      .then((data) => resolve( data.json() ))
  })
}

function getFromKinveyCollection(article) {
  return new Promise((resolve, reject) => {
    const options = { method: 'GET', headers: articleHeaders }
    fetch(`https://baas.kinvey.com/appdata/kid_rJRC6m9F/articles/${article._id}`, options)
      .then((data) => resolve(data.json()))
  })
}
