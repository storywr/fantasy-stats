import { combineReducers } from 'redux'

import draft from './draft'
import playerDetails from './playerDetails'
import players from './players'
import scoring from './scoring'

export default combineReducers({
  draft,
  playerDetails,
  players,
  scoring
})
