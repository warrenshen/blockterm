import gql from 'graphql-tag';
import {
  AUTH_TOKEN_COOKIE,
  DASHBOARD_COOKIE,
  getItem,
  setItem,
} from '../services/cookie';
import {
  ALERTS_ITEM,
  GT_CHART_ITEM,
  PERCENT_DOMINANCE_ITEM,
  PORTFOLIO_ITEM,
  PORTFOLIO_HISTORY_ITEM,
  SUBREDDIT_COMMENT_COUNTS,
  SUBREDDIT_POST_COUNTS,
  TOTAL_MARKET_CAP,
  TV_CANDLE_CHART,
  TV_MARKET_OVERVIEW,
  TWITTER_ITEM,
  parseIdentifier,
} from '../constants/items';

function buildDynamicDashboardQueryField(identifier, extras)
{
  const [identifierKey, identifierValue] = parseIdentifier(identifier);

  switch (identifierKey)
  {
    case PERCENT_DOMINANCE_ITEM:
      return `
        ${identifier}: marketsByName(names: "PERCENT_BITCOIN,PERCENT_ETHEREUM,PERCENT_ALTCOINS") {
          id
          name
          lastPrice
          earliestMarketTickerDate

          marketTickers(timeRange: "${extras.plotRange}") {
            value
            timestamp
          }
        }
      `;
    case PORTFOLIO_ITEM:
      if (identifierValue === 'Default' || identifierValue === 'USD')
      {
        return `
          ${identifier}: user {
            id

            tokenUsers {
              id
              index
              amount

              token {
                id
                shortName
                imageUrl
                priceUSD
                percentChange24h
              }
            }
          }
        `;
      }
      else if (identifierValue === 'BTC')
      {
         return `
           ${identifier}: user {
             id

             tokenUsers {
               id
               index
               amount

               token {
                 id
                 shortName
                 imageUrl
                 priceBTC
                 percentChange24hBTC
               }
             }
           }
        `;
      }
      else
      {
         return `
           ${identifier}: user {
             id

             tokenUsers {
               id
               index
               amount

               token {
                 id
                 shortName
                 imageUrl
                 priceETH
                 percentChange24hETH
               }
             }
           }
        `;
      }
    case PORTFOLIO_HISTORY_ITEM:
      return `
        ${identifier}: user {
          id
          earliestPortfolioTickerDate

          portfolioTickers(timeRange: "${extras.plotRange}") {
            id
            timestamp
            valueUSD
            valueBTC
            valueETH
          }
        }
      `;
    case SUBREDDIT_COMMENT_COUNTS:
      return `
        ${identifier}: subredditByName(name: "${identifierValue}") {
          id
          displayName
          earliestCommentCountDate

          commentCounts(timeRange: "${extras.plotRange}") {
            count
            timestamp
          }
        }
      `;
    case SUBREDDIT_POST_COUNTS:
      return `
        ${identifier}: subredditByName(name: "${identifierValue}") {
          id
          displayName
          earliestPostCountDate

          postCounts(timeRange: "${extras.plotRange}") {
            count
            timestamp
          }
        }
      `;
    case TOTAL_MARKET_CAP:
      return `
        ${identifier}: marketByName(name: "TOTAL") {
          id
          name
          lastPrice
          earliestMarketTickerDate

          marketTickers(timeRange: "${extras.plotRange}") {
            value
            timestamp
          }
        }
      `;
    case ALERTS_ITEM:
    case GT_CHART_ITEM:
    case TV_CANDLE_CHART:
    case TV_MARKET_OVERVIEW:
    case TWITTER_ITEM:
      return null;
    default:
      if (process.env.NODE_ENV === 'dev')
      {
        console.log('MISSING QUERY');
      }
      return null;
  }
};

export function buildDynamicDashboardQuery(dashboardItems, dashboardItemStates)
{
  const queries = dashboardItems.map(
    (dashboardItem) => buildDynamicDashboardQueryField(
      dashboardItem.identifier,
      dashboardItemStates[dashboardItem.identifier],
    )
  );
  if (queries.filter((query) => query !== null).length <= 0)
  {
    return {
      query: null,
      config: null,
    };
  }

  const query = `query DynamicDashboardQuery {
    ${queries.join('')}
  }`;

  return {
    query: gql`${query}`,
    config: {
      options: { pollInterval: 180000 },
    },
  };
}

/* -----------------------------------------
  Queries
------------------------------------------*/
export const AlertsQuery = gql`
  query AlertsQuery {
    user {
      id

      alerts {
        id
        identifier
        expiresAt
        createdAt
        createdAtUnix
      }
    }
  }
`;
export const AlertsQueryOptions = {
  skip: (ownProps) => getItem(AUTH_TOKEN_COOKIE) === null,
};

export const DashboardPagesQuery = gql`
  query DashboardPagesQuery {
    user {
      id

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

export const ExchangeKeysQuery = gql`
  query ExchangeKeysQuery {
    user {
      id

      exchangeKeys {
        id
        exchange
        apiKey
        secretKey
      }
    }
  }
`;
export const ExchangeKeysQueryOptions = {
  skip: (ownProps) => getItem(AUTH_TOKEN_COOKIE) === null,
};

export const PortfolioTickersQuery = gql`
  query ($portfolioHistoryPlotRange: String) {
    user {
      id
      earliestPortfolioTickerDate

      portfolioTickers(timeRange: $portfolioHistoryPlotRange) {
        id
        timestamp
        valueUSD
        valueBTC
        valueETH
      }
    }
  }
`;
export const PortfolioTickersQueryOptions = {
  options: ({
    match,
    portfolioHistoryPlotRange,
  }) => {
    return {
      variables: {
        portfolioHistoryPlotRange: portfolioHistoryPlotRange,
      },
    };
  },
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

    tokenExchangesAll {
      id
      tokenId
      exchange
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
      id

      tokenUsers {
        id
        index
        amount

        tokenExchange {
          id
          exchange
          priceUSD
          priceBTC
          priceETH

          token {
            id
            shortName
            imageUrl
            percentChange24h
            percentChange7d
          }
        }
      }
    }
  }
`;

export const UserQuery = gql`
  query UserQuery {
    user {
      id
      email
    }
  }
`;
export const UserQueryOptions = {
  skip: (ownProps) => getItem(AUTH_TOKEN_COOKIE) === null,
};

/* -----------------------------------------
  Mutations
------------------------------------------*/
export const CreateAlertMutation = gql`
  mutation CreateAlertMutation(
    $identifier: String!,
    $expiresIn: String!,
  ) {
    alert: createAlert(identifier: $identifier, expiresIn: $expiresIn)
    {
      id
      identifier
      expiresAt
    }
  }
`;

export const CreateAlertMutationOptions = {
  props: ({ mutate, ownProps }) => ({
    createAlert(identifier, expiresIn) {
      return mutate({
        variables: {
          identifier,
          expiresIn,
        },
      });
    }
  }),
};

export const CreateDashboardItemMutation = gql`
  mutation CreateDashboardItemMutation(
    $dashboardPageId: ID!,
    $identifier: String!,
    $w: Int!,
    $h: Int!,
    $x: Int!,
    $y: Int!,
  ) {
    user: createDashboardItem(
      dashboardPageId: $dashboardPageId,
      identifier: $identifier,
      w: $w,
      h: $h,
      x: $x,
      y: $y,
    ) {
      id

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
          DashboardPagesQuery: (prev, { mutationResult }) => ({
            user: mutationResult.data.user,
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

export const CreateExchangeKeyMutation = gql`
  mutation CreateExchangeKeyMutation(
    $apiKey: String!,
    $exchange: String!,
    $secretKey: String!,
  ) {
    createExchangeKey(
      apiKey: $apiKey,
      exchange: $exchange,
      secretKey: $secretKey,
    ) {
      id
      exchange
      apiKey
      secretKey
    }
  }
`;

export const CreateExchangeKeyMutationOptions = {
  props: ({ mutate, ownProps }) => ({
    createExchangeKey(exchange, apiKey, secretKey) {
      return mutate({
        variables: {
          apiKey,
          exchange,
          secretKey,
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
        id
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
    user: destroyDashboardItem(
      id: $id,
      dashboardPageId: $dashboardPageId,
    ) {
      id

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
        updateQueries: {
          DashboardPagesQuery: (prev, { mutationResult }) => ({
            user: mutationResult.data.user,
          }),
        },
        variables: {
          dashboardPageId,
          id,
        },
      });
    },
  }),
};

export const ForgotPasswordMutation = gql`
  mutation ForgotPasswordMutation($email: String!) {
    forgotPassword(email: $email)
  }
`;

export const ForgotPasswordMutationOptions = {
  props: ({ mutate, ownProps }) => ({
    forgotPassword(email) {
      return mutate({
        variables: { email },
      });
    }
  }),
};

export const LogInMutation = gql`
  mutation LogInMutation($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      authToken

      user {
        id
        email
      }
    }
  }
`;

export const LogInMutationOptions = {
  props: ({ mutate, ownProps }) => ({
    logIn(email, password) {
      return mutate({
        variables: { email, password },
      });
    },
  }),
};

export const ResetPasswordMutation = gql`
  mutation ResetPasswordMutation(
    $password: String!,
    $resetPasswordToken: String!,
  ) {
    resetPassword(
      password: $password,
      resetPasswordToken: $resetPasswordToken,
    ) {
      authToken

      user {
        id
        email
      }
    }
  }
`;

export const ResetPasswordMutationOptions = {
  props: ({ mutate, ownProps }) => ({
    resetPassword(password) {
      return mutate({
        variables: {
          password,
          resetPasswordToken: ownProps.match.params.token,
        },
      });
    },
  }),
};

export const UpdateAlertMutation = gql`
  mutation UpdateAlertMutation($id: ID!, $status: String!) {
    alert: updateAlert(id: $id, status: $status) {
      id
      identifier
      status
      expiresAt
      createdAt
      createdAtUnix
    }
  }
`;

export const UpdateAlertMutationOptions = {
  props: ({ mutate, ownProps }) => ({
    updateAlert(id, status) {
      return mutate({
        variables: { id, status },
      });
    },
  }),
};

export const UpdateDashboardItemMutation = gql`
  mutation UpdateDashboardItemMutation(
    $dashboardPageId: ID!,
    $id: ID!,
    $identifier: String,
    $static: Boolean,
  ) {
    user: updateDashboardItem(
      dashboardPageId: $dashboardPageId,
      id: $id,
      identifier: $identifier,
      static: $static,
    ) {
      id

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
          DashboardPagesQuery: (prev, { mutationResult }) => ({
            user: mutationResult.data.user,
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
    user: updateDashboardItems(
      dashboardPageId: $dashboardPageId,
      dashboardItemsString: $dashboardItemsString,
    ) {
      id

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
          DashboardPagesQuery: (prev, { mutationResult }) => ({
            user: mutationResult.data.user,
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

export const UpdateDashboardPagesMutation = gql`
  mutation UpdateDashboardPagesMutation($dashboardPagesString: String!) {
    user: updateDashboardPages(
      dashboardPagesString: $dashboardPagesString,
    ) {
      id

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

export const UpdateDashboardPagesMutationOptions = {
  props: ({ mutate, ownProps }) => ({
    updateDashboardPages(dashboardPages) {
      return mutate({
        updateQueries: {
          DashboardPagesQuery: (prev, { mutationResult }) => ({
            user: mutationResult.data.user,
          }),
        },
        variables: {
          dashboardPagesString: JSON.stringify(dashboardPages),
        },
      });
    },
  }),
};

export const UpdateTokenUsersMutation = gql`
  mutation UpdateTokenUsersMutation(
    $tokenUsersString: String!,
  ) {
    updateTokenUsers(tokenUsersString: $tokenUsersString) {
      id

      tokenUsers {
        id
        index
        amount

        tokenExchange {
          id
          exchange
          priceUSD
          priceBTC
          priceETH

          token {
            id
            shortName
            imageUrl
            percentChange24h
            percentChange7d
          }
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

export const UpdateTokenUsersByExchangeMutation = gql`
  mutation UpdateTokenUsersByExchangeMutation(
    $tokenUsersString: String!,
  ) {
    user: updateTokenUsersByExchange(tokenUsersString: $tokenUsersString) {
      id

      tokenUsers {
        id
        index
        amount

        tokenExchange {
          id
          exchange
          priceUSD
          priceBTC
          priceETH

          token {
            id
            shortName
            imageUrl
            percentChange24h
            percentChange7d
          }
        }
      }
    }
  }
`;

export const UpdateTokenUsersByExchangeMutationOptions = {
  props: ({ mutate, ownProps }) => ({
    updateTokenUsersByExchange(tokenUsers) {
      return mutate({
        updateQueries: {
          TokenUsersQuery: (prev, { mutationResult }) => ({
            user: mutationResult.data.user,
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
export const UsersByPageWithDashboardPagesQuery = gql`
  query UsersByPageQuery($page: Int!) {
    users: usersByPage(page: $page, perPage: 1) {
      id
      email
      lastActiveAt

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
export const UsersByPageQueryWithDashboardPagesOptions = {
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

export const UsersByPageWithTokenUsersQuery = gql`
  query UsersByPageQuery($page: Int!) {
    users: usersByPage(page: $page) {
      id
      email
      lastActiveAt

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
export const UsersByPageQueryWithTokenUsersOptions = {
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
