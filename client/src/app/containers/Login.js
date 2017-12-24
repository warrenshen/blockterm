// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, graphql }   from 'react-apollo';
import {
  LogInMutation,
  UserQuery,
}                             from '../queries';
import Login                  from '../views/Login';
import * as loginActions      from '../redux/modules/login';

import {
  AUTH_TOKEN_COOKIE,
  setItem,
} from '../services/cookie';

/* -----------------------------------------
  GraphQL - Apollo client
 ------------------------------------------*/

const logInMutationOptions = {
  props: ({ mutate, ownProps }) => ({
    logIn(email, password) {

      return mutate({
        updateQueries: {
          UserQuery: (prev, { mutationResult }) => ({
            user: mutationResult.data.logIn.user,
          }),
        },
        variables: { email, password },
      })
      .then(
        (response) => {
          setItem(AUTH_TOKEN_COOKIE, response.data.logIn.authToken);
          return Promise.resolve();
        }
      )
      .catch(
        (error) => {
          return Promise.reject();
        }
      );
    }
  })
};

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
  graphql(LogInMutation, logInMutationOptions),
  connect(mapStateToProps, mapDispatchToProps)
)(Login);
