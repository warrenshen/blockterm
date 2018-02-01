// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, graphql }   from 'react-apollo';
import {
  success as createNotificationSuccess,
}                             from 'react-notification-system-redux';
import {
  ForgotPasswordMutation,
  ForgotPasswordMutationOptions,
}                             from '../queries';
import * as loginActions      from '../redux/modules/login';
import Forgot                 from '../views/Forgot';

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
  return {
    email: state.login.email,
    error: state.login.error,
    nightMode: state.globals.nightMode,
    success: state.login.success,
    user: state.globals.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      changeEmail: loginActions.changeEmail,
      changeError: loginActions.changeError,
      createNotificationSuccess: createNotificationSuccess,
    },
    dispatch
  );
};

export default compose(
  graphql(ForgotPasswordMutation, ForgotPasswordMutationOptions),
  connect(mapStateToProps, mapDispatchToProps),
)(Forgot);
