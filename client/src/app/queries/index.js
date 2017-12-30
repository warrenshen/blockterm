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
    $w: Int!,
    $h: Int!,
    $x: Int!,
    $y: Int!,
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

export const CreateDashboardItemMutationOptions = {
  props: ({ mutate, ownProps }) => ({
    createDashboardItem(dashboardPageId, identifier, w, h, x, y) {
      return mutate({
        updateQueries: {
          DashboardItemsQuery: (prev, { mutationResult }) => ({
            user: mutationResult.data.createDashboardItem,
          }),
        },
        variables: {
          dashboardPageId,
          identifier,
          w,
          h,
          x,
          y
        },
      })
      .then(
        (response) => {
          return Promise.resolve();
        }
      )
      .catch(
        (error) => {
          console.log(error);
          return Promise.reject();
        }
      );
    }
  }),
};

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

export const DestroyDashboardItemMutationOptions = {
  props: ({ mutate, ownProps }) => ({
    destroyDashboardItem(dashboardPageId, id) {
      return mutate({
        variables: {
          dashboardPageId,
          id,
        },
        updateQueries: {
          DashboardItemsQuery: (prev, { mutationResult }) => ({
            user: mutationResult.data.destroyDashboardItem,
          }),
        },
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
  }),
};

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

export const UpdateDashboardItemsMutationOptions = {
  props: ({ mutate, ownProps }) => ({
    updateDashboardItems(dashboardPageId, dashboardItems) {
      return mutate({
        updateQueries: {
          DashboardItemsQuery: (prev, { mutationResult }) => ({
            user: mutationResult.data.updateDashboardItems,
          }),
        },
        variables: {
          dashboardPageId,
          dashboardItemsString: JSON.stringify(dashboardItems),
        },
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
  }),
};
