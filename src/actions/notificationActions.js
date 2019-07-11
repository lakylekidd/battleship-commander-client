export const SET_NOTIFICATION = 'SET_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export const removeNotification = () => ({
    type: REMOVE_NOTIFICATION
});

export const setNotification = (msg) => {
    // Set the notification
    return {
        type: SET_NOTIFICATION,
        payload: msg
    }
}