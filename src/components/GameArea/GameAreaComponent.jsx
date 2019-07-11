import React, { Component } from 'react';
import { connect } from 'react-redux';
import { connectToGame, exitGame, onGameEvent, setScores } from './../../actions/userActions';
import GameFeedback from './GameFeedbackComponent'

import "./GameAreaComponent.css";
import UserStatusComponent from './UserStatusComponent';
import BoardComponent from '../Board/BoardComponent'

// Define the base URL of the API
const baseUrl = process.env.API_URL || 'https://battleship-commander-api.herokuapp.com'; //'http://localhost:5000';

class GameAreaComponent extends Component {

    gameStream;

    // Functino that calculates the current score based on the 
    // provided game data.
    calculateScore = (game) => {
        // Only calculate scores if both boards are available
        if (game.boards.length <= 1) return;

        // Retrieve my board and opponents board
        const myBoard = game.boards.find(board => board.userId === 1) // this.props.currentUser.userId);
        const opponentBoard = game.boards.find(board => board.userId !== 1) //this.props.currentUser.userId);

        // Check how many failed targets each board has
        const myFailedTargets = myBoard.tiles
            .filter(tile => tile.targeted && tile.occupied === false)
            .length;
        const opponentFailedTargets = opponentBoard.tiles
            .filter(tile => tile.targeted && tile.occupied === false)
            .length;

        // Check how many correct targets each board has
        const myCorrectTargets = myBoard.tiles
            .filter(tile => tile.targeted && tile.occupied)
            .length;
        const opponentCorrectTargets = opponentBoard.tiles
            .filter(tile => tile.targeted && tile.occupied)
            .length;

        // Construct the score object
        const scores = {
            own: {
                username: myBoard.user.username,
                ready: myBoard.ready,
                correct: myCorrectTargets,
                failed: myFailedTargets,
                accuracy: myCorrectTargets * (myCorrectTargets + myFailedTargets)
            },
            opponent: {
                username: opponentBoard.user.username,
                ready: opponentBoard.ready,
                correcct: opponentCorrectTargets,
                failed: opponentFailedTargets,
                accuracy: opponentCorrectTargets * (opponentCorrectTargets + opponentFailedTargets)
            }
        }
        // Set the scores
        this.props.setScores(scores);
    }

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
            // Calculate the current score based on the data
            this.calculateScore(data);
            //Add the game selected to the currentGame State
            this.props.onGameEvent(data);
        }

        // Add event listener 
        window.addEventListener("beforeunload", (ev) => {
            ev.preventDefault();
            this.gameStream.close();
        });
    }

    componentDidMount() {
        const id = 14;
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoibGFreWxla2lkZCIsImlhdCI6MTU2MjgzNzE0OCwiZXhwIjoxNTYyODQ0MzQ4fQ.S3Iy4kI1kBjKgX38YBD7V1eOYXedVaDSeU58ucCv3Kw';
        this.connectUserToGame(id, token);
    }

    componentWillUnmount() {
        // Retrieve needed variables
        const gameId = 14;
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoibGFreWxla2lkZCIsImlhdCI6MTU2MjgzNzE0OCwiZXhwIjoxNTYyODQ0MzQ4fQ.S3Iy4kI1kBjKgX38YBD7V1eOYXedVaDSeU58ucCv3Kw';
        // Before component unmounts
        // exit user from current game
        this.props.exitGame(gameId, token);
    }

    render() {
        return (
            <div className="game-area">
                <div className="user-status-container">
                    <UserStatusComponent username={this.props.scores.own.username}
                        own={true}
                        fails={this.props.scores.own.failed}
                        hits={this.props.scores.own.correct} />
                    <div className="game-status">
                        <h3>Battleship Commander</h3>
                    </div>
                    <UserStatusComponent username={this.props.scores.opponent.username}
                        own={false}
                        fails={this.props.scores.own.failed}
                        hits={this.props.scores.own.correct} />
                </div>
                <div className="game-feedback-container">
                    <GameFeedback />
                </div>
                <div className="board-div">
                { this.props.sessionState === 2 && <BoardComponent />}

                </div>
            </div>
        )
    }
}

// Map state to props
const mapStateToProps = (reduxState) => ({
    game: reduxState.currentGame,
    currentUser: reduxState.currentUser,
    sessionState: reduxState.sessionState,
    scores: reduxState.scores
})

// Export the connected component
export default connect(mapStateToProps, { setScores, connectToGame, exitGame, onGameEvent })(GameAreaComponent);