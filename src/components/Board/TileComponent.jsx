import React, { Component } from 'react';
import { connect } from 'react-redux'
import "./TileComponent.css";

class TileComponent extends Component {
    handleClick = () => {
        this.props.onClick

    }

    // Pass in from parent if this is configuration board or not
    // if configuring then check your board  and get tile idx
    // if not configuring check if this is enemy board.. if so, dont show boats only hits
    // if not enemy board, show ships and hits

    render() {
        return (
            <div onClick={this.handleClick} className={`tile ${ }`}>
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