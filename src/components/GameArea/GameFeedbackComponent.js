import React, { Component } from 'react'
import '../css/GameFeedback.css'
import { changeSessionState } from '../../actions/currentGameActions'
import { connect } from 'react-redux'
import GameStarted from './GameStartedComponent'

class GameFeedback extends Component {

  // Handles the readyness of a user
  // Also posts the current configuration
  // of the board to the server
  handleReady = () => {
    // Also push the board to the server
    // So that other users know that they are ready
    this.props.changeSessionState(2)

  }

  componentDidMount() {
    this.props.changeSessionState(1)
  }

  render() {
    return (
      <div className="game-feedback">
        <h2 className="feedback">
          {
            this.props.sessionState === 1
              ? `Prepare your Board and click Ready!`
              : this.props.scores.opponent.ready === false
                ? `Waiting for ${this.props.scores.opponent.username}...`
                : this.props.sessionState === 2
                  ? <GameStarted /> //make a component
                  : 'Game Over'
          }
        </h2>
        {
          this.props.sessionState === 1 &&
          <button className="btn-ready" onClick={this.handleReady}> Ready </button>
        }
      </div>
    )
  }
}

// Map state to props
const mapStateToProps = (state) => {
  return {
    sessionState: state.sessionState,
    scores: state.scores
  }
}
// Export the connected component
export default connect(mapStateToProps, { changeSessionState })(GameFeedback)