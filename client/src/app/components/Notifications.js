import React, {
  Component,
}                             from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import ReactDOM               from 'react-dom';
import NotificationSystem     from 'react-notification-system';
import * as STYLES from '../constants/styles';

const styles = StyleSheet.create({
  container: {

  },
});

const notificationStyles = {
  NotificationItem: { // Override the notification item
    DefaultStyle: { // Applied to every notification, regardless of the notification level
      'borderRadius':'0px',
      'boxShadow':'none',
      'borderColor':STYLES.BLAZINGREEN,
      'fontWeight':'500',
    },

    success: { // Applied only to the success notification item
      color: 'red'
    }
  }
}

class Notifications extends Component {

  _addNotification(event) {
    event.preventDefault();
    this._notificationSystem.addNotification({
      message: 'Notification message',
      level: 'success',
      autoDismiss: 2,
    });
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  render() {
    return (
      <div>
        <button onClick={this._addNotification.bind(this)}>Add notification</button>
        <NotificationSystem ref="notificationSystem" style={notificationStyles} />
      </div>
      );
  }
}

export default Notifications;
