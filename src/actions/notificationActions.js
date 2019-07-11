export const SET_NOTIFICATION = 'SET_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export const removeNotification = () => ({
    type: REMOVE_NOTIFICATION
});

export const setNotification = (msg) => (dispatch) => {
    // Set the interval
    setTimeout(() => {
        // Remove the notification
        dispatch(removeNotification);
    }, 5000);
    // Set the notification
    return {
        type: SET_NOTIFICATION,
        payload: msg
    }
}