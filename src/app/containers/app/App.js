// @flow weak

import React, {
  Component
}                             from 'react';
import PropTypes              from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import {
  NavigationBar,
  BackToTop
}                             from '../../components';
import navigationModel        from '../../models/navigation.json';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import MainRoutes             from '../../routes/MainRoutes';
import {
  withRouter
}                             from 'react-router-dom';

const styles = StyleSheet.create({
  container: {
    width: '100vw',
    height: '100vh',
    padding: '0% 0%',
    margin: '0% 0%',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
});

class App extends Component {
  static propTypes = {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,
  }

  state = {
    navModel : navigationModel
  };

  render() {
    const { navModel } = this.state;

    const {
      children,
    } = this.props;

    return (
      <div className={css(styles.container)}>
        <NavigationBar
          brand={navModel.brand}
          navModel={navModel}
          handleLeftNavItemClick={this.handleLeftNavItemClick}
          handleRightNavItemClick={this.handleRightNavItemClick}
          handleNightModeClick={this.handleNightModeClick}
        />
        <MainRoutes />
        <BackToTop
          minScrollY={40}
          scrollTo={'appContainer'}
        />
      </div>
    );
  }

  handleLeftNavItemClick = (event, viewName) => {
    if (viewName === 'logout') {
      const {
        actions: {
          setUserLogout
        }
      } = this.props;
      setUserLogout();
    }
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(
      {
      },
      dispatch)
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
