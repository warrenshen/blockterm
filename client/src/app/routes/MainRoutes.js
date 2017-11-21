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
  ConnectedToken,
}                               from '../containers';

export const MainRoutes = () => {
  return (
    <Switch>
      {/* non protected views */}
      <Route exact path="/" component={ConnectedHome} />
      <Route exact path='/subreddit/:id' component={ConnectedSubreddit} />
      <Route exact path='/token/:id' component={ConnectedToken} />
    </Switch>
  );
};

export default MainRoutes;
