// @flow weak

import React, { PureComponent } from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import * as STYLES         from '../../constants/styles';


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingBottom: '15px',
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
  floatingIcon: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    zIndex: '1',
    //backgroundColor: STYLES.TVBLUE,
  },
});

class TVChartItem extends PureComponent {

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
      'interval=15&' +
      'hidesidetoolbar=1&' +
      'symboledit=0&' +
      'saveimage=0&' +
      'toolbarbg=rgba(0,0,0,0)&' +
      'hideideas=1&' +
      `theme=${nightMode ? "Dark" : "Light"}&` +
      'timezone=exchange'
    ;

    return (
      <div className={css(styles.container)}>
        <div className={css(styles.floatingIcon)}>
          <img className={css(styles.image)} src='https://files.coinmarketcap.com/static/img/coins/32x32/icon.png' width={30} height={30}></img>
        </div>
        <iframe
          scrolling="no"
          className={css(styles.frame, nightMode && styles.nightFrame, dashboardAction && styles.noPointerEvents)}
          src={url}
        />
      </div>
    );
  }
}

export default TVChartItem;
