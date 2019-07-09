import React, { Component } from 'react'
import { connect } from 'react-redux'
import Login from './LoginContainer'
import CreateJoin from './CreateJoinContainer'

class Main extends Component {
  render() {
    console.log('redux store', this.props.currentUser)
    return (
      <div>
        <Login />
        { this.props.currentUser && <CreateJoin />}
      </div>
    )
  }
}

const mapDispatchToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapDispatchToProps, null)(Main)

