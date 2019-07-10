import React, { Component } from 'react'
import { connect } from 'react-redux'
import Login from './LoginContainer'
import CreateJoin from './CreateJoinContainer'

class Main extends Component {
  render() {
    console.log('redux store', this.props.currentUser)
    return (
      <div className="main">
        {
          this.props.currentUser === null
            ? <Login />
            :
            this.props.currentGame ? <div>GAME ON</div> : <CreateJoin />
        }
      </div>
    )
  }
}

const mapDispatchToProps = (state) => {
  return {
    currentUser: state.currentUser,
    currentGame: state.currentGame
  }
}

export default connect(mapDispatchToProps, null)(Main)

