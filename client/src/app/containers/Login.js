// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, graphql }   from 'react-apollo';
import {
  LogInMutation,
  LogInMutationOptions,
  UserQuery,
}                             from '../queries';
import Login                  from '../views/Login';
import * as loginActions      from '../redux/modules/login';

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
  return {
    email: state.login.email,
    password: state.login.password,
    nightMode: state.globals.nightMode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      changeEmail: loginActions.changeEmail,
      changePassword: loginActions.changePassword,
    },
    dispatch
  );
};

export default compose(
  graphql(UserQuery),
  graphql(LogInMutation, LogInMutationOptions),
  connect(mapStateToProps, mapDispatchToProps),
)(Login);
