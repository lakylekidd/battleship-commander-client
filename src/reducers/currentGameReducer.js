import { GAME_DATA_RECEIVED, SET_GAME_ID } from '../actions/userActions'

// Current game reducer holds the updated game object
// that gets streamed directly from the server.
const reducer = (state = null, action = {}) => {
  switch (action.type) {
    case SET_GAME_ID:
      // Only sets the ID of the current game
      // not the entire game object
      return action.payload;
    case GAME_DATA_RECEIVED:
      // Check if game data is not null
      // This is the whole game object.
      if (action.payload) return action.payload;
      // Otherwise return the state
      return state;
    default:
      return state
  }
}

// Export the reducer
export default reducer
