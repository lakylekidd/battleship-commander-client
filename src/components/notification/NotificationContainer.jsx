import React, { Component } from 'react';
import "./NotificationContainer.css";
import { connect } from 'react-redux';
import { removeNotification } from './../../actions/notificationActions';

class NotificationContainer extends Component {

    // Close the notification
    close = (e) => {
        // Remove the class
        e.target.classList.remove('show');
        // Set timeout
        setTimeout(() => {
            this.props.removeNotification();
        }, 2000);
    }

    render() {
        return (
            <div
                className={`notification ${this.props.notification && 'show'}`}
                onClick={this.close}>
                <div>{this.props.notification}</div>
            </div>
        )
    }
}

// Map State To Props
const mapStateToProps = (reduxState) => ({
    notification: reduxState.notification
})

// Export connected component
export default connect(mapStateToProps, { removeNotification })(NotificationContainer);