import React, { Component } from 'react'
import { connect } from 'react-redux'
import Login from './LoginContainer'
import CreateJoin from './CreateJoinContainer'
import GameAreaComponent from './GameArea/GameAreaComponent';

class Main extends Component {
  render() {
    console.log('redux store', this.props.currentUser)
    return (
      <div className="main">
        {
          this.props.currentUser === null
            ? <Login />
            :
            this.props.currentGame ? <GameAreaComponent gameId={this.props.currentGame.id} /> : <CreateJoin />
        }
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

export default connect(mapStateToProps, null)(Main)

