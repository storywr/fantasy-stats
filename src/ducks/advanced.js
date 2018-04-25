import { createSelector } from 'reselect'

// Action types

const BEGIN = 'BEGIN_ADVANCED_FETCH'
const ADVANCED = 'FETCH_ADVANCED_SUCCESS'

// Reducer

const initialState = {
  advanced: [],
  isLoading: true
}

export default function (state = initialState, action) {
  switch (action.type) {
    case BEGIN:
    return { ...state, isLoading: true }

    case ADVANCED:
      return { ...state, advanced: action.advanced, isLoading: false }

    default:
      return state
  }
}

// Action creators

export const fetchAdvanced = (week, position) => {
  return dispatch => {
    dispatch({ type: BEGIN })
    return fetch(
      week === 'All Season' ?
      `http://api.fantasy.nfl.com/v1/players/advanced?season=2017&count=24&format=json&position=${position}&sort=touches`
      :
      `http://api.fantasy.nfl.com/v1/players/advanced?season=2017&count=24&format=json&position=${position}&week=${week}&sort=touches`
    )
      .then(response => response.json())
      .then(advanced => dispatch({ type: ADVANCED, advanced }))
      .catch(console.log)
  }
}

// Selectors

export const selectAdvanced = state => state.advanced.advanced

export const selectIsLoading = state => state.advanced.isLoading
