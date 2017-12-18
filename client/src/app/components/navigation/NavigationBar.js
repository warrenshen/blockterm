// @flow weak

import React              from 'react';
import PropTypes          from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import RightNav           from './RightNav';
import { Link }       from 'react-router-dom';
import navigationModel     from '../../models/navigation.json';
import El from '../El';
import * as STYLES from '../../constants/styles';


const styles = StyleSheet.create({
  container: {
    width: '100vw',
    height: '48px',
    padding: '0px 20px',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  nightMode: {
    backgroundColor: '#000',
    //backgroundColor: '#020b0e',
  },
  brand: {
    fontSize: '16px',
    fontWeight: '700',
    letterSpacing: '4px',
    textTransform: 'uppercase',
    ':hover': {
      textDecoration: 'none',
      color: STYLES.GOLD,
    }
  },
  hoverColor: {
    ':hover': {
      color: STYLES.GOLD,
    }
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
        <Link className={css(styles.brand)} to={'/'}>
          <El style={styles.hoverColor} nightMode={nightMode} type={'span'}>
            {navigationModel.brand}
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
