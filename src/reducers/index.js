import { combineReducers } from 'redux'
import currentUser from './userReducer'
import currentGame from './currentGameReducer'

export default combineReducers({
  currentUser,
  currentGame
});