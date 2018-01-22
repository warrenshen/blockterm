// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, graphql }   from 'react-apollo';
import {
  success as createNotificationSuccess,
}                             from 'react-notification-system-redux';
import {
  LogInMutation,
  LogInMutationOptions,
}                             from '../queries';
import Login                  from '../views/Login';
import * as loginActions      from '../redux/modules/login';

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
  return {
    email: state.login.email,
    error: state.login.error,
    password: state.login.password,
    nightMode: state.globals.nightMode,
    user: state.globals.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      changeEmail: loginActions.changeEmail,
      changeError: loginActions.changeError,
      changePassword: loginActions.changePassword,
      createNotificationSuccess: createNotificationSuccess,
    },
    dispatch
  );
};

export default compose(
  graphql(LogInMutation, LogInMutationOptions),
  connect(mapStateToProps, mapDispatchToProps),
)(Login);
