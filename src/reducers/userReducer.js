import { SET_USER } from '../actions/userActions'

const reducer = (state = null , action = {}) => {
  switch(action.type) {
    case SET_USER:
      return {
        name: action.payload.user,
        token: action.payload.token
      };
    default:
      return state
  }
}

export default reducer