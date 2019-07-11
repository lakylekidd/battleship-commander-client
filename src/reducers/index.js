import { combineReducers } from 'redux'
import currentUser from './userReducer'
import currentGame from './currentGameReducer'
import activeGames from './activeGamesReducer'
import sessionState from './sessionStateReducer'

export default combineReducers({
  currentUser,
  currentGame,
  activeGames,
  sessionState
});