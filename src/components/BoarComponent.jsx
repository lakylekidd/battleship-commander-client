import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./css/BoardComponent.css";

class BoardComponent extends Component {
    render() {
        // Check if current game exists
        const game = this.props.game;
        if (!game) {
            // Redirect the user to the login screen
        }

        return (
            <div className="board">

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
