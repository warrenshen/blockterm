// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes          from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import RightNav           from './RightNav';
import { Link }       from 'react-router-dom';
import navigationModel     from '../../models/navigation.json';
import El from '../El';
import * as STYLES from '../../constants/styles';
import Marquee             from '../Marquee';
import {
  clearItem,
  getItem,
  setItem,
} from '../../services/cookie';
import {
  PROJECT_VERSION,
  PATCH_NOTES,
} from '../../constants/items';
import { LAST_SEEN_VERSION } from '../../services/cookie';

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
    color: '#000',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    position: 'absolute',
    left: '148px',
    top: '14px',
    fontSize: '10px',
    fontWeight: '500',
  },
  nightFloatingBeta: {
    color: '#fff',
  },
});

// <a href='https://www.kucoin.com/#/?r=7Na6rQ' target='_blank'>
//   <El style={styles.semibolded} type={'span'}>
//     Trade altcoins with KuCoin!
//   </El>
// </a>

class NavigationBar extends PureComponent
{
  static propTypes = {
    // If there is no auth token cookie, then we do not fetch
    // user from the server and thus may have no data prop.
    data: PropTypes.object,
    isPageLoaded: PropTypes.bool.isRequired,
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
  };

  showLatestUpdates() {
    const {
      createNotificationInfo,
    } = this.props;

    const seenVersion = getItem(LAST_SEEN_VERSION);
    if (seenVersion !== PROJECT_VERSION) {
      setItem(LAST_SEEN_VERSION, PROJECT_VERSION);

      let message = `New in ver. ${PATCH_NOTES[0]}`;
      message = (message.length > 140) ? message.substring(0, 140) + "[...]" : message;
      createNotificationInfo({ position: 'tc', title: message, autoDismiss: 30 });
    }
  }

  componentDidMount()
  {
    this.showLatestUpdates();
  }

  render()
  {
    const {
      data,
      isPageLoaded,
      nightMode,
      toggleNightMode,
      toggleSidebar,
      sidebarActive,
    } = this.props;

    return (
      <div className={css(styles.navbar)}>
        <Marquee
          isPageLoaded={isPageLoaded}
          nightMode={nightMode}
        />
        <nav className={css(styles.container, nightMode && styles.nightMode)}>
          <div className={css(styles.section)}>
            <El type={'span'} nightMode={nightMode} style={styles.floatingBeta} nightModeStyle={styles.nightFloatingBeta}>BETA</El>
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
              user={data && data.user}
              nightMode={nightMode}
              rightLinks={navigationModel.rightLinks}
              toggleNightMode={toggleNightMode}
            />
          </div>
        </nav>
      </div>
    );
  }
}

export default NavigationBar;
