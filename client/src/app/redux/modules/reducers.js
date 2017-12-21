// @flow weak

import { combineReducers } from 'redux';
import { routerReducer }   from 'react-router-redux';
import { apolloClient }    from '../../services/apollo';
import plots               from './plots';
import globals             from './globals';
import subreddits          from './subreddits';
import dashboard           from './dashboard';

const appReducers = {
  plots,
  globals,
  subreddits,
  dashboard,
};

// combine reducers -> createStore reducer
const reducers = combineReducers({
  ...appReducers,
  apollo:   apolloClient.reducer(), // apollo reducer
  routing:  routerReducer
});

export default reducers;
