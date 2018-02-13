// @flow weak

import { combineReducers }          from 'redux';
import { routerReducer }            from 'react-router-redux';
import { apolloClient }             from '../../services/apollo';
import { reducer as notifications } from 'react-notification-system-redux';
import alerts                       from './alerts';
import balances                     from './balances';
import exchanges                    from './exchanges';
import globals                      from './globals';
import dashboard                    from './dashboard';
import dashboardPages               from './dashboardPages';
import login                        from './login';
import plots                        from './plots';
import portfolio                    from './portfolio';
import subreddits                   from './subreddits';
import token                        from './token'

const appReducers = {
  alerts,
  balances,
  dashboard,
  dashboardPages,
  exchanges,
  globals,
  login,
  notifications,
  plots,
  portfolio,
  subreddits,
  token,
};

// combine reducers -> createStore reducer
const reducers = combineReducers({
  ...appReducers,
  apollo:   apolloClient.reducer(), // apollo reducer
  routing:  routerReducer,
});

export default reducers;
