import { combineReducers } from 'redux'

import advanced from './advanced'
import draft from './draft'
import images from './images'
import news from './news'
import playerDetails from './playerDetails'
import players from './players'
import redditNews from './redditNews'
import redditPlayer from './redditPlayer'
import scoring from './scoring'
import sureStats from './sureStats'
import stats from './stats'

export default combineReducers({
  advanced,
  draft,
  images,
  news,
  playerDetails,
  players,
  redditNews,
  redditPlayer,
  scoring,
  sureStats,
  stats
})
