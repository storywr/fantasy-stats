import { combineReducers } from 'redux'

import advanced from './advanced'
import draft from './draft'
import playerDetails from './playerDetails'
import players from './players'
import scoring from './scoring'

export default combineReducers({
  advanced,
  draft,
  playerDetails,
  players,
  scoring
})
