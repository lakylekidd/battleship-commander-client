import React, { Component } from 'react';
import { connect } from 'react-redux';
import { connectToGame, exitGame, onGameEvent } from './../../actions/userActions';
import "./GameAreaComponent.css";

// Define the base URL of the API
const baseUrl = process.env.API_URL || 'https://battleship-commander-api.herokuapp.com'; //'http://localhost:5000';

class GameAreaComponent extends Component {

    gameStream;

    // Action creator that connects the user to an active game
    // And dispatches the on game event every time an update
    // is dispatched from the server
    connectUserToGame = (gameId, token, dispatch) => {
        // Check if game id is valid
        if (!gameId || gameId === 0) return;

        // Define request headers
        const eventSourceInitDict = { headers: { 'Authorization': 'Bearer ' + token } };
        // New game ID is used to connect to the stream
        // Initialize connection to the game stream.
        // Initialize the stream using the game id provided
        this.gameStream = new EventSource(`${baseUrl}/games/${gameId}/stream`, eventSourceInitDict);
        this.gameStream.onmessage = result => {
            // Retrieve the data from the event
            // In this case the data is the game object
            // returned from the server. 
            const data = JSON.parse(result.data);
            //Add the game selected to the currentGame State
            this.props.onGameEvent(data);
        }
    }

    componentDidMount() {
        const id = this.props.gameId;
        const token = this.props.currentUser.token;
        this.connectUserToGame(id, token);
    }

    componentWillUnmount() {
        // Retrieve needed variables
        const token = this.props.currentUser.token;
        const gameId = this.props.currentGame.id;
        // Before component unmounts
        // exit user from current game
        this.props.exitGame(gameId, token);
    }

    render() {
        return (
            <div className="game-area">

            </div>
        )
    }
}

// Map state to props
const mapStateToProps = (reduxState) => ({
    game: reduxState.currentGame,
    currentUser: reduxState.currentUser
})

// Export the connected component
export default connect(mapStateToProps, { connectToGame, exitGame, onGameEvent })(GameAreaComponent);