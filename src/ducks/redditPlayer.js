// Action types

const BEGIN_NFL = 'BEGIN_NFL_FETCH'
const BEGIN_FF = 'BEGIN_FF_FETCH'
const BEGIN_DYNASTY = 'BEGIN_DYNASTY_FETCH'
const NFL_PLAYER = 'FETCH_NFL_SUCCESS'
const FF_PLAYER = 'FETCH_FF_SUCCESS'
const DYNASTY_PLAYER = 'FETCH_DYNASTY_SUCCESS'

// Reducer

const initialState = {
  nfl: [],
  ff: [],
  dynasty: [],
  isLoading: true
}

export default function (state = initialState, action) {
  switch (action.type) {
    case BEGIN_NFL:
    case BEGIN_FF:
    case BEGIN_DYNASTY:
    return { ...state, isLoading: true }

    case NFL_PLAYER:
      return { ...state, nfl: action.nfl.data.children, isLoading: false }

    case FF_PLAYER:
      return { ...state, ff: action.ff.data.children, isLoading: false }

    case DYNASTY_PLAYER:
      return { ...state, dynasty: action.dynasty.data.children, isLoading: false }

    default:
      return state
  }
}

// Action creators

export const fetchNfl = search => {
  return dispatch => {
    dispatch({ type: BEGIN_NFL })
    return fetch(`https://www.reddit.com/r/nfl/search.json?q=${search}&restrict_sr=on`)
      .then(response => response.json())
      .then(nfl => dispatch({ type: NFL_PLAYER, nfl }))
      .catch(console.log)
  }
}

export const fetchFf = search => {
  return dispatch => {
    dispatch({ type: BEGIN_FF })
    return fetch(`https://www.reddit.com/r/fantasyfootball/search.json?q=${search}&restrict_sr=on`)
      .then(response => response.json())
      .then(ff => dispatch({ type: FF_PLAYER, ff }))
      .catch(console.log)
  }
}

export const fetchDynasty = search => {
  return dispatch => {
    dispatch({ type: BEGIN_DYNASTY })
    return fetch(`https://www.reddit.com/r/dynastyff/search.json?q=${search}&restrict_sr=on`)
      .then(response => response.json())
      .then(dynasty => dispatch({ type: DYNASTY_PLAYER, dynasty }))
      .catch(console.log)
  }
}

// Selectors

export const selectNfl = state => state.redditPlayer.nfl

export const selectFf = state => state.redditPlayer.ff

export const selectDynasty = state => state.redditPlayer.dynasty

export const selectIsLoading = state => state.redditPlayer.isLoading
