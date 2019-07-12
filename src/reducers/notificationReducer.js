import { SET_NOTIFICATION, REMOVE_NOTIFICATION } from './../actions/notificationActions';

// Define the notification reducer
const reducer = (state = null, action = {}) => {
    switch (action.type) {
        case SET_NOTIFICATION:
            return action.payload;
        case REMOVE_NOTIFICATION:
            return null;
        default:
            return state;
    }
}

// Export the reducer
export default reducer;