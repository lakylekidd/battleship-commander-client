import request from 'superagent'

export const SET_USER = 'SET_USER'

const baseUrl = process.env.API_URL || 'http://localhost:5000'

const setUser = (user, token) => ({
  type: SET_USER,
  payload: {
    user,
    token
  }
})

/**
 * Creates or logs in the User
 * @param {String} user The user name
 */
export const addNewUser = (user) => (dispatch) => {
  request
    .post(`${baseUrl}/users/login`)
    .send({username: user})
    .then(response => {
      dispatch(setUser(user, response.jwt))
    })
    .catch(console.error)
}