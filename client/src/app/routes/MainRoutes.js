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
  ConnectedLogin,
  ConnectedSignup,
  ConnectedSubreddit,
  ConnectedSubreddits,
  ConnectedSubredditsCompare,
  ConnectedToken,
  ConnectedTokens,
}                               from '../containers';

export const MainRoutes = () => {
  return (
    <Switch>
      <Route exact path='/' component={ConnectedHome} />

      <Route exact path='/login' component={ConnectedLogin} />
      <Route exact path='/join' component={ConnectedSignup} />

      <Route exact path='/subreddits' component={ConnectedSubreddits} />
      <Route exact path='/subreddits/compare' component={ConnectedSubredditsCompare} />

      <Route exact path='/subreddit/:name' component={ConnectedSubreddit} />

      <Route exact path='/tokens' component={ConnectedTokens} />
      <Route exact path='/token/:shortName' component={ConnectedToken} />
    </Switch>
  );
};

export default MainRoutes;
