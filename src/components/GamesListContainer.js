import React, { Component } from 'react'
import { connect } from 'react-redux'


class GamesListContainer extends Component {

  joinGame = (id) => {
    console.log(`Joining the game ${id}`)
  }

  render() {
    if(!this.props.activeGames) { return 'Loading...'}
    
    return (
      <div>
        {
          this.props.activeGames.map(game => 
            <li key={game.id} onClick={() => this.joinGame(game.id)}>
              {game.id}
            </li>)
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    activeGames: state.activeGames
  }
}

export default connect(mapStateToProps, null)(GamesListContainer)
