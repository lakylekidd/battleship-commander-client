import { SET_SCORES } from './../actions/userActions';

const initialState = {
    own: {
        correct: 0,
        failed: 0,
        accuracy: 0
    },
    opponent: {
        correcct: 0,
        failed: 0,
        accuracy: 0
    }
}

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_SCORES:
            return action.payload;
        default:
            return state;
    }
}

export default reducer;