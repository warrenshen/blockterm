import React, {
  Component,
}                             from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import ReactDOM               from 'react-dom';
import NotificationSystem     from 'react-notification-system';

const styles = StyleSheet.create({
  container: {

  },
});

class Notifications extends Component {

  _addNotification(event) {
    event.preventDefault();
    this._notificationSystem.addNotification({
      message: 'Notification message',
      level: 'success'
    });
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  render() {
    return (
      <div>
        <button onClick={this._addNotification.bind(this)}>Add notification</button>
        <NotificationSystem ref="notificationSystem" />
      </div>
      );
  }
}

export default Notifications;
