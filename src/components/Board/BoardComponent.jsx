import React, { Component } from 'react';
import { connect } from 'react-redux';
import TileRowComponent from './TileRowComponent';
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
                <TileRowComponent key={i} posY={i} count={count} />
            )
        }
        // Set the tiles to the state
        this.setState({ tileRows: tileRows });
    }

    componentDidMount() {
        // Retrieve the required props by calculating the 
        // square root of the total tiles
        const size = parseInt(Math.sqrt(this.props.board.tiles.length));
        // Generate the tile rows
        this.generateTileRows(size);
    }


    render() {
        return (
            <div className={`board ${this.props.own && 'own'} ${!this.props.own && 'opponent'}`}>
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
        game: reduxStore.currentGame
    }
}

// Export the connected component
export default connect(mapStateToProps)(BoardComponent);
