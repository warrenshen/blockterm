// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, graphql }   from 'react-apollo';
import {
  error as createNotificationError,
  success as createNotificationSuccess,
}                             from 'react-notification-system-redux';
import * as alertsActions     from '../redux/modules/alerts';
import Alerts                 from '../views/Alerts';

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
  return {
    alerts: state.alerts.alerts,
    nightMode: state.globals.nightMode,
    user: state.globals.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      createNotificationError: createNotificationError,
      createNotificationSuccess: createNotificationSuccess,
    },
    dispatch
  );
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Alerts);
