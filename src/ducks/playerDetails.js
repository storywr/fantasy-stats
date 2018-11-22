// Action types

const BEGIN = 'BEGIN_DETAILS_FETCH'
const DETAILS = 'FETCH_PLAYER_DETAILS_SUCCESS'

// Reducer

const initialState = {
  playerDetails: [],
  isLoading: true
}

export default function (state = initialState, action) {
  switch (action.type) {
    case BEGIN:
    return { ...state, isLoading: true }

    case DETAILS:
      return { ...state, playerDetails: action.playerDetails.players, isLoading: false }

    default:
      return state
  }
}

// Action creators

export const fetchPlayerDetails = playerId => {
  return dispatch => {
    dispatch({ type: BEGIN })
    return fetch(`http://cors-anywhere.herokuapp.com/api.fantasy.nfl.com/v1/players/details?playerId=1&statType=seasonStatsformat=json&playerId=${playerId}`)
      .then(response => response.json())
      .then(playerDetails => dispatch({ type: DETAILS, playerDetails }))
      .catch(console.log)
  }
}

// Selectors

export const selectPlayerDetails = state => state.playerDetails.playerDetails[0]

export const selectIsLoading = state => state.playerDetails.isLoading

export const selectName = state => selectPlayerDetails(state).name

export const selectNotes = state => selectPlayerDetails(state) ? selectPlayerDetails(state).notes : []