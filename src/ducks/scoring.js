import { createSelector } from 'reselect'

// Action types

const BEGIN = 'BEGIN_SCORING_FETCH'
const SCORING = 'FETCH_SCORING_SUCCESS'

// Reducer

const initialState = {
  scoring: [],
  isLoading: true
}

export default function (state = initialState, action) {
  switch (action.type) {
    case BEGIN:
    return { ...state, isLoading: true }

    case SCORING:
      return { ...state, scoring: action.scoring.positions, isLoading: false }

    default:
      return state
  }
}

// Action creators

export const fetchScoring = (week, position) => {
  return dispatch => {
    dispatch({ type: BEGIN })
    return fetch(
      week === 'All Season' ?
      `http://api.fantasy.nfl.com/v1/players/scoringleaders?season=2017&format=json&position=${position}`
      :
      `http://api.fantasy.nfl.com/v1/players/scoringleaders?season=2017&format=json&week=${week}&position=${position}`
    )
      .then(response => response.json())
      .then(scoring => dispatch({ type: SCORING, scoring }))
      .catch(console.log)
  }
}

// Selectors

export const selectScoring = state => state.scoring.scoring

export const selectIsLoading = state => state.scoring.isLoading
