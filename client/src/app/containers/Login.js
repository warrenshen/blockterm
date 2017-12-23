// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import gql                    from 'graphql-tag';
import { compose, graphql }   from 'react-apollo';
import Login                  from '../views/Login';
import * as loginActions      from '../redux/modules/login';

import {
  AUTH_TOKEN,
  setItem,
} from '../services/cookie';

/* -----------------------------------------
  GraphQL - Apollo client
 ------------------------------------------*/

const userQuery = gql`
  query {
    user {
      email
    }
  }
`;

const createUserMutation = gql`
  mutation createUserMutation($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      email
      authToken
    }
  }
`;
const createUserMutationOptions = {
  props: ({ mutate, ownProps }) => ({
    createUser(email, password) {

      return mutate({
        variables: { email, password },
      })
      .then(
        (response) => {
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

const logInMutation = gql`
  mutation logInMutation($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      email
      authToken
    }
  }
`;
const logInMutationOptions = {
  props: ({ mutate, ownProps }) => ({
    logIn(email, password) {

      return mutate({
        variables: { email, password },
      })
      .then(
        (response) => {
          setItem(AUTH_TOKEN, response.data.logIn.authToken);
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
  graphql(userQuery),
  graphql(createUserMutation, createUserMutationOptions),
  graphql(logInMutation, logInMutationOptions),
  connect(mapStateToProps, mapDispatchToProps)
)(Login);

