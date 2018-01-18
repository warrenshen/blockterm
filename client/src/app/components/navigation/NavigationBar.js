// @flow weak

import React              from 'react';
import PropTypes          from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import RightNav           from './RightNav';
import { Link }       from 'react-router-dom';
import navigationModel     from '../../models/navigation.json';
import El from '../El';
import * as STYLES from '../../constants/styles';
import Marquee             from '../Marquee';

const styles = StyleSheet.create({
  navbar: {
    zIndex:'2',
  },
  container: {
    width: '100vw',
    height: '48px',
    padding: '0px 12px',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: '3',
    borderBottom: `1px solid ${STYLES.BORDERLIGHT}`,
  },
  nightMode: {
    backgroundColor: '#000',
    borderBottom: `1px solid ${STYLES.BORDERDARK}`,
  },
  brand: {
    fontWeight: '700',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    ':hover': {
      color: STYLES.GOLDINVERSEBLUE,
      borderColor: STYLES.GOLDINVERSEBLUE,
    },
  },
  hoverColor: {
    fontSize: '20px',
    fontWeight: 'inherit',
  },
  nightHover: {
    color: '#fff',
    ':hover': {
      color: STYLES.GOLD,
    },
  },
  section: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ':hover': {
    //  borderBottom: '1px solid #000',
    },
  },
  semibolded: {
    fontWeight: '500 !important',
    ':hover': {
      color: STYLES.GOLDINVERSEBLUE,
      borderColor: STYLES.GOLDINVERSEBLUE,
    },
  },
  floatingBeta: {
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    position: 'absolute',
    left: '148px',
    top: '14px',
    fontSize: '10px',
    fontWeight: '500',
  }
});

// <a href='https://www.kucoin.com/#/?r=7Na6rQ' target='_blank'>
//   <El style={styles.semibolded} type={'span'}>
//     Trade altcoins with KuCoin!
//   </El>
// </a>

const NavigationBar = ({
  data,
  isPageLoaded,
  nightMode,
  toggleNightMode,
  toggleSidebar,
  sidebarActive,
}) => {
  return (
    <div className={css(styles.navbar)}>
      <Marquee
        isPageLoaded={isPageLoaded}
        nightMode={nightMode}
      />
      <nav className={css(styles.container, nightMode && styles.nightMode)}>
        <div className={css(styles.section)}>
          <El type={'span'} nightMode={nightMode} style={styles.floatingBeta}>BETA</El>
          <Link className={css(styles.brand)} to={'/'}>
            <El
              nightMode={nightMode}
              nightModeStyle={styles.nightHover}
              style={styles.hoverColor}
              type={'span'}
            >
              {navigationModel.brand}
            </El>
          </Link>
        </div>
        <div className={css(styles.section)}>
          <RightNav
            user={data.user}
            nightMode={nightMode}
            rightLinks={navigationModel.rightLinks}
            toggleNightMode={toggleNightMode}
          />
        </div>
      </nav>
    </div>
  );
};

NavigationBar.propTypes = {
  data: PropTypes.object.isRequired,
  navModel: PropTypes.shape({
    leftLinks:  PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        link : PropTypes.string.isRequired
      })
    ).isRequired,
    rightLinks: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        link : PropTypes.string.isRequired
      })
    ).isRequired
  }),
  nightMode: PropTypes.bool.isRequired,
  toggleNightMode: PropTypes.func.isRequired,
  // toggleSidebar: PropTypes.func.isRequired,
};

export default NavigationBar;
