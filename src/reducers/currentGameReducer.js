import { CREATE_GAME } from '../actions/userActions'

const reducer = (state = null, action = {}) => {
  switch(action.type) {
    case CREATE_GAME:
      return action.payload
    default:
      return state
  }
}

export default reducer