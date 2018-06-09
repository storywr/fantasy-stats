import { createSelector } from 'reselect'

const API_USERNAME = process.env.REACT_APP_USERNAME
const API_PASSWORD = process.env.REACT_APP_PASSWORD

// Action types

const BEGIN = 'BEGIN_SPORTS_FEED_FETCH'
const SPORTS_FEED = 'FETCH_SPORTS_FEED_SUCCESS'
const GAME_FEED = 'FETCH_GAME_FEED_SUCCESS'
const DFS_FEED = 'FETCH_DFS_FEED_SUCCESS'

// Reducer

const initialState = {
  sportsFeed: [],
  gameFeed: [],
  dfsFeed: [],
  isLoading: true
}

export default function (state = initialState, action) {
  switch (action.type) {
    case BEGIN:
    return { ...state, isLoading: true }

    case SPORTS_FEED:
      return { ...state, sportsFeed: action.sportsFeed, isLoading: false }

    case GAME_FEED:
      return { ...state, gameFeed: action.gameFeed, isLoading: false }

    case DFS_FEED:
      return { ...state, dfsFeed: action.dfsFeed, isLoading: false }

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
    return fetch(`https://api.mysportsfeeds.com/v1.2/pull/nfl/${params.year}-regular/cumulative_player_stats.json?player=${params.firstName}-${params.lastName}`, request)
      .then(response => response.json())
      .then(sportsFeed => dispatch({ type: SPORTS_FEED, sportsFeed }))
      .catch(console.log)
  }
}

export function fetchGameFeed(params) {
  const request = {
    method: 'GET',
    headers: {
      "Authorization": "Basic " + btoa(API_USERNAME + ":" + API_PASSWORD)
    }
  };

  return dispatch => {
    dispatch({ type: BEGIN })
    return fetch(`https://api.mysportsfeeds.com/v1.2/pull/nfl/${params.year}-regular/player_gamelogs.json?player=${params.firstName}-${params.lastName}`, request)
      .then(response => response.json())
      .then(gameFeed => dispatch({ type: GAME_FEED, gameFeed }))
      .catch(console.log)
  }
}

export function fetchDfsStats(params) {
  const request = {
    method: 'GET',
    headers: {
      "Authorization": "Basic " + btoa(API_USERNAME + ":" + API_PASSWORD)
    }
  };

  return dispatch => {
    dispatch({ type: BEGIN })
    return fetch(`https://api.mysportsfeeds.com/v1.2/pull/nfl/${params.year}-regular/daily_dfs.json?player=${params.firstName}-${params.lastName}&team=${params.teamName}`, request)
      .then(response => response.json())
      .then(dfsFeed => dispatch({ type: DFS_FEED, dfsFeed }))
      .catch(console.log)
  }
}

// Selectors

export const selectSportsFeed = state => state.sportsFeed.sportsFeed.cumulativeplayerstats

export const selectGameFeed = state => state.sportsFeed.gameFeed.playergamelogs

export const selectDfsStats = state => state.sportsFeed.dfsFeed.dailydfs

export const selectIsLoading = state => state.sportsFeed.isLoading
