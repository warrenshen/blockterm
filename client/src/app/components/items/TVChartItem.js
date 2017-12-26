// @flow weak

import React, { PureComponent } from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingBottom: '15px',
  },
  frame: {
    width: '100%',
    height: '100%',
    border: 'none',
  },
  nightFrame: {
    backgroundColor: '#000',
  },
});

class TVChartItem extends PureComponent {

  render()
  {
    const {
      nightMode,
      value,
    } = this.props;

    const url =
      'https://s.tradingview.com/widgetembed/?' +
      `symbol=${value}&` +
      'interval=15&' +
      'hidetoptoolbar=1&' + 
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
        <iframe
          className={css(styles.frame, nightMode && styles.nightFrame)}
          src={url}
        />
      </div>
    );
  }
}

export default TVChartItem;
