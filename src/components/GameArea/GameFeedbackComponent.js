import React, { Component } from 'react'
import '../css/GameFeedback.css'
import { changeSessionState } from '../../actions/currentGameActions'
import { connect } from 'react-redux'

class GameFeedback extends Component {

  handleReady = () => {
    this.props.changeSessionState(2)

  }

  componentDidMount() {
    this.props.changeSessionState(1)
  }

  render() {
    // const sessionState = {
    //   idle: 0,
    //   inGame: 1,
    //   running: 2,
    //   gameOver: 3
    // }

    return (
      <div className="game-feedback">
        <h2 className="feedback">
          {
            this.props.sessionState === 1
            ? 'Prepare your Board and click Ready!'
            : this.props.sessionState === 2
              ? 'Game Started'
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

const mapStateToProps = (state) => {
  return {
    sessionState: state.sessionState
  }
}

export default connect(mapStateToProps, { changeSessionState })(GameFeedback)