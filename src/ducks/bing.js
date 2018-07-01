import { createSelector } from 'reselect'

const API_KEY = process.env.REACT_APP_BING

// Action types

const BEGIN = 'BEGIN_BING_SEARCH'
const IMAGE_SEARCH = 'FETCH_IMAGE_SEARCH'

// Reducer

const initialState = {
  image: [],
  isLoading: true
}

export default function (state = initialState, action) {
  switch (action.type) {
    case BEGIN:
    return { ...state, isLoading: true }

    case IMAGE_SEARCH:
      return { ...state, imageSearch: action.imageSearch, isLoading: false }

    default:
      return state
  }
}

// Action creators

export function fetchBing(params) {
  const request = {
    method: 'GET',
    headers: {
      "Ocp-Apim-Subscription-Key": `${API_KEY}`
    }
  };

  return dispatch => {
    dispatch({ type: BEGIN })
    return fetch(`https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=${params.firstName}-${params.lastName}&count=20`, request)
      .then(response => response.json())
      .then(imageSearch => dispatch({ type: IMAGE_SEARCH, imageSearch }))
      .catch(console.log)
  }
}

// Selectors

export const selectBing = state => state.bing.imageSearch

export const selectIsLoading = state => state.sportsFeed.isLoading
