import React, { Component } from 'react';
import "./UserStatusComponent.css";

export default class UserStatusComponent extends Component {
    render() {
        return (
            <div className={`user-status ${this.props.own ? 'own' : 'opponent'}`}>
                <div className={`status-background ${this.props.own ? 'own' : 'opponent'}`}>

                </div>
                <div className="username">
                    {this.props.username}
                </div>
                <div className={`scoring  ${this.props.own ? 'own' : 'opponent'}`}>
                    <div className="score-fails">
                        {this.props.fails}
                    </div>
                    <div className="score-hits">
                        {this.props.hits}
                    </div>
                </div>
            </div>
        )
    }
}
