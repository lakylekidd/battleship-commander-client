import {ACTIVE_GAMES} from '../actions/userActions'

const reducer = (state = null, action = {}) => {
  switch(action.type) {
    case ACTIVE_GAMES:
      return action.payload
    default:
      return state;
  }
}
export default reducer