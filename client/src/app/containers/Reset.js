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
import Reset                  from '../views/Reset';
import * as loginActions      from '../redux/modules/login';

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
      changeEmail: loginActions.changeEmail,
      changeError: loginActions.changeError,
      createNotificationSuccess: createNotificationSuccess,
    },
    dispatch
  );
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Reset);
