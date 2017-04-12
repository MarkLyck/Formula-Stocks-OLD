import store from '../rstore'
export const FETCHING_ARTICLES = 'FETCHING_ARTICLES'
export const RECEIVE_ARTICLES = 'RECEIVE_ARTICLES'
export const UPDATE_ARTICLE = 'UPDATE_ARTICLE'
export const ARTICLE_UPDATED = 'ARTICLE_UPDATED'

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
    let articleHeaders = new Headers();
    const authToken = localStorage.getItem('authtoken') ? localStorage.authtoken : store.getState().settings.anomToken
    articleHeaders.append('Authorization', `Kinvey ${authToken}`)
    var options = { method: 'GET', headers: articleHeaders }
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
    let articleHeaders = new Headers();
    const authToken = localStorage.getItem('authtoken') ? localStorage.authtoken : store.getState().settings.anomToken
    articleHeaders.append('Authorization', `Kinvey ${authToken}`)
    var options = {
      method: 'PUT',
      headers: articleHeaders,
      body: JSON.stringify(article)
    }
    fetch(`https://baas.kinvey.com/appdata/kid_rJRC6m9F/articles/${article._id}`, options)
      .then(() => dispatch({ type: ARTICLE_UPDATED, data: article }))
  }
}
