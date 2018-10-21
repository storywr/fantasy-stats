import { createSelector } from 'reselect'

// Action types

const BEGIN = 'BEGIN_DRAFT_FETCH'
const DRAFT = 'FETCH_DRAFT_SUCCESS'

// Reducer

const initialState = {
  draft: [],
  isLoading: true
}

export default function (state = initialState, action) {
  switch (action.type) {
    case BEGIN:
    return { ...state, isLoading: true }

    case DRAFT:
      return { ...state, draft: action.draft.players, isLoading: false }

    default:
      return state
  }
}

// Action creators

export const fetchDraft = () => {
  return dispatch => {
    dispatch({ type: BEGIN })
    return fetch('http://api.fantasy.nfl.com/v1/players/editordraftranks?&format=json&season=2018')
      .then(response => response.json())
      .then(draft => dispatch({ type: DRAFT, draft }))
      .catch(console.log)
  }
}

// Selectors

export const selectDraft = state => state.draft.draft

export const selectIsLoading = state => state.draft.isLoading
