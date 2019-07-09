import request from 'superagent'

export const SET_USER = 'SET_USER'

const baseUrl = ''

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
  dispatch(setUser(user, "token"))
  // request
  //   .post(`${baseUrl}/`)
  //   .then(response => {
  //     console.log('Adding new User', response)
  //     dispatch(setUser(user, response.jwt))
  //   })
  //   .catch(console.error)
}