import React, { Component } from 'react';
import { connect } from 'react-redux'
import "./TileComponent.css";

class TileComponent extends Component {

    handleClick = (tileId) => {
        this.props.onClick(tileId);
    }

    componentDidMount() {

    }

    // Pass in from parent if this is configuration board or not
    // if configuring then check your board  and get tile idx
    // if not configuring check if this is enemy board.. if so, dont show boats only hits
    // if not enemy board, show ships and hits

    render() {
        if (!this.props.board) return "loading...";
        // Retrieve the current tile from the board
        const tile = this.props.currentGame.boards.find(board => board.id === this.props.board.id)
            .tiles.find(tile => tile.index === this.props.index)
        const showShip = (!this.props.opponentBoard && this.props.configure && tile.occupied)
        const showHit = (!this.props.configure && tile.targeted === true ? true : false);
        return (
            <div onClick={() => this.handleClick(tile.id)} className={`tile ${showShip && 'ship'} ${showHit ? 'hit' : ''}`}>
                <span className="label">
                    x:{this.props.posX} y:{this.props.posY} i:{this.props.index}
                </span>

            </div>
        )
    }
}

// Map state to props
const mapStateToProps = (reduxStore) => {
    return {
        currentGame: reduxStore.currentGame,
        currentUser: reduxStore.currentUser
    }
    
}

// Export the connected component
export default connect(mapStateToProps, null)(TileComponent);