// @flow weak

import moment from 'moment-timezone';
import {
  AUTH_TOKEN_COOKIE,
  getItem,
} from '../../services/cookie';

import {
  ApolloClient,
  createBatchingNetworkInterface,
  createNetworkInterface,
  addTypename,
}                         from 'react-apollo';
import { appConfig }      from '../../config';

// const networkInterface = createNetworkInterface({
//   // connectToDevTools: true,
//   // transportBatching: true,
//   uri: appConfig.apollo.networkInterface,
// });

// networkInterface.use([{
//   applyMiddleware(req, next) {
//     if (!req.options.headers) {
//       req.options.headers = {};  // Create the header object if needed.
//     }

//     // Get headers from local storage.
//     const authToken = getItem(AUTH_TOKEN_COOKIE);
//     const timeZone = getItem(timeZone);
//     req.options.headers.authorization = authToken ? `Bearer ${authToken}` : null;
//     req.options.headers['X-Time-Zone'] = timeZone ? timeZone : moment.tz.guess();

//     next();
//   }
// }]);

const networkInterface = createBatchingNetworkInterface({
  // connectToDevTools: true,
  // transportBatching: true,
  batchInterval: 50,  // 50 milliseconds.
  uri: appConfig.apollo.networkInterface,
});

networkInterface.use([{
  applyBatchMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }

    // Get headers from local storage.
    const authToken = getItem(AUTH_TOKEN_COOKIE);
    const timeZone = getItem(timeZone);
    req.options.headers.authorization = authToken ? `Bearer ${authToken}` : null;
    req.options.headers['X-Time-Zone'] = timeZone ? timeZone : moment.tz.guess();

    next();
  }
}]);

export const apolloClient = new ApolloClient({ networkInterface });
