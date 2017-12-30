// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, graphql }   from 'react-apollo';
import {
  CreateUserMutation,
  UserQuery,
}                             from '../queries';
import Signup                 from '../views/Signup';
import * as loginActions      from '../redux/modules/login';

import {
  AUTH_TOKEN_COOKIE,
  setItem,
} from '../services/cookie';

/* -----------------------------------------
  GraphQL - Apollo client
 ------------------------------------------*/

const createUserMutationOptions = {
  props: ({ mutate, ownProps }) => ({
    createUser(email, password) {

      return mutate({
        updateQueries: {
          UserQuery: (prev, { mutationResult }) => ({
            user: mutationResult.data.createUser.user,
          }),
        },
        variables: { email, password },
      })
      .then(
        (response) => {
          setItem(AUTH_TOKEN_COOKIE, response.data.createUser.authToken);
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
  graphql(CreateUserMutation, createUserMutationOptions),
  connect(mapStateToProps, mapDispatchToProps)
)(Signup);
