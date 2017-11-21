// @flow weak

import React              from 'react';
import PropTypes          from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import RightNav           from './RightNav';
import { Link }       from 'react-router-dom';
import navigationModel     from '../../models/navigation.json';
import El from '../El';


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
  nightMode: {
    backgroundColor: '#373b3e',
  },
  brand: {
    fontSize: '18px',
    fontWeight: '700',
  },
  section: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const NavigationBar = ({
  nightMode,
  toggleNightMode,
}) => {
  return (
    <nav className={css(styles.container, nightMode && styles.nightMode)}>
      <div className={css(styles.section)}>
        <Link to={'/'}>
          <El nightMode={nightMode} style={styles.brand} type={'span'}>
            Cryptotrends
          </El>
        </Link>
      </div>
      <div className={css(styles.section)}>
        <RightNav
          rightLinks={navigationModel.rightLinks}
          nightMode={nightMode}
          toggleNightMode={toggleNightMode}
        />
      </div>
    </nav>
  );
};

NavigationBar.propTypes = {
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
  }),
  nightMode: PropTypes.bool.isRequired,
  toggleNightMode: PropTypes.func.isRequired,
};

export default NavigationBar;
