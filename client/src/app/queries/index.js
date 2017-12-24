import gql from 'graphql-tag';

/* -----------------------------------------
  Queries
------------------------------------------*/

export const DashboardItemsQuery = gql`
  query DashboardItemsQuery {
     user {
       dashboardItems {
         id
         identifier
         w
         h
         x
         y
       }
     }
   }
`;

export const UserQuery = gql`
  query UserQuery {
    user {
      email
    }
  }
`;

/* -----------------------------------------
  Mutations
------------------------------------------*/

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

export const LogInMutation = gql`
  mutation logInMutation($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      authToken

      user {
        email
      }
    }
  }
`;
