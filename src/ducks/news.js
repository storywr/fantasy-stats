import { createSelector } from 'reselect'

// Action types

const BEGIN = 'BEGIN_NEWS_FETCH'
const NEWS = 'FETCH_NEWS_SUCCESS'

// Reducer

const initialState = {
  news: [],
  isLoading: true
}

export default function (state = initialState, action) {
  switch (action.type) {
    case BEGIN:
    return { ...state, isLoading: true }

    case NEWS:
      return { ...state, news: action.news.news, isLoading: false }

    default:
      return state
  }
}

// Action creators

export const fetchNews = () => {
  return dispatch => {
    dispatch({ type: BEGIN })
    return fetch('http://api.fantasy.nfl.com/v1/players/news?&format=json')
      .then(response => response.json())
      .then(news => dispatch({ type: NEWS, news }))
      .catch(console.log)
  }
}

// Selectors

export const selectNews = state => state.news.news

export const selectIsLoading = state => state.news.isLoading
