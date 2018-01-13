// @flow weak

import { connect }         from 'react-redux';
import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { withRouter }      from 'react-router';
import {
  ConnectedNavigationBar,
  ConnectedFooter,
}                          from '../../containers';
import MainRoutes          from '../../routes/MainRoutes';
import Notifications       from 'react-notification-system-redux';
import ReactTooltip        from 'react-tooltip';
import * as STYLES         from '../../constants/styles';
import Footer              from '../../components/Footer';

const styles = StyleSheet.create({
  container: {
    width: '100vw',
    minHeight: '100vh',
    padding: '0% 0%',
    margin: '0% 0%',
    display: 'flex',
    flexDirection: 'column',
  },
});

const notificationsStyle = {
  NotificationItem: { // Override the notification item
    DefaultStyle: { // Applied to every notification, regardless of the notification level
      padding: '18px 12px',
      borderRadius: '0px',
      boxShadow: 'none',
      color: '#092715 !important',
      borderColor: STYLES.BLAZINGREEN,
      fontWeight: '500',
    },
    success: {
      color:'#092715 !important',
    },
  },
}

class App extends PureComponent {

  render() {
    const {
      notifications,
    } = this.props;

    return (
      <div className={css(styles.container)}>
        <ConnectedNavigationBar />
        <MainRoutes />
        <Notifications
          notifications={notifications}
          style={notificationsStyle}
        />
        <ReactTooltip />
        <ConnectedFooter />
      </div>
    );
  }
}

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
  };
};

export default withRouter(connect(mapStateToProps)(App));
