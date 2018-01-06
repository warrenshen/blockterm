// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, graphql }   from 'react-apollo';
import {
  CreateUserMutation,
  CreateUserMutationOptions,
  UserQuery,
}                             from '../queries';
import Signup                 from '../views/Signup';
import * as loginActions      from '../redux/modules/login';

import {
  AUTH_TOKEN_COOKIE,
  setItem,
} from '../services/cookie';

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
  return {
    email: state.login.email,
    error: state.login.error,
    password: state.login.password,
    nightMode: state.globals.nightMode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      changeEmail: loginActions.changeEmail,
      changeError: loginActions.changeError,
      changePassword: loginActions.changePassword,
    },
    dispatch
  );
};

export default compose(
  graphql(UserQuery),
  graphql(CreateUserMutation, CreateUserMutationOptions),
  connect(mapStateToProps, mapDispatchToProps)
)(Signup);
