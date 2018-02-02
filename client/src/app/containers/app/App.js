// @flow weak

import { connect }          from 'react-redux';
import { compose, graphql } from 'react-apollo';
import Notifications        from 'react-notification-system-redux';
import ReactTooltip         from 'react-tooltip';
import React, {
  PureComponent,
}                           from 'react';
import { withRouter }       from 'react-router';
import PropTypes            from 'prop-types';
import { StyleSheet, css }  from 'aphrodite';

import {
  UpdateAlertMutation,
  UpdateAlertMutationOptions,
  UserQuery,
  UserQueryOptions,
}                           from '../../queries';
import {
  ConnectedNavigationBar,
  ConnectedFooter,
}                           from '../../containers';
import MainRoutes           from '../../routes/MainRoutes';
import * as STYLES          from '../../constants/styles';
import {
  generateAlertNotificationBody,
  generateAlertNotificationTitle,
}                           from '../../constants/alerts';
import Footer               from '../../components/Footer';
import Worker               from '../../workers/binance.worker';

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
      backgroundColor: STYLES.ROYAL_BLUE,
      //backgroundColor: '#F50057',
    },
    error: {
      backgroundColor: '#FF0E28',
    },
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

class App extends PureComponent
{
  constructor(props)
  {
    super(props);
    this.worker = null;
  }

  componentWillReceiveProps(nextProps)
  {
    const {
      alerts,

      updateAlert,
    } = nextProps;

    if (alerts.length > 0)
    {
      if (this.worker !== null)
      {
        this.worker.terminate();
      }

      this.worker = new Worker();
      this.worker.postMessage({ alerts: alerts });
      this.worker.onmessage = (event) => {
        const alert = event.data.alert;
        const notification = new Notification(
          generateAlertNotificationTitle(alert),
          {
            body: generateAlertNotificationBody(alert),
            requireInteraction: true,
          }
        );
        // Note that we do not use the arrow syntax for the onclick callback
        // because we do not want to mess with `this` in the callback.
        notification.onclick = function(event) {
          parent.focus();
          window.focus();
          event.target.close();
        };
        updateAlert(alert.id, 'triggered')
          .then((response) => process.env.NODE_ENV === 'dev' && console.log('Alert update success'))
          .catch((error) => process.env.NODE_ENV === 'dev' && console.log(error));
      };
    }
  }

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
    alerts: state.alerts.alerts,
    notifications: state.notifications,
    user: state.globals.user,
  };
};

export default withRouter(compose(
  graphql(UserQuery, UserQueryOptions),
  graphql(UpdateAlertMutation, UpdateAlertMutationOptions),
  connect(mapStateToProps)
)(App));
