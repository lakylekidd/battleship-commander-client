import React, { Component } from 'react';
import { connect } from 'react-redux';
import { connectToGame, exitGame, onGameEvent, setScores } from './../../actions/userActions';
import GameFeedback from './GameFeedbackComponent';
import { EventSourcePolyfill } from 'event-source-polyfill';
import config from './../../config';

import "./GameAreaComponent.css";
import UserStatusComponent from './UserStatusComponent';
import BoardComponent from '../Board/BoardComponent'

class GameAreaComponent extends Component {

    gameStream;

    // Functino that calculates the current score based on the 
    // provided game data.
    calculateScore = (game) => {

        // Only calculate scores if both boards are available
        if (game.boards.length <= 1) return;

        // Retrieve my board and opponents board
        const myBoard = game.boards.find(board => board.userId === this.props.currentUser.userId);
        const opponentBoard = game.boards.find(board => board.userId !== this.props.currentUser.userId);

        // Check if boards are here
        if (!myBoard || !opponentBoard) return;

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
    connectUserToGame = (gameId, token) => {
        // Check if game id is valid
        if (!gameId || gameId === 0) return;

        // Define request headers
        const eventSourceInitDict = { headers: { 'Authorization': 'Bearer ' + token } };
        // New game ID is used to connect to the stream
        // Initialize connection to the game stream.
        // Initialize the stream using the game id provided
        const url = config.apiUrl;
        this.gameStream = new EventSourcePolyfill(`${url}/games/${gameId}/stream`, eventSourceInitDict);
        this.gameStream.onmessage = result => {
            // Retrieve the data from the event
            // In this case the data is the game object
            // returned from the server. 
            const data = JSON.parse(result.data);
            console.log("data test:", data)
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
        const id = this.props.currentGame.id;
        const token = this.props.currentUser.token;
        this.connectUserToGame(id, token);
    }

    componentWillUnmount() {
        // Retrieve needed variables
        const id = this.props.currentGame.id;
        const token = this.props.currentUser.token;        // Before component unmounts
        // exit user from current game
        this.props.exitGame(id, token);
    }

    // Rendering the board for configuration
    renderConfigurationBoard = (playerId) => {
        // Locate our board
        const activeBoard = this.props.currentGame.boards.find(board => board.userId === playerId);
        // Check if board is retrieved
        if (!activeBoard) return "NO ACTIVE BOARD";

        // Render the game area
        return <BoardComponent board={activeBoard} opponentBoard={null} configure={true} />
    }

    // Rendering the opponent's board to target
    renderOpponentBoard = (playerId, currentUserTurn) => {
        // Determine which board is currently on
        const activeBoard = this.props.currentGame.boards.find(board => board.userId !== playerId);
        // Check if board is retrieved
        if (!activeBoard) return "NO ACTIVE BOARD";

        // Check if it's user's turn to play
        const myTurn = this.props.currentUser.userId === playerId;
        if (myTurn) {
            // Render opponent board
            const oppBoard = this.props.currentGame.boards.find(board => board.userId !== playerId);
            // Render the game area
            return <div>
                <BoardComponent board={oppBoard} opponentBoard={true} configure={false} />
            </div>
        } else {
            // render my board
            const myBoard = this.props.currentGame.boards.find(board => board.userId === this.props.currentUser.userId);
            // Render the game area
            return <div>
                <BoardComponent board={myBoard} opponentBoard={false} configure={false} />
            </div>
        }
    }

    render() {
        // Check if boards exists
        if (!this.props.currentGame.boards) return "loading..."
        // Determine which player's turn it is
        const playerId = this.props.currentGame.userTurn;
        // Is it my turn?
        const currentUserTurn = this.props.currentUser.userId === playerId;

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
                    {
                        this.props.sessionState === 1 &&
                        // In this area we are rendering the user's board
                        // So that he can configure his ships on it.
                        this.renderConfigurationBoard(this.props.currentUser.userId)
                    }
                    {
                        this.props.sessionState === 2 && this.props.currentGame &&
                        // In this area we are only rendering the opponent's board
                        // Only if it is the current users turn

                        // So that he can easily target his ships
                        this.renderOpponentBoard(playerId, currentUserTurn)
                    }

                </div>
            </div>
        );
    }
}

// Map state to props
const mapStateToProps = (reduxState) => ({
    currentGame: reduxState.currentGame,
    currentUser: reduxState.currentUser,
    sessionState: reduxState.sessionState,
    scores: reduxState.scores
})

// Export the connected component
export default connect(mapStateToProps, { setScores, connectToGame, exitGame, onGameEvent })(GameAreaComponent);