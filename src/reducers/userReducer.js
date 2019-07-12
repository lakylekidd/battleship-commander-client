import { SET_USER, REMOVE_USER } from '../actions/userActions'

const reducer = (state = null, action = {}) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...action.payload
      };
    case REMOVE_USER:
      return null;
    default:
      return state
  }
}

export default reducer