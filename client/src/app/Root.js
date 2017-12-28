// @flow weak

import React, {
  Component
}                               from 'react';
import {
  BrowserRouter as Router,
}                               from 'react-router-dom';
import {
  createBrowserHistory as createHistory,
}                               from 'history';
import {
  ApolloProvider
}                               from 'react-apollo';
import { apolloClient }         from './services/apollo';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore           from './redux/store/configureStore';
import App                      from './containers/app/App';

const history         = createHistory();
const store           = configureStore();
const syncedHistory   = syncHistoryWithStore(history, store);

const client = apolloClient;

class Root extends Component {
  render() {
    return (
      <ApolloProvider client={client} store={store}>
        <div>
          <Router history={syncedHistory}>
            <App />
          </Router>
        </div>
      </ApolloProvider>
    );
  }
}

export default Root;
