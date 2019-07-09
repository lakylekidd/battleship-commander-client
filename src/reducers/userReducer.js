import { NEW_USER } from '../actions/userActions'

const reducer = (state = {} , action = {}) => {
  switch(action.type) {
    case NEW_USER:
      return action.payload;
    default:
      return state
  }
}

export default reducer