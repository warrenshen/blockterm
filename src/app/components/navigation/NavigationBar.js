// @flow weak

import React              from 'react';
import PropTypes          from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import LeftNav            from './leftNav/LeftNav';
import RightNav           from './rightNav/RightNav';
import { Link }       from 'react-router-dom';

const styles = StyleSheet.create({
  container: {
    width: '100vw',
    height: '48px',
    padding: '0% 15%',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  brandSection: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const NavigationBar = ({
  brand,
  navModel,
  handleLeftNavItemClick,
  handleRightNavItemClick,
  userIsAuthenticated,
  handleNightModeClick,
  nightMode
}) => {
  return (
    <nav className={css(styles.container)}>
      <div className={css(styles.brandSection)}>
        <Link to={'/'}>
          {brand}
        </Link>
      </div>
      <div
        className="collapse navbar-collapse"
        id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav">
          {
            <LeftNav
              leftLinks={navModel.leftLinks}
              onLeftNavButtonClick={handleLeftNavItemClick}
            />
          }
        </ul>
        <ul className="nav navbar-nav navbar-right">
          {
            <RightNav
              rightLinks={navModel.rightLinks}
              onRightNavButtonClick={handleRightNavItemClick}
              handleNightModeClick={handleNightModeClick}
              nightMode={nightMode}
            />
          }
        </ul>
      </div>
    </nav>
  );
};

NavigationBar.propTypes = {
  brand:                    PropTypes.string,
  handleLeftNavItemClick:   PropTypes.func,
  handleRightNavItemClick:  PropTypes.func,
  navModel:                 PropTypes.shape({
    leftLinks:  PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        link : PropTypes.string.isRequired
      })
    ).isRequired,
    rightLinks:  PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        link : PropTypes.string.isRequired
      })
    ).isRequired
  })
};

NavigationBar.defaultProps = {
  brand: 'brand'
};

export default NavigationBar;
