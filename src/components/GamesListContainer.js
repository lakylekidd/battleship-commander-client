import React, { Component } from 'react'
import { connect } from 'react-redux'
import { connectToGame } from '../actions/userActions'

import './css/GamesList.css'


class GamesListContainer extends Component {

  joinGame = (id) => {
    console.log(`Joining the game ${id}`)
    const { name, token } = this.props.currentUser

    //dispatch an action that connects the user to the server sent events.

    this.props.connectToGame(id, name, token)
  }

  render() {
    if(!this.props.activeGames) { return 'Loading...'}
    
    return (
      <div className="gamesList">
        <table className="gamesListTable">
          <thead>
              <tr>
                  <th>#</th>
                  <th>Owner</th>
                  <th>Date</th>
              </tr>
          </thead>
          <tbody>
              {
                this.props.activeGames.map(game => 
                  <tr className="tr" key={game.id} 
                    onClick={() => this.joinGame(game.id)}>
                    <td className="td">{game.id}</td>
                    <td className="td">{game.userId}</td>
                    <td className="td">{game.startDate}</td>
                  </tr>
                  )
              }
          </tbody>
      </table>
  </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    activeGames: state.activeGames
  }
}

export default connect(mapStateToProps, { connectToGame })(GamesListContainer)
