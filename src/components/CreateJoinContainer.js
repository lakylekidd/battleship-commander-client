import React, { Component } from 'react'
import {createNewGame, getAvailableGames} from '../actions/userActions'
import { connect } from 'react-redux';

class CreateJoinContainer extends Component {
  state = {

  }

  createGame = () => {
    const { name, token } = this.props.currentUser
    console.log('store', name, token)

    this.props.createNewGame(name, token)

  }

  joinGame = () => {
    console.log('Join Game')
    const { name, token } = this.props.currentUser

    //dispatchs an action that gets all the available games. 
    this.props.getAvailableGames(name, token)

  }

  render() {
    if (this.props.currentGame) {
      console.log('history', this.props)
      // this.props.history.push(`/games/${this.props.currentGame}`)
    }

    return (
      <div>
        <button onClick={this.createGame}>New Game</button>

        <button onClick={this.joinGame}>Join Game</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    currentGame: state.currentGame
  }
}

export default connect(mapStateToProps, { createNewGame, getAvailableGames })(CreateJoinContainer)
