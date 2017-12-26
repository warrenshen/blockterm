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

const styles = StyleSheet.create({
  container: {
    width: '100vw',
    height: '100vh',
    padding: '0% 0%',
    margin: '0% 0%',
    display: 'block',
  },
});

class App extends Component {

  render() {
    return (
      <div className={css(styles.container)}>
        <ConnectedNavigationBar />
        <MainRoutes />
      </div>
    );
  }
}

export default withRouter(App);
