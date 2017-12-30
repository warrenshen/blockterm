import gql from 'graphql-tag';

/* -----------------------------------------
  Queries
------------------------------------------*/

export const DashboardPagesQuery = gql`
  query DashboardPagesQuery {
    user {
      dashboardPages {
        id
        index
        name

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
    $dashboardPageId: ID!,
    $identifier: String!,
    $w: Int,
    $h: Int,
    $x: Int,
    $y: Int,
  ) {
    createDashboardItem(
      dashboardPageId: $dashboardPageId,
      identifier: $identifier,
      w: $w,
      h: $h,
      x: $x,
      y: $y,
    ) {
      dashboardPages {
        id
        index
        name

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
  mutation DestroyDashboardItemMutation(
    $id: ID!
    $dashboardPageId: ID!,
  ) {
    destroyDashboardItem(id: $id, dashboardPageId: $dashboardPageId) {
      dashboardPages {
        id
        index
        name

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
  mutation UpdateDashboardItemsMutation(
    $dashboardPageId: ID!,
    $dashboardItemsString: String!,
  ) {
    updateDashboardItems(
      dashboardPageId: $dashboardPageId,
      dashboardItemsString: $dashboardItemsString,
    ) {
      dashboardPages {
        id
        index
        name

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
  }
`;
