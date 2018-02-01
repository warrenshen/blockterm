// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, graphql }   from 'react-apollo';
import {
  error as createNotificationError,
  success as createNotificationSuccess,
}                             from 'react-notification-system-redux';
import {
  ResetPasswordMutation,
  ResetPasswordMutationOptions,
}                             from '../queries';
import * as loginActions      from '../redux/modules/login';
import Reset                  from '../views/Reset';

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
  return {
    error: state.login.error,
    nightMode: state.globals.nightMode,
    password: state.login.password,
    user: state.globals.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      changeError: loginActions.changeError,
      changePassword: loginActions.changePassword,
      createNotificationError: createNotificationError,
      createNotificationSuccess: createNotificationSuccess,
    },
    dispatch
  );
};

export default compose(
  graphql(ResetPasswordMutation, ResetPasswordMutationOptions),
  connect(mapStateToProps, mapDispatchToProps),
)(Reset);
