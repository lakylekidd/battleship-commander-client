import React, { Component } from 'react'
import {createNewGame} from '../actions/userActions'
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom'

class CreateJoinContainer extends Component {
  state = {

  }

  createGame = () => {
    const { name, token } = this.props.currentUser
    console.log('store', name, token)

    this.props.createNewGame(name, token)
  }

  joinGame = () => {

  }

  render() {
    return (
      <div>
        
        <button onClick={this.createGame}>New Game</button>
        <button>Join Game</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, { createNewGame })(CreateJoinContainer)
