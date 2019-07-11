import React, { Component } from 'react'
import '../css/GameFeedback.css'
import { changeSessionState } from '../../actions/currentGameActions'
import { connect } from 'react-redux'

class GameFeedback extends Component {
  state = {
    sessionState: 1
  }
  //create states and reducers sessionState

  handleReady = () => {
    this.setState({ sessionState: 2 })
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
            this.state.sessionState === 1
            ? 'Prepare your Board and click Ready!'
            : this.state.sessionState === 2
              ? 'Game Started'
              : 'Game Over'
          }
        </h2>
        {
          this.state.sessionState === 1 && 
            <button className="btn-ready" onClick={this.handleReady}> Ready </button>
        }
      </div>
    )
  }
}



export default connect(null, { changeSessionState })(GameFeedback)