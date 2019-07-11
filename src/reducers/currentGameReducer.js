import { GAME_DATA_RECEIVED } from '../actions/userActions'

// Current game reducer holds the updated game object
// that gets streamed directly from the server.
const reducer = (state = null, action = {}) => {
  switch (action.type) {
    case GAME_DATA_RECEIVED:
      // Check if game data is not null
      if (action.payload) return action.payload;
      // Otherwise return the state
      return state;
    default:
      return state
  }
}

// Export the reducer
export default reducer
