import { combineReducers } from 'redux'
import currentUser from './userReducer'
import currentGame from './currentGameReducer'
import activeGames from './activeGamesReducer'
import sessionState from './sessionStateReducer'
import scores from './scoresReducer'

export default combineReducers({
  currentUser,
  currentGame,
  activeGames,
  sessionState,
  scores
});