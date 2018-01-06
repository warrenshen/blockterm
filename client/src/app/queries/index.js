import gql from 'graphql-tag';
import {
  AUTH_TOKEN_COOKIE,
  DASHBOARD_COOKIE,
  getItem,
  setItem,
} from '../services/cookie';

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
          static
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
          static
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
    },
  }),
};

export const CreateUserMutation = gql`
  mutation CreateUserMutation(
    $email: String!,
    $password: String!,
    $dashboardPagesString: String
  ) {
    createUser(
      email: $email,
      password: $password,
      dashboardPagesString: $dashboardPagesString
    ) {
      authToken

      user {
        email
      }
    }
  }
`;

export const CreateUserMutationOptions = {
  props: ({ mutate, ownProps }) => ({
    createUser(email, password) {
      const dashboardPagesString = getItem(DASHBOARD_COOKIE, true);
      return mutate({
        updateQueries: {
          UserQuery: (prev, { mutationResult }) => {
            setItem(AUTH_TOKEN_COOKIE, mutationResult.data.createUser.authToken);
            return {
              user: mutationResult.data.createUser.user,
            };
          },
        },
        variables: {
          dashboardPagesString,
          email,
          password,
        },
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
    },
  }),
};

export const DestroyDashboardItemMutation = gql`
  mutation DestroyDashboardItemMutation(
    $dashboardPageId: ID!,
    $id: ID!,
  ) {
    destroyDashboardItem(id: $id, dashboardPageId: $dashboardPageId) {
      dashboardPages {
        id
        index
        name

        dashboardItems {
          id
          identifier
          static
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
    },
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

export const LogInMutationOptions = {
  props: ({ mutate, ownProps }) => ({
    logIn(email, password) {
      return mutate({
        updateQueries: {
          UserQuery: (prev, { mutationResult }) => {
            setItem(AUTH_TOKEN_COOKIE, mutationResult.data.logIn.authToken);
            return {
              user: mutationResult.data.logIn.user,
            };
          },
        },
        variables: { email, password },
      })
      .then(
        (response) => {
          return Promise.resolve(response);
        }
      )
      .catch(
        (error) => {
          return Promise.reject(error);
        }
      );
    }
  }),
};

export const UpdateDashboardItemMutation = gql`
  mutation UpdateDashboardItemMutation(
    $dashboardPageId: ID!,
    $id: ID!,
    $static: Boolean!,
  ) {
    updateDashboardItem(
      dashboardPageId: $dashboardPageId,
      id: $id,
      static: $static,
    ) {
      dashboardPages {
        id
        index
        name

        dashboardItems {
          id
          identifier
          static
          w
          h
          x
          y
        }
      }
    }
  }
`;

export const UpdateDashboardItemMutationOptions = {
  props: ({ mutate, ownProps }) => ({
    updateDashboardItem(dashboardPageId, id, staticActive) {
      return mutate({
        updateQueries: {
          DashboardItemsQuery: (prev, { mutationResult }) => ({
            user: mutationResult.data.updateDashboardItem,
          }),
        },
        variables: {
          dashboardPageId,
          id,
          static: staticActive,
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
    },
  }),
};

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
          static
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
    },
  }),
};
