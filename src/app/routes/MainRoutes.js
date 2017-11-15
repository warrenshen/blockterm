// @flow weak

import React                 from 'react';
import {
 Route,
 Switch,
 Redirect
}                             from 'react-router-dom';
import {
  // app:
  App,
  // non protected views
  ConnectedHome,
}                               from '../containers';

export const MainRoutes = () => {
  return (
    <Switch>
      {/* non protected views */}
      <Route exact path="/" component={ConnectedHome} />
    </Switch>
  );
};

export default MainRoutes;
