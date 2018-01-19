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
  wrapper: {
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
      padding: '8px 16px 4px 16px',
      borderRadius: '0px',
      boxShadow: 'none',
      color: '#fff !important',
      border: 'none',
      backgroundColor: STYLES.ROYAL_BLUE,
      fontWeight: '500',
    },
    info: {
      backgroundColor: '#F50057',
      //backgroundColor: '#651FFF',
    }
  },
  Title: {
    DefaultStyle: {
      color: '#FFF',
    },
    info: {
      lineHeight: '18px',
    },
  },
  Dismiss: {
    DefaultStyle: {
      backgroundColor: '#1A237E',
    }
  },
  Containers: {
    bc: {
      width: '280px',
      margin: '0px 0px 0px -140px',
    },
    tc: {
      width: '420px',
      margin: '0px 0px 0px -210px',
    },
  },
}

class App extends PureComponent {

  render() {
    const {
      notifications,
    } = this.props;

    return (
      <div className={css(styles.wrapper)}>
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
