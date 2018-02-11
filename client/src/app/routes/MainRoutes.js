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
  ConnectedPortfolio,
  ConnectedSignup,
  ConnectedSubreddit,
  ConnectedSubreddits,
  ConnectedSubredditsCompare,
  ConnectedToken,
  ConnectedTokens,
  ConnectedFAQ,
}                     from '../containers';
import ConnectedApiKeys from '../containers/ApiKeys';
import ConnectedForgot from '../containers/Forgot';
import ConnectedReset from '../containers/Reset';
import AdminPortolios from '../containers/AdminPortfolios';
import AdminDashboards from '../containers/AdminDashboards';

export const MainRoutes = () => {
  return (
    <Switch>
      <Route exact path='/' component={ConnectedHome} />

      <Route exact path='/faq' component={ConnectedFAQ} />

      <Route exact path='/join' component={ConnectedSignup} />
      <Route exact path='/login' component={ConnectedLogin} />

      <Route exact path='/forgot' component={ConnectedForgot} />
      <Route exact path='/reset/:token' component={ConnectedReset} />

      <Route exact path='/portfolio' component={ConnectedPortfolio} />
      <Route exact path='/apiKeys' component={ConnectedApiKeys} />

      <Route exact path='/subreddits' component={ConnectedSubreddits} />
      <Route exact path='/subreddits/compare' component={ConnectedSubredditsCompare} />
      <Route exact path='/subreddit/:name' component={ConnectedSubreddit} />

      <Route exact path='/tokens' component={ConnectedTokens} />
      <Route exact path='/tokens/:page' component={ConnectedTokens} />
      <Route exact path='/token/:identifier' component={ConnectedToken} />

      { /** Admin only **/ }

      <Route exact path='/admin/dashboards' component={AdminDashboards} />
      <Route exact path='/admin/dashboards/:page' component={AdminDashboards} />

      <Route exact path='/admin/portfolios' component={AdminPortolios} />
      <Route exact path='/admin/portfolios/:page' component={AdminPortolios} />
    </Switch>
  );
};

export default MainRoutes;
