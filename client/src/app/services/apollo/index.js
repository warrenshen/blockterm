// @flow weak

import {
  AUTH_TOKEN_COOKIE,
  getItem,
} from '../../services/cookie';

import {
  ApolloClient,
  createNetworkInterface,
  addTypename,
}                         from 'react-apollo';
import { appConfig }      from '../../config';

const networkInterface = createNetworkInterface({
  uri: appConfig.apollo.networkInterface,
  connectToDevTools: true,
  // transportBatching: true
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    // Get the authentication token from local storage if it exists.
    const authToken = getItem(AUTH_TOKEN_COOKIE);
    if (authToken) {
      req.options.headers.authorization = authToken ? `Bearer ${authToken}` : null;
    }
    next();
  }
}]);

export const apolloClient = new ApolloClient({ networkInterface });

export default apolloClient;
