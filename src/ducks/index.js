import { combineReducers } from 'redux'

import draft from './draft'
import playerDetails from './playerDetails'
import players from './players'

export default combineReducers({
  draft,
  playerDetails,
  players
})
