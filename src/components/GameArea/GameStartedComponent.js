import React, { Component } from 'react'
import { changeSessionState } from '../../actions/currentGameActions'
import { connect } from 'react-redux'

class GameStartedComponent extends Component {
  render() {
    return (
      <div>
        Game Started

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sessionState: state.sessionState,
    scores: state.scores
  }
}

export default connect(mapStateToProps, { changeSessionState })(GameStartedComponent)