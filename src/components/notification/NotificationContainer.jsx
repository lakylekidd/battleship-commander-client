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
        // Show notification
        let show = true;
        // Check if notification exists
        if (this.props.notification) {
            // Remove after 3s
            setTimeout(() => {
                // Don't show anymore
                show = false;
                // Delete notification after 2s
                setTimeout(() => {
                    this.props.removeNotification();
                }, 2000);
            }, 3000);
        }
        return (
            <div
                className={`notification ${this.props.notification && show && 'show'}`}
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