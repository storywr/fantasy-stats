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

export const fetchScoring = params => {
  return dispatch => {
    dispatch({ type: BEGIN })
    return fetch(
      params.week === 'All Season' ?
      `http://api.fantasy.nfl.com/v1/players/scoringleaders?season=${params.year}&format=json&position=${params.position}`
      :
      `http://api.fantasy.nfl.com/v1/players/scoringleaders?season=${params.year}&format=json&week=${params.week}&position=${params.position}`
    )
      .then(response => response.json())
      .then(scoring => dispatch({ type: SCORING, scoring }))
      .catch(console.log)
  }
}

// Selectors

export const selectScoring = state => state.scoring.scoring

export const selectIsLoading = state => state.scoring.isLoading
