export const CHANGE_SESSION_STATE = 'CHANGE_SESSION_STATE'

export const changeSessionState = (status) => {
  return {
    type: CHANGE_SESSION_STATE,
    payload: status
  }
}