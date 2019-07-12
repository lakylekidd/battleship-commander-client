import React, { Component } from 'react'
import { changeSessionState } from '../../actions/currentGameActions'
import { connect } from 'react-redux'

class GameStartedComponent extends Component {
  render() {
    return (
      <div>
        Game Started!
        <br />
        {
          this.props.currentGame.userTurn === this.props.currentUser.userId ? "Your Turn!" : "Opponents Turn"
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentGame: state.currentGame,
    currentUser: state.currentUser,
    sessionState: state.sessionState,
    scores: state.scores
  }
}

export default connect(mapStateToProps, { changeSessionState })(GameStartedComponent)