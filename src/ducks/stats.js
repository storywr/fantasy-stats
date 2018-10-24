// Action types

const BEGIN = 'BEGIN_STATS_FETCH'
const STATS = 'FETCH_STATS_SUCCESS'

// Reducer

const initialState = {
  stats: [],
  isLoading: true
}

export default function (state = initialState, action) {
  switch (action.type) {
    case BEGIN:
    return { ...state, isLoading: true }

    case STATS:
      return { ...state, stats: action.stats.players, isLoading: false }

    default:
      return state
  }
}

// Action creators

export const fetchStats = () => {
  return dispatch => {
    dispatch({ type: BEGIN })
    return fetch('http://api.fantasy.nfl.com/v1/players/stats?statType=seasonStats&season=2017&format=json')
      .then(response => response.json())
      .then(stats => dispatch({ type: STATS, stats }))
      .catch(console.log)
  }
}

// Selectors

export const selectStats = state => state.stats.stats

export const selectPlayerStats = (state, playerId) => selectStats(state).find(player => player.id === playerId)

export const selectIsLoading = state => state.stats.isLoading
