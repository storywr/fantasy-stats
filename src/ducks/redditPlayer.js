import { createSelector } from 'reselect'

// Action types

const BEGIN = 'BEGIN_REDDIT_PLAYER_FETCH'
const REDDIT_PLAYER = 'FETCH_REDDIT_PLAYER_SUCCESS'

// Reducer

const initialState = {
  redditPlayer: [],
  isLoading: true
}

export default function (state = initialState, action) {
  switch (action.type) {
    case BEGIN:
    return { ...state, isLoading: true }

    case REDDIT_PLAYER:
      return { ...state, redditPlayer: action.redditPlayer.data.children, isLoading: false }

    default:
      return state
  }
}

// Action creators

export const fetchRedditPlayer = search => {
  return dispatch => {
    dispatch({ type: BEGIN })
    return fetch(`https://www.reddit.com/r/nfl/search.json?q=${search}&restrict_sr=on`)
      .then(response => response.json())
      .then(redditPlayer => dispatch({ type: REDDIT_PLAYER, redditPlayer }))
      .catch(console.log)
  }
}

// Selectors

export const selectRedditPlayer = state => state.redditPlayer.redditPlayer

export const selectIsLoading = state => state.redditPlayer.isLoading

export const selectName = state => selectRedditPlayer(state).name
