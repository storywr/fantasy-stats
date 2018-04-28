import { createSelector } from 'reselect'

// Action types

const BEGIN_NFL_NEWS = 'BEGIN_NFL_NEWS_FETCH'
const BEGIN_FF_NEWS = 'BEGIN_FF_NEWS_FETCH'
const BEGIN_DYNASTY_NEWS = 'BEGIN_DYNASTY_NEWS_FETCH'
const NFL_NEWS = 'FETCH_NFL_NEWS_SUCCESS'
const FF_NEWS = 'FETCH_FF_NEWS_SUCCESS'
const DYNASTY_NEWS = 'FETCH_DYNASTY_NEWS_SUCCESS'

// Reducer

const initialState = {
  nfl: [],
  ff: [],
  dynasty: [],
  isLoading: true
}

export default function (state = initialState, action) {
  switch (action.type) {
    case BEGIN_NFL_NEWS:
    case BEGIN_FF_NEWS:
    case BEGIN_DYNASTY_NEWS:
    return { ...state, isLoading: true }

    case NFL_NEWS:
      return { ...state, nfl: action.nfl.data.children, isLoading: false }

    case FF_NEWS:
      return { ...state, ff: action.ff.data.children, isLoading: false }

    case DYNASTY_NEWS:
      return { ...state, dynasty: action.dynasty.data.children, isLoading: false }

    default:
      return state
  }
}

// Action creators

export const fetchNfl = search => {
  return dispatch => {
    dispatch({ type: BEGIN_NFL_NEWS })
    return fetch(`https://www.reddit.com/r/nfl/hot.json?`)
      .then(response => response.json())
      .then(nfl => dispatch({ type: NFL_NEWS, nfl }))
      .catch(console.log)
  }
}

export const fetchFf = search => {
  return dispatch => {
    dispatch({ type: BEGIN_FF_NEWS })
    return fetch(`https://www.reddit.com/r/fantasyfootball/hot.json?`)
      .then(response => response.json())
      .then(ff => dispatch({ type: FF_NEWS, ff }))
      .catch(console.log)
  }
}

export const fetchDynasty = search => {
  return dispatch => {
    dispatch({ type: BEGIN_DYNASTY_NEWS })
    return fetch(`https://www.reddit.com/r/dynastyff/hot.json?`)
      .then(response => response.json())
      .then(dynasty => dispatch({ type: DYNASTY_NEWS, dynasty }))
      .catch(console.log)
  }
}

// Selectors

export const selectNfl = state => state.redditNews.nfl

export const selectFf = state => state.redditNews.ff

export const selectDynasty = state => state.redditNews.dynasty

export const selectIsLoading = state => state.redditNews.isLoading
