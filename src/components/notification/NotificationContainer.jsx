import React, { Component } from 'react';
import "./NotificationContainer.css";
import { connect } from 'react-redux';

class NotificationContainer extends Component {
    render() {
        return (
            <div className="notification">
                <div>Error message</div>
            </div>
        )
    }
}

// Map State To Props
const mapStateToProps = (reduxState) => ({
    notification: reduxState.notification
})

// Export connected component
export default connect(mapStateToProps)(NotificationContainer);