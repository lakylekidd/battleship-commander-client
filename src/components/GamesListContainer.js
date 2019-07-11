import React, { Component } from 'react'
import { connect } from 'react-redux'
import { joinGame } from '../actions/userActions'

import './css/GamesList.css'


class GamesListContainer extends Component {

  joinGame = (id) => {
    console.log(`Joining the game ${id}`)
    const { token } = this.props.currentUser

    //dispatch an action that connects the user to the server sent events.
    // DO NOT CONNECT -- USER NEEDS TO JOIN THE GAME
    this.props.joinGame(id, token)
  }

  render() {
    if (!this.props.activeGames) { return 'Loading...' }

    return (
      <div className="games-list">
        <div className="table-container">
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
                this.props.activeGames.map(game => {
                  // Convert the date
                  const dateString = new Date(game.startDate)
                    .toLocaleString('nl', {
                      hour12: false
                    })
                    .split(' ');

                  return (
                    <tr className="tr" key={game.id}
                      onClick={() => this.joinGame(game.id)}>
                      <td className="td">{game.id}</td>
                      <td className="td">{game.user.username}</td>
                      <td className="td date">
                        {dateString[0]} - <span>{dateString[1]}</span>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
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

export default connect(mapStateToProps, { joinGame })(GamesListContainer)
