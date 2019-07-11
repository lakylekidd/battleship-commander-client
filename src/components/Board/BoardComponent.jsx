import React, { Component } from 'react';
import { connect } from 'react-redux';
import TileRowComponent from './TileRowComponent';
import { positionShip } from './../../actions/userActions';
import "./BoardComponent.css";

class BoardComponent extends Component {

    state = {
        tileRows: []
    }

    // Generates the tile rows based on the count
    generateTileRows = (count) => {
        // Array that holds the tile rows for this board
        let tileRows = [];
        // Loop through tile row count to generate the tile rows
        for (let i = count - 1; i >= 0; i--) {
            // Generate the tile rows for this Y index
            tileRows.push(
                <TileRowComponent key={i} posY={i} onFireHandler={this.onTileClickHandler} count={count} />
            )
        }
        // Set the tiles to the state
        this.setState({ tileRows: tileRows });
    }

    // Click handler that determines if this is a fire
    // or if the user wants to add a ship on the board
    onTileClickHandler = (index) => {
        // Check if this is the opponent board
        if (this.props.opponent && !this.props.configure) {
            // This is the opponent's board and configuration is not allowed
            // Treat this click as a fire on opponent's board.
            this.props.onFireHandler(this.props.board.id, index);
        } else if (this.props.configure) {
            // The board is only to be configured with ships
            // So treat this click as a set ship.
            this.props.positionShip(this.board.id, index);
        }
    }

    componentDidMount() {
        // Retrieve the required props by calculating the 
        // square root of the total tiles
        const tiles = this.props.game.boards[0].tiles;
        const size = parseInt(Math.sqrt(tiles.length));
        // Generate the tile rows
        this.generateTileRows(size);
    }

    render() {
        return (
            <div className={`board ${this.props.scores.own && 'own'} ${!this.props.scores.own && 'opponent'}`}>
                {
                    this.state.tileRows.length > 0 &&
                    this.state.tileRows
                }
            </div>
        )
    }
}

// Map state to props
const mapStateToProps = (reduxStore) => {
    return {
        game: reduxStore.currentGame,
        scores: reduxStore.scores
    }
}

// Export the connected component
export default connect(mapStateToProps, { positionShip })(BoardComponent);
