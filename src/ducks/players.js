// Action types

const LIST = 'FETCH_PLAYER_LIST_SUCCESS'
const FETCH_SINGLE = 'FETCH_PLAYER'
const FETCH_SINGLE_SUCCESS = 'FETCH_PLAYER_SUCCESS'

// Reducer

const initialState = {
  players: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LIST:
      return { ...state, players: action.players.players }

    default:
      return state
  }
}

// Action creators

export const fetchPlayers = () => {
  return dispatch => {
    return fetch('http://api.fantasy.nfl.com/v1/players/stats?statType=seasonStats&season=2017&week=1&format=json')
      .then(response => response.json())
      .then(players => dispatch({ type: LIST, players }))
      .catch(console.log)
  }
}

// Selectors

export const selectPlayers = state => state.players.players