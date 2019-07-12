import request from 'superagent';
import { setNotification } from './notificationActions';

// Define the base URL of the API
const baseUrl = process.env.API_URL || 'https://battleship-commander-api.herokuapp.com'; //'http://localhost:5000';

// Define Action Types
export const SET_USER = 'SET_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const CREATE_GAME = 'CREATE_GAME'
export const GAME_DATA_RECEIVED = 'GAME_DATA_RECEIVED';
export const ACTIVE_GAMES = 'ACTIVE_GAMES';
export const EXIT_GAME = 'EXIT_GAME';
export const SET_GAME_ID = 'SET_GAME_ID';
export const SET_SCORES = 'SET_SCORES';
export const SET_SHIP = 'SET_SHIP';

// Define local actions
// Action creator that gets called each time a user logs in
const setUser = (user, token, userId) => ({
  type: SET_USER,
  payload: {
    user,
    token,
    userId
  }
});
// Removes the user from the reducer state
export const removeUser = () => ({
  type: REMOVE_USER
})
// Action creator that gets called each time there is an update
// on the game object on the server.
export const onGameEvent = (currentGameObject) => ({
  type: GAME_DATA_RECEIVED,
  payload: currentGameObject
});
// Action creator that sets the active games
const addActiveGames = (games) => ({
  type: ACTIVE_GAMES,
  payload: games
});
// Action creator that connects the user to an active game
// And dispatches the on game event every time an update
// is dispatched from the server
const connectUserToGame = (gameId, token, dispatch) => {
  // Check if game id is valid
  if (!gameId || gameId === 0) return;

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
    //Add the game selected to the currentGame State
    dispatch(onGameEvent(data));
  }
}
// Action creator that at this point only sets the game ID
// to be later retrieved from the game area component
const setCurrentGameId = (gameId) => ({
  type: SET_GAME_ID,
  payload: {
    id: gameId
  }
})

const disconnectUserFromGame = (gameId) => (dispatch) => {

}

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
      dispatch(setUser(user, text.jwt, text.userId))
    })
    .catch(err => {
      // Retrieve the message
      const message = JSON.parse(err.response.text).message;
      // Show notification to the user
      dispatch(setNotification(message));
    });
}

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
      // Retrieve the new game ID
      const { gameId } = JSON.parse(response.text);

      // Do not connect to game from here
      // connectToGame(gameId, token)(dispatch);
      // Instead set game state
      dispatch(setCurrentGameId(gameId));

    })
    .catch(err => {
      // Retrieve the message
      const message = JSON.parse(err.response.text).message;
      // Show notification to the user
      dispatch(setNotification(message));
    });
}

/**
 * Function that gets a list of available games from the server
 * @param {String} token 
 */
export const getAvailableGames = (token) => (dispatch) => {
  request
    .get(`${baseUrl}/games`)
    .set({ 'Authorization': 'Bearer ' + token })
    .then(games => {
      //Sort the games by Id
      games.body.games.sort(function (a, b) {
        return a.id - b.id || a.name.localeCompare(b.name);
      });

      dispatch(addActiveGames(games.body.games))
    })
    .catch(err => {
      // Retrieve the message
      const message = JSON.parse(err.response.text).message;
      // Show notification to the user
      dispatch(setNotification(message));
    });
}

/**
 * Function that connects a user to a game stream
 * @param {String} gameId The game ID
 * @param {String} token The user token
 */
export const connectToGame = (gameId, token) => (dispatch) => {
  connectUserToGame(gameId, token, dispatch);
}
/**
 * Allows a user to join a game.
 * @param {String} gameId The game id the user wants to join
 * @param {String} token The token of the user
 */
export const joinGame = (gameId, token) => (dispatch) => {
  // Initiate the request
  request
    .get(`${baseUrl}/games/${gameId}/join`)
    .set({ 'Authorization': 'Bearer ' + token })
    .then(response => {
      // Retrieve the new game ID
      const { gameId } = JSON.parse(response.text);

      // Do not connect to game from here
      // Instead set game state
      dispatch(setCurrentGameId(gameId));
      connectToGame(gameId, token)(dispatch);

    })
    .catch(err => {
      // Retrieve the message
      const message = JSON.parse(err.response.text).message;
      // Show notification to the user
      dispatch(setNotification(message));
    });
}

/**
 * Exits the current user from the game
 * @param {String} gameId The game id
 * @param {String} token The token
 */
export const exitGame = (gameId, token) => (dispatch) => {
  // Initiate the request
  request
    .get(`${baseUrl}/games/${gameId}/exit`)
    .set({ 'Authorization': 'Bearer ' + token })
    .then(response => {
      // Disconnect from game
      disconnectUserFromGame(gameId)(dispatch);
    })
    .catch(err => {
      // Retrieve the message
      const message = JSON.parse(err.response.text).message;
      // Show notification to the user
      dispatch(setNotification(message));
    });
}
/**
 * Sets the current score
 * @param {Object} score The current score
 */
export const setScores = (score) => ({
  type: SET_SCORES,
  payload: score
});

/**
 * Fires on opponent's tile
 */
export const fire = (boardId, tileIndex, token) => (dispatch) => {
  // Initiate the request
  request
    .get(`${baseUrl}/games/${boardId}/join`)
    .set({ 'Authorization': 'Bearer ' + token })
    .then(response => {
      // Check if response is 200

    })
    .catch(err => {
      // Retrieve the message
      const message = JSON.parse(err.response.text).message;
      // Show notification to the user
      dispatch(setNotification(message));
    });
}
/**
 * Positions a ship on user's tile
 */
export const positionShip = (boardId, tileIndex) => {
  // Position the ship on the server directly

}