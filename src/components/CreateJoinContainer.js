import React, { Component } from 'react'
import { createNewGame, getAvailableGames } from '../actions/userActions'
import { connect } from 'react-redux';
import GamesListContainer from './GamesListContainer'
import "./css/CreateJoinContainer.css";

class CreateJoinContainer extends Component {
  state = {
    displayGames: false
  }

  createGame = () => {
    const { name, token } = this.props.currentUser;
    this.props.createNewGame(name, token)
  }

  joinGame = () => {
    const { token } = this.props.currentUser
    //dispatchs an action that gets all the available games. 
    this.props.getAvailableGames(token);
    this.setState({ displayGames: true })

  }

  render() {
    if (this.props.currentGame) {
      console.log('history', this.props)
      // this.props.history.push(`/games/${this.props.currentGame}`)
    }

    return (
      <div className="create-join">

        <button onClick={this.createGame}>New Game</button>
        <button onClick={this.joinGame}>Join Game</button>
        <br />
        {
          this.state.displayGames && <GamesListContainer />
        }
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    currentGame: state.currentGame,
    activeGames: state.activeGames
  }
}

export default connect(mapStateToProps, { createNewGame, getAvailableGames })(CreateJoinContainer)
