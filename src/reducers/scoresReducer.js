import { SET_SCORES } from './../actions/userActions';

const reducer = (state = null, action = {}) => {
    switch (action.type) {
        case SET_SCORES:
            return action.payload;
        default:
            return state;
    }
}

export default reducer;