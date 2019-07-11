import { CHANGE_SESSION_STATE } from '../actions/currentGameActions'

const reducer = (state = 0, action = {}) => {
  switch (action.type) {
    case CHANGE_SESSION_STATE:
      return action.payload;
    default:
      return state;
  }
}

export default reducer