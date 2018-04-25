import { combineReducers } from 'redux'

import advanced from './advanced'
import draft from './draft'
import news from './news'
import playerDetails from './playerDetails'
import players from './players'
import scoring from './scoring'

export default combineReducers({
  advanced,
  draft,
  news,
  playerDetails,
  players,
  scoring
})
