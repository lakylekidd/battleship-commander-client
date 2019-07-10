import request from 'superagent'

export const SET_USER = 'SET_USER'
export const CREATE_GAME = 'CREATE_GAME'
export const GAME_DATA_RECEIVED = 'GAME_DATA_RECEIVED';


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
    .send({ username: user })
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
 * Function that creates a new game and retrieves the game ID
 * @param {String} user The user Name
 * @param {String} token The Token to log in.
 */
export const createNewGame = (user, token) => (dispatch) => {
  // Initiate the request
  request
    .post(`${baseUrl}/games`)
    .set({ 'Authorization': 'Bearer ' + token })
    .send({ user })
    .then(response => {



      // Check if response status is 201

      // Retrieve the new game ID
      const { gameId } = JSON.parse(response.text);

      console.log("Game Created ", gameId)

      // Define request headers
      const eventSourceInitDict = { headers: { 'Authorization': 'Bearer ' + token } };

      // New game ID is used to connect to the stream
      // Initialize connection to the game stream.
      // Initialize the stream using the game id provided
      const gameStream = new EventSource(`${baseUrl}/games/${gameId}/stream`, eventSourceInitDict);
      gameStream.onmessage = result => {
        // Retrieve the data from the event
        // In this case the data is the game object
        // returned from the server. 
        const data = JSON.parse(result.data);

        dispatch(onGameEvent(data));


      };
    })
    .catch(console.error)
}

// Action creator that gets called each time there is an update
// on the game object on the server.
const onGameEvent = (currentGameObject) => {
  // Return the event
  return {
    type: GAME_DATA_RECEIVED,
    payload: currentGameObject
  }
}

