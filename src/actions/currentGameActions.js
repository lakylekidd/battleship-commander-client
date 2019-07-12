import request from 'superagent';

// Define the base URL of the API
const baseUrl = process.env.API_URL || 'https://battleship-commander-api.herokuapp.com'; //'http://localhost:5000';

export const CHANGE_SESSION_STATE = 'CHANGE_SESSION_STATE'
// export const SET_BOARD_ID = 'GET_BOARD_ID'

export const changeSessionState = (status) => {
  return {
    type: CHANGE_SESSION_STATE,
    payload: status
  }
}


