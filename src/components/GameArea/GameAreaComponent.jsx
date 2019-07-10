import React, { Component } from 'react';
import { connect } from 'react-redux';
import { connectToGame } from './../../actions/userActions';
import "./GameAreaComponent.css"

class GameAreaComponent extends Component {

    componentDidMount() {
        const id = 0;
        const token = '';
        this.props.connectToGame(id, token);
    }

    render() {
        return (
            <div className="game-area">

            </div>
        )
    }
}

// Map state to props
const mapStateToProps = (reduxState) => ({
    game: reduxState.currentGame
})

// Export the connected component
export default connect(mapStateToProps, { connectToGame })(GameAreaComponent);