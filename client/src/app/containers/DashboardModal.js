// @flow weak

import { connect }             from 'react-redux';
import { bindActionCreators }  from 'redux';
import { compose, graphql }    from 'react-apollo';
import {
  CreateAlertMutation,
  CreateAlertMutationOptions,
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
    },
    dispatch
  );
};

export default compose(
  graphql(CreateAlertMutation, CreateAlertMutationOptions),
  connect(mapStateToProps, mapDispatchToProps)
)(DashboardModal);
