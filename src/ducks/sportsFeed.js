import { createSelector } from 'reselect'

const API_USERNAME = process.env.REACT_APP_USERNAME
const API_PASSWORD = process.env.REACT_APP_PASSWORD

// Action types

const BEGIN = 'BEGIN_SPORTS_FEED_FETCH'
const SPORTS_FEED = 'FETCH_SPORTS_FEED_SUCCESS'

// Reducer

const initialState = {
  sportsFeed: [],
  isLoading: true
}

export default function (state = initialState, action) {
  switch (action.type) {
    case BEGIN:
    return { ...state, isLoading: true }

    case SPORTS_FEED:
      return { ...state, sportsFeed: action.sportsFeed, isLoading: false }

    default:
      return state
  }
}

// Action creators

export function fetchSportsFeed(params) {
  const request = {
    method: 'GET',
    headers: {
      "Authorization": "Basic " + btoa(API_USERNAME + ":" + API_PASSWORD)
    }
  };

  return dispatch => {
    dispatch({ type: BEGIN })
    return fetch('https://api.mysportsfeeds.com/v1.2/pull/nfl/2017-regular/cumulative_player_stats.json?player=todd-gurley', request)
      .then(response => response.json())
      .then(sportsFeed => dispatch({ type: SPORTS_FEED, sportsFeed }))
      .catch(console.log)
  }
}

// Selectors

export const selectSportsFeed = state => state.sportsFeed.sportsFeed

export const selectIsLoading = state => state.sportsFeed.isLoading
