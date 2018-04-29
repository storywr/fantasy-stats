import { createSelector } from 'reselect'

// Action types

const BEGIN = 'BEGIN_SURE_STATS_FETCH'
const SURE_STATS = 'FETCH_SURE_STATS_SUCCESS'

// Reducer

const initialState = {
  sureStats: [],
  isLoading: true
}

export default function (state = initialState, action) {
  switch (action.type) {
    case BEGIN:
    return { ...state, isLoading: true }

    case SURE_STATS:
      return { ...state, sureStats: action.sureStats, isLoading: false }

    default:
      return state
  }
}

// Action creators

export const fetchSureStats = params => {
  return dispatch => {
    dispatch({ type: BEGIN })
    return fetch(`http://cors-anywhere.herokuapp.com/api.suredbits.com/nfl/v0/stats/${params.lastName}/${params.firstName}/${params.year}`)
      .then(response => response.json())
      .then(sureStats => dispatch({ type: SURE_STATS, sureStats }))
      .catch(console.log)
  }
}

// Selectors

export const selectSureStats = state => state.sureStats.sureStats

export const selectIsLoading = state => state.sureStats.isLoading
