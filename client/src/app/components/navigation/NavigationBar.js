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
    zIndex: 1,
    //borderTop: '1px solid rgba(0,0,0,0.2)',
    borderBottom: `2px solid ${STYLES.BORDERLIGHT}`,
  },
  banner: {
    width: '100vw',
    padding: '0px 20px',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 100,
    //borderTop: '1px solid rgba(0,0,0,0.2)',
    borderBottom: `1px solid ${STYLES.BORDERLIGHT}`,
  },
  nightMode: {
    backgroundColor: '#000',
    borderBottom: `2px solid ${STYLES.BORDERDARK}`,
    //backgroundColor: '#020b0e',
  },
  bannerNight: {
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
  tickerbar: {
    overflow: 'hidden',
    overflowX: 'scroll',
    whiteSpace: 'nowrap',
  },
  promotion: {
    position:'absolute',
    right: '0px',
    zIndex: '2',
    padding: '0px 10px',
    backgroundColor: STYLES.BLAZINGREEN,
    justifyContent: 'right !important',
    alignItems: 'right !important',
    top: '-20px',
  },
  promotionNight: {
    backgroundColor: STYLES.GOLD,
  },
  semibolded: {
    fontWeight: '500 !important',
    ':hover': {
      color: STYLES.GOLDINVERSEBLUE,
      borderColor: STYLES.GOLDINVERSEBLUE,
    },
  },
  floatingBeta: {
    textTransform: 'uppercase',
    letterSpacing: '2px',
    position: 'absolute',
    left: '148px',
    top: '14px',
    fontSize: '10px',
    fontWeight: '500',
  }
});

const NavigationBar = ({
  data,
  nightMode,
  toggleNightMode,
  toggleSidebar,
  sidebarActive,
}) => {
  return (
    <div className={css(styles.navbar)}>
      <nav className={css(styles.banner, nightMode && styles.bannerNight)}>
        <div className={css(styles.promotion, nightMode && styles.promotionNight)}>
          <a href='https://www.binance.com/?ref=10907326' target='_blank'>
            <El style={styles.semibolded} type={'span'}>
              Trade Altcoins with Binance
            </El>
          </a>
        </div>
      </nav>

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
            toggleSidebar={toggleSidebar}
            sidebarActive={sidebarActive}
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
  toggleSidebar: PropTypes.func.isRequired,
};

export default NavigationBar;
