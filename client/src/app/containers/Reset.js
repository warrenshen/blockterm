// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, graphql }   from 'react-apollo';
import {
  success as createNotificationSuccess,
}                             from 'react-notification-system-redux';
import {
  // LogInMutation,
  // LogInMutationOptions,
}                             from '../queries';
import * as loginActions      from '../redux/modules/login';
import Reset                  from '../views/Reset';

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
  return {
    email: state.login.email,
    error: state.login.error,
    nightMode: state.globals.nightMode,
    user: state.globals.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      changePassword: loginActions.changeEmail,
      changeError: loginActions.changeError,
      createNotificationSuccess: createNotificationSuccess,
    },
    dispatch
  );
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Reset);
