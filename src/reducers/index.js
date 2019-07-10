import { combineReducers } from 'redux'
import currentUser from './userReducer'
import currentGame from './currentGameReducer'
import activeGames from './activeGamesReducer'

export default combineReducers({
  currentUser,
  currentGame,
  activeGames
});