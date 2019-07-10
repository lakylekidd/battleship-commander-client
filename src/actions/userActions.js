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

const setGame = (game) => ({
  type: CREATE_GAME,
  payload: game
})

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
      const game = JSON.parse(response.text)
      console.log('Res from Creat /games', game)

      request
        .get(`${baseUrl}/games/${game.gameId}/stream`)
        .set({'Authorization': 'Bearer ' + token})
        .then( games => {
          console.log('Game from stream', games)
          //Add our game created to the store.         
          // dispatch(setGame(games.body.games[games.body.total - 1]))
        })
    })
    .catch(console.error)
}

