import gql from 'graphql-tag';

export const UserQuery = gql`
  query {
    user {
      email
    }
  }
`;

export const CreateUserMutation = gql`
  mutation createUserMutation($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      authToken

      user {
        email
      }
    }
  }
`;
