// @flow weak

import { connect }             from 'react-redux';
import { bindActionCreators }  from 'redux';
import { compose, graphql }    from 'react-apollo';
import Notifications, {
  error as createNotificationError,
  success as createNotificationSuccess,
}                              from 'react-notification-system-redux';
import ReactTooltip            from 'react-tooltip';
import React, {
  PureComponent,
}                              from 'react';
import { withRouter }          from 'react-router';
import PropTypes               from 'prop-types';
import { StyleSheet, css }     from 'aphrodite';
import { isEqual }             from 'underscore';

import {
  AlertsQuery,
  AlertsQueryOptions,
  ExchangeKeysQuery,
  ExchangeKeysQueryOptions,
  UpdateAlertMutation,
  UpdateAlertMutationOptions,
  UpdateTokenUsersByExchangeMutation,
  UpdateTokenUsersByExchangeMutationOptions,
  UserQuery,
  UserQueryOptions,
}                              from '../../queries';
import {
  ConnectedNavigationBar,
  ConnectedFooter,
}                              from '../../containers';
import MainRoutes              from '../../routes/MainRoutes';
import * as STYLES             from '../../constants/styles';
import {
  generateAlertNotificationBody,
  generateAlertNotificationTitle,
}                              from '../../constants/alerts';
import {
  WORKER_MESSAGE_TYPE_ALERTS,
  WORKER_MESSAGE_TYPE_EXCHANGE_KEYS,
  WORKER_REPLY_TYPE_ALERT,
  WORKER_REPLY_TYPE_BALANCE,
}                              from '../../constants/workers';
import Footer                  from '../../components/Footer';
import Worker                  from '../../workers/index.worker';

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
    this.worker = new Worker();
  }

  componentWillReceiveProps(nextProps)
  {
    const {
      alerts,
      exchangeKeys,

      createNotificationSuccess,
      updateAlert,
      updateTokenUsersByExchange,
    } = nextProps;

    this.worker.onmessage = (event) => {
      switch (event.data.type)
      {
        case WORKER_REPLY_TYPE_ALERT:
          const alert = event.data.payload;
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
          break;
        case WORKER_REPLY_TYPE_BALANCE:
          const balance = event.data.payload.balance;
          const exchange = event.data.payload.exchange;
          delete balance.info;
          delete balance.total;
          delete balance.free;
          delete balance.used;
          const formattedBalance = Object.entries(balance)
            .map(
              ([identifier, tokenBalance]) => ({
                exchange: exchange,
                identifier: identifier,
                free: tokenBalance.free,
                used: tokenBalance.used,
                total: tokenBalance.total,
              })
            )
            .filter((tokenBalance) => tokenBalance.total > 0);
          updateTokenUsersByExchange(formattedBalance)
            .then(
              (response) => createNotificationSuccess({ position: 'bc', title: `Sync with ${exchange} exchange complete!` })
            )
            .catch((error) => console.log(error));
          break;
        default:
          if (process.env.NODE_ENV == 'dev')
          {
            console.log('Unknown worker reply type');
          }
          break;
      }
    };

    if (alerts.length > 0)
    {
      this.worker.postMessage({
        payload: alerts,
        type: WORKER_MESSAGE_TYPE_ALERTS,
      });
    }

    if (exchangeKeys.length > 0 && !isEqual(this.props.exchangeKeys, nextProps.exchangeKeys))
    {
      this.worker.postMessage({
        payload: exchangeKeys,
        type: WORKER_MESSAGE_TYPE_EXCHANGE_KEYS,
      });
    }
  }

  render()
  {
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

const mapStateToProps = (state) => ({
  alerts: state.alerts.alerts,
  exchangeKeys: state.balances.exchangeKeys,
  notifications: state.notifications,
  user: state.globals.user,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      createNotificationError: createNotificationError,
      createNotificationSuccess: createNotificationSuccess,
    },
    dispatch
  );
};

export default withRouter(compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(AlertsQuery, AlertsQueryOptions),
  graphql(ExchangeKeysQuery, ExchangeKeysQueryOptions),
  graphql(UserQuery, UserQueryOptions),
  graphql(UpdateAlertMutation, UpdateAlertMutationOptions),
  graphql(UpdateTokenUsersByExchangeMutation, UpdateTokenUsersByExchangeMutationOptions),
)(App));
