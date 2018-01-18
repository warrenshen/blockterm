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
export const DashboardPagesQueryOptions = {
  skip: (ownProps) => getItem(AUTH_TOKEN_COOKIE) === null,
};

export const SubredditsAllQuery = gql`
 query {
    subredditsAll {
      id
      displayName
      name
      imageUrl
      activeUserCount
      commentCount
      postCount
      subscriberCount

      commentCounts: commentCountsTwoWeeks {
        id
        count
        timestamp
      }
    }
  }
`;
export const SubredditsAllQueryOptions = {
  options: { pollInterval: 180000 },
};

export const TokensAllQuery = gql`
  query TokensAllQuery {
    tokensAll {
      id
      shortName
      longName
      imageUrl
    }
  }
`;

export const TokensByPageQuery = gql`
  query TokensByPageQuery($page: Int!) {
    tokensAll {
      id
      identifier
      shortName
      longName
      imageUrl
    }

    tokensByPage(page: $page) {
      id
      identifier
      shortName
      longName
      imageUrl
      priceUSD
      priceBTC
      volumeUSD24h
      marketCapUSD
      availableSupply
      totalSupply
      maxSupply
      percentChange1h
      percentChange24h
      percentChange7d
    }
  }
`;
export const TokensByPageQueryOptions = {
  options: ({
    match,
  }) => {
    return {
      pollInterval: 180000,
      variables: {
        page: match.params.page ? parseInt(match.params.page) : 1,
      },
    };
  },
};

export const TokenUsersQuery = gql`
  query TokenUsersQuery {
    user {
      tokenUsers {
        id
        index
        amount

        token {
          id
          shortName
          imageUrl
          priceUSD
          priceBTC
          percentChange24h
          percentChange7d
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
      });
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
      });
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
      });
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
      });
    }
  }),
};

export const UpdateDashboardItemMutation = gql`
  mutation UpdateDashboardItemMutation(
    $dashboardPageId: ID!,
    $id: ID!,
    $identifier: String,
    $static: Boolean,
  ) {
    updateDashboardItem(
      dashboardPageId: $dashboardPageId,
      id: $id,
      identifier: $identifier,
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
    updateDashboardItem(dashboardPageId, id, identifier, staticActive) {
      return mutate({
        updateQueries: {
          DashboardItemsQuery: (prev, { mutationResult }) => ({
            user: mutationResult.data.updateDashboardItem,
          }),
        },
        variables: {
          dashboardPageId,
          id,
          identifier,
          static: staticActive,
        },
      });
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
      });
    },
  }),
};

export const UpdateTokenUsersMutation = gql`
  mutation UpdateTokenUsersMutation(
    $tokenUsersString: String!,
  ) {
    updateTokenUsers(tokenUsersString: $tokenUsersString)
    {
      tokenUsers {
        id
        index
        amount

        token {
          id
          shortName
          imageUrl
          priceUSD
          priceBTC
          percentChange24h
          percentChange7d
        }
      }
    }
  }
`;

export const UpdateTokenUsersMutationOptions = {
  props: ({ mutate, ownProps }) => ({
    updateTokenUsers(tokenUsers) {
      return mutate({
        updateQueries: {
          TokenUsersQuery: (prev, { mutationResult }) => ({
            user: mutationResult.data.updateTokenUsers,
          }),
        },
        variables: {
          tokenUsersString: JSON.stringify(tokenUsers),
        },
      });
    },
  }),
};

/* -----------------------------------------
  Admin queries
------------------------------------------*/
export const UsersByPageQuery = gql`
  query UsersByPageQuery($page: Int!) {
    usersByPage(page: $page) {
      id
      email

      tokenUsers {
        id
        index
        amount

        token {
          id
          shortName
          imageUrl
          priceUSD
          priceBTC
          percentChange24h
          percentChange7d
        }
      }
    }
  }
`;
export const UsersByPageQueryOptions = {
  options: ({
    match,
  }) => {
    return {
      variables: {
        page: match.params.page ? parseInt(match.params.page) : 1,
      },
    };
  },
};
