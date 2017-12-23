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
    borderBottom: '2px solid #aaa',
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
    borderBottom: '1px solid #aaa',
  },
  nightMode: {
    backgroundColor: '#000',
    borderBottom: '2px solid #555',
    //backgroundColor: '#020b0e',
  },
  brand: {
    fontWeight: '700',
    letterSpacing: '3px',
    textTransform: 'uppercase',
  },
  hoverColor: {
    fontSize: '18px',
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
    backgroundColor: STYLES.GOLD,    
    justifyContent: 'right !important',
    alignItems: 'right !important',
    //border: '1px solid darkorange',
  },
  promotionNight: {
    backgroundColor: STYLES.BLAZINGREEN,
  },
  semibolded: {
    fontWeight: '500 !important',
  },
});

const NavigationBar = ({
  nightMode,
  toggleNightMode,
}) => {
  var feed = [];  //generate fake feed content
  for (var i = 0; i < 7; i++) {
    feed.push(`BTC 15500 | ETH 800 | XMR 430 | `);
  }
  //end of nicks feed nonsense
  return (
    <div>
      <nav className={css(styles.banner, nightMode && styles.nightMode)}>
        <div className={css(styles.tickerbar)}>
          <El nightMode={nightMode} type={'span'}>
            {feed}
          </El>
        </div>
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
          <Link className={css(styles.brand)} to={'/'}>
            <El 
              style={styles.hoverColor}
              nightMode={nightMode}
              nightModeStyle={styles.nightHover}
              type={'span'}
            >
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
