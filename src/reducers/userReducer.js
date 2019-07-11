import { SET_USER } from '../actions/userActions'

const reducer = (state = null, action = {}) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...action.payload
      };

    default:
      return state
  }
}

export default reducer