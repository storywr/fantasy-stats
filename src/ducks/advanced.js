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

export const fetchAdvanced = params => {
  return dispatch => {
    dispatch({ type: BEGIN })
    return fetch(
      params.week === 'All Season' ?
      `http://cors-anywhere.herokuapp.com/api.fantasy.nfl.com/v1/players/advanced?season=${params.year}&count=50&format=json&position=${params.position}&sort=${params.sort}`
      :
      `http://cors-anywhere.herokuapp.com/api.fantasy.nfl.com/v1/players/advanced?season=${params.year}&count=50&format=json&position=${params.position}&week=${params.week}&sort=${params.sort}`
    )
      .then(response => response.json())
      .then(advanced => dispatch({ type: ADVANCED, advanced }))
      .catch(console.log)
  }
}

// Selectors

export const selectAdvanced = state => state.advanced.advanced

export const selectPosition = (state, position) => selectAdvanced(state)[position]

export const selectIsLoading = state => state.advanced.isLoading
