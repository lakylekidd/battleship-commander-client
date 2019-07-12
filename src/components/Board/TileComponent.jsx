import React, { Component } from 'react';
import { connect } from 'react-redux'
import "./TileComponent.css";

class TileComponent extends Component {


    handleClick = () => {
        // Check if we are currently configuring the board
        if (this.props.configure) {
            // Position the ship
            this.props.onClick();

        }


    }

    // Pass in from parent if this is configuration board or not
    // if configuring then check your board  and get tile idx
    // if not configuring check if this is enemy board.. if so, dont show boats only hits
    // if not enemy board, show ships and hits

    render() {

        // Retrieve the current tile from the board
        const tile = this.board.tiles.find(tile => tile.index === this.props.index);
        const showShip = ((this.configure || this.opponentBoard === false) && tile.occupied === true ? true : false);
        const showHit = (!this.configure && tile.targeted === true ? true : false);

        return (
            <div onClick={this.handleClick} className={`tile ${showShip && 'ship'} ${showHit && 'hit'}`}>
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
        currentUser: reduxStore.currentUser
    }
}

// Export the connected component
export default connect(mapStateToProps, null)(TileComponent);