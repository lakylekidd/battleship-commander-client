import React, { Component } from 'react';
import "./UserStatusComponent.css";

export default class UserStatusComponent extends Component {
    render() {
        return (
            <div className={`user-status ${this.props.own ? 'own' : 'opponent'}`}>
                <div className="username">
                    {this.props.username}
                </div>
                <div className="scoring">
                    <div className="score-"
                </div>
    
            </div>
                )
            }
        }
