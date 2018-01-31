// @flow weak

import { connect }             from 'react-redux';
import { bindActionCreators }  from 'redux';
import { compose, graphql }    from 'react-apollo';
import {
  error as createNotificationError,
  success as createNotificationSuccess,
}                              from 'react-notification-system-redux';
import {
  CreateAlertMutation,
  CreateAlertMutationOptions,
  UpdateAlertMutation,
  UpdateAlertMutationOptions,
}                              from '../queries';
import DashboardModal          from '../components/DashboardModal';
import * as alertsActions      from '../redux/modules/alerts';
import * as dashboardActions   from '../redux/modules/dashboard';

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
  return {
    alerts: state.alerts.alerts,
    conditionValue: state.alerts.conditionValue,
    expiresValue: state.alerts.expiresValue,
    identifier: state.dashboard.modalIdentifier,
    nightMode: state.globals.nightMode,
    priceValue: state.alerts.priceValue,
    user: state.globals.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      changeConditionValue: alertsActions.changeConditionValue,
      changeExpiresValue: alertsActions.changeExpiresValue,
      changeModalState: dashboardActions.changeModalState,
      changePriceValue: alertsActions.changePriceValue,
      createNotificationError: createNotificationError,
      createNotificationSuccess: createNotificationSuccess,
    },
    dispatch
  );
};

export default compose(
  graphql(CreateAlertMutation, CreateAlertMutationOptions),
  graphql(UpdateAlertMutation, UpdateAlertMutationOptions),
  connect(mapStateToProps, mapDispatchToProps)
)(DashboardModal);
