// @flow weak

import React                 from 'react';
import {
 Route,
 Switch,
 Redirect
}                             from 'react-router-dom';
import {
  App,
  ConnectedHome,
  ConnectedSubreddit,
  ConnectedSubreddits,
  ConnectedSubredditsCompare,
  ConnectedToken,
  ConnectedTokens,
}                               from '../containers';

export const MainRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={ConnectedHome} />

      <Route exact path='/subreddits' component={ConnectedSubreddits} />
      <Route exact path='/subreddits/compare' component={ConnectedSubredditsCompare} />

      <Route exact path='/subreddit/:id' component={ConnectedSubreddit} />

      <Route exact path='/tokens' component={ConnectedTokens} />
      <Route exact path='/token/:id' component={ConnectedToken} />
    </Switch>
  );
};

export default MainRoutes;
