// @flow weak

import React, {
  Component
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import {
  ConnectedNavigationBar,
}                          from '../../containers';
import MainRoutes          from '../../routes/MainRoutes';
import { withRouter }      from 'react-router-dom';
import Notifications       from '../../components/Notifications';

const styles = StyleSheet.create({
  container: {
    width: '100vw',
    minHeight: '100vh',
    padding: '0% 0%',
    margin: '0% 0%',
    display: 'flex',
    flexDirection: 'column',
  },
});

class App extends Component {

  render() {
    return (
      <div className={css(styles.container)}>
        <ConnectedNavigationBar />
        <MainRoutes />
        <div style={{ height: '100px' }}>
          Hello
          <Notifications />
        </div>
      </div>
    );
  }
}

export default withRouter(App);
