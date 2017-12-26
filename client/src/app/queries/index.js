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

export const CreateDashboardItemMutation = gql`
  mutation CreateDashboardItemMutation(
    $identifier: String!,
    $w: Int,
    $h: Int,
    $x: Int,
    $y: Int,
  ) {
    createDashboardItem(
      identifier: $identifier,
      w: $w,
      h: $h,
      x: $x,
      y: $y,
    ) {
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

export const CreateUserMutation = gql`
  mutation CreateUserMutation($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      authToken

      user {
        email
      }
    }
  }
`;

export const DestroyDashboardItemMutation = gql`
  mutation DestroyDashboardItemMutation($id: ID!) {
    destroyDashboardItem(id: $id) {
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

export const LogInMutation = gql`
  mutation LogInMutation($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      authToken

      user {
        email
      }
    }
  }
`;

export const UpdateDashboardItemsMutation = gql`
  mutation UpdateDashboardItemsMutation($dashboardItemsString: String!) {
    updateDashboardItems(dashboardItemsString: $dashboardItemsString) {
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
