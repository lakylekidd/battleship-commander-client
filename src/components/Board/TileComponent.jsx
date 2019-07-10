import React, { Component } from 'react';
import "./TileComponent.css";

export default class TileComponent extends Component {
    render() {
        return (
            <div className="tile">
                x:{this.props.posX} y:{this.props.posY} i:{this.props.index}
            </div>
        )
    }
}
