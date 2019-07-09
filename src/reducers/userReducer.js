import { NEW_USER } from '../actions/userActions'

const reducer = (state = null , action = {}) => {
  switch(action.type) {
    case NEW_USER:
      return {
        name: action.payload
      };
    default:
      return state
  }
}

export default reducer