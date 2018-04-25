import { combineReducers } from 'redux'

import playerDetails from './playerDetails'
import players from './players'

export default combineReducers({
  playerDetails,
  players
})
