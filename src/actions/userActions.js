import request from 'superagent'

export const SET_USER = 'SET_USER'
export const CREATE_GAME = 'CREATE_GAME'

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
      const text = JSON.parse(response.text)
      dispatch(setUser(user, text.jwt))
    })
    .catch(console.error)
}

// const setGame = (id) => ({
//   type: CREATE_GAME,
//   payload: id
// })

/**
 * 
 * @param {String} user The user Name
 * @param {String} token The Token to log in.
 */
export const createNewGame = (user, token) => (dispatch) => {
  console.log('CREATE new GAME', user)

  request
    .post(`${baseUrl}/games`)
    .set({'Authorization': 'Bearer ' + token})
    .send({user})
    .then(response => {
      console.log('Res from Creat /games', JSON.parse(response.text).id)
      //dispatch an action that connects to games/:id/stream
    })
    .catch(console.error)

}