import { GAME_DATA_RECEIVED } from '../actions/userActions'

// Current game reducer holds the updated game object
// that gets streamed directly from the server.
const reducer = (state = null, action = {}) => {
  switch (action.type) {
    case GAME_DATA_RECEIVED:
      return action.payload
    default:
      return state
  }
}

// Export the reducer
export default reducer
