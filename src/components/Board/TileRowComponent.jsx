import React, { Component } from 'react';
import TileComponent from './TileComponent';
import "./TileRowComponent.css";

/**
 * The tile row component is a div that will render 
 * the tiles for this specific row.
 */
export default class TileRowComponent extends Component {

    // The state will hold the tiles
    // For this specific row
    state = {
        tiles: []
    }

    click = (index) => {
        console.log("CLICKED: ", index);
    }

    // Generate the tiles for this row
    generateTiles = (posY, count) => {
        // Array that holds the tiles for this row
        let tiles = [];
        // Loop through tile count to generate the tiles
        for (let i = 0; i < count; i++) {
            // Calculate current index
            const index = (posY * count) + i;
            // Generate the tile for this X index
            tiles.push(
                <TileComponent
                    key={index}
                    posY={posY} posX={i}
                    onClick={() => this.click(index)}
                    index={index} />
            )
        }
        // Set the tiles to the state
        this.setState({ tiles: tiles });
    }

    componentDidMount() {
        // Retrieve the required props
        const { posY, count } = this.props;
        // Create the tiles for this tile row
        this.generateTiles(posY, count)
    }


    render() {
        return (
            <div className="tile-row">
                {
                    this.state.tiles.length > 0 &&
                    this.state.tiles
                }
            </div>
        )
    }
}
