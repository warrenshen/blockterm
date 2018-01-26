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
} from '../../constants/items.js';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
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

class TVChartItemLarge extends PureComponent
{
  render()
  {
    const {
      nightMode,
      value,
    } = this.props;

    const url =
      'https://s.tradingview.com/widgetembed/?' +
      `symbol=${value}&` +
      'interval=5&' +
      'withdateranges=1&' +
      'hideideas=1&' +
      'hidesidetoolbar=0&' +
      'symboledit=0&' +
      'saveimage=1&' +
      'toolbarbg=rgba(0,0,0,0)&' +
      `theme=${nightMode ? "Dark" : "Light"}&` +
      `timezone=${moment.tz.guess()}`
    ;

    return (
      <div className={css(styles.container)}>
        <iframe
          scrolling="no"
          className={css(styles.frame, nightMode && styles.nightFrame)}
          src={url}
        />
      </div>
    );
  }
}

export default TVChartItemLarge;
