import React, { Component } from 'react';
import "./TileComponent.css";

export default class TileComponent extends Component {
    render() {
        return (
            <div onClick={this.props.onClick} className="tile">
                <span className="label">
                    x:{this.props.posX} y:{this.props.posY} i:{this.props.index}
                </span>

            </div>
        )
    }
}
