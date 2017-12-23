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
    //borderTop: '1px solid rgba(0,0,0,0.2)',
    borderBottom: '2px solid rgba(0,0,0,0.2)',
  },
  banner: {
    width: '100vw',
    padding: '0px 20px',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
    //borderTop: '1px solid rgba(0,0,0,0.2)',
    borderBottom: '1px solid rgba(0,0,0,0.2)',
  },
  nightMode: {
    backgroundColor: '#000',
    borderBottom: '2px solid rgba(255,255,255,0.2)',
    //backgroundColor: '#020b0e',
  },
  brand: {
    fontWeight: '700',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    ':hover': {
      textDecoration: 'none',
      color: STYLES.GOLD,
    }
  },
  hoverColor: {
    fontSize: '16px',
    fontWeight: 'inherit',
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
    backgroundColor: STYLES.GOLD,    
    justifyContent: 'right !important',
    alignItems: 'right !important',
    //border: '1px solid darkorange',
  }
});

const NavigationBar = ({
  nightMode,
  toggleNightMode,
}) => {
  return (
    <div>
      <nav className={css(styles.banner, nightMode && styles.nightMode)}>
        <div className={css(styles.tickerbar)}>
          <El nightMode={nightMode} type={'span'}>
            BTC 15500 | ETH 800 | XMR 430 | BTC 15500 | ETH 800 | XMR 430 | BTC 15500 | ETH 800 | XMR 430 | BTC 15500 | ETH 800 | XMR 430 | BTC 15500 | ETH 800 | XMR 430 | BTC 15500 | ETH 800 | XMR 430 | 
          </El>
        </div>
        <div className={css(styles.promotion)}>
          <Link to={'https://www.binance.com/?ref=10907326'}>
            <El type={'span'}>
              Trade Altcoins with Binance!
            </El>
          </Link>
        </div>
      </nav>
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
    </div>
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
