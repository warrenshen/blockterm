// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import moment              from 'moment-timezone';
import * as STYLES         from '../../constants/styles';
import {
  ITEM_VALUE_TO_IMAGE,
  getImageUrl,
}                          from '../../constants/items.js';
import El                  from '../El';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  noPointerEvents: {
    pointerEvents: 'none',
  },
  frame: {
    width: '100%',
    height: '100%',
    border: 'none',
  },
  nightFrame: {
    backgroundColor: '#000',
  },
  extras: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    top: '5px',
    right: '5px',
    zIndex: '1',
  },
  activeAlerts: {
    padding: '4px 8px',
    border: '1px solid #000',
    borderRadius: '2px',
  },
  activeAlertsNightMode: {
    border: '1px solid #f3f3f3',
  },
});

class TVChartItem extends PureComponent
{
  renderExtras()
  {
    const {
      alerts,
      nightMode,
      value,
    } = this.props;

    const validAlerts = alerts.filter(
      (alert) => alert.identifier.indexOf(value) === 0
    );
    return (
      <div className={css(styles.extras)}>
        {
          validAlerts.length > 0 && (
            <El
              nightMode={nightMode}
              style={styles.activeAlerts}
              nightModeStyle={styles.activeAlertsNightMode}
              type={'span'}
            >
              {`${validAlerts.length} active alert(s)`}
            </El>
          )
        }
        {
          value in ITEM_VALUE_TO_IMAGE && (
            <img
              className={css(styles.image)}
              src={getImageUrl(ITEM_VALUE_TO_IMAGE[value])}
              width={32}
              height={32}
            />
          )
        }
      </div>
    );

  }

  render()
  {
    const {
      dashboardAction,
      nightMode,
      value,
    } = this.props;

    const url =
      'https://s.tradingview.com/widgetembed/?' +
      `symbol=${value}&` +
      'interval=5&' +
      'withdateranges=1&' +
      'hideideas=1&' +
      'hidesidetoolbar=1&' +
      'symboledit=0&' +
      'saveimage=0&' +
      'toolbarbg=rgba(0,0,0,0)&' +
      `theme=${nightMode ? "Dark" : "Light"}&` +
      `timezone=${moment.tz.guess()}`
    ;

    return (
      <div className={css(styles.container, dashboardAction && styles.noPointerEvents)}>
        {this.renderExtras()}
        <iframe
          className={css(styles.frame, nightMode && styles.nightFrame)}
          scrolling="no"
          src={url}
        />
      </div>
    );
  }
}

export default TVChartItem;
