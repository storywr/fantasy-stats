import { createSelector } from 'reselect'

// Action types

const BEGIN = 'BEGIN_IMAGES_FETCH'
const IMAGES = 'FETCH_IMAGES_LIST_SUCCESS'

// Reducer

const initialState = {
  images: [],
  loading: true
}

export default function (state = initialState, action) {
  switch (action.type) {
    case BEGIN:
    return { ...state, loading: true }

    case IMAGES:
      return { ...state, images: action.images.items, loading: false }

    default:
      return state
  }
}

// Action creators

export const fetchImages = (params) => {
  return dispatch => {
    dispatch({ type: BEGIN })
    return fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyDi9tWvq-lbRUGanHzC8PbnQ7M2iKZJ7Wg&cx=003905045504128695374:kvyyjlgiz4g&q=${params.firstName}+${params.lastName}&searchType=image&fileType=jpg&alt=json&num=1`)
      .then(response => response.json())
      .then(images => dispatch({ type: IMAGES, images }))
      .catch(console.log)
  }
}

// Selectors

export const selectImages = state => state.images.images

export const selectIsLoading = state => state.images.loading