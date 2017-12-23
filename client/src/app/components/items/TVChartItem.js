// @flow weak

import React, { PureComponent } from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

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
});

class TVChartItem extends PureComponent {

  componentDidMount()
  {
    const iframeDocument = this.instance.contentWindow.document;

    var s = iframeDocument.createElement('script');
    s.type = 'text/javascript';
    s.src = 'https://s3.tradingview.com/tv.js';

    s.onload = function() {
      var s = iframeDocument.createElement('script');
      s.type = 'text/javascript';
      s.text = `
        new TradingView.widget({
          "autosize": true,
          "symbol": "BITSTAMP:BTCUSD",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "Light",
          "style": "1",
          "locale": "en",
          "toolbar_bg": "#f1f3f6",
          "enable_publishing": false,
          "hide_top_toolbar": true,
          "withdateranges": true,
          "allow_symbol_change": true,
          "save_image": false,
          "hideideas": true
        });
      `;
      iframeDocument.body.appendChild(s);
    };

    this.instance.contentWindow.document.head.appendChild(s);
  }

  render()
  {
    const {
      nightMode,
    } = this.props;

    return (
      <div className={css(styles.container)}>
        <iframe className={css(styles.frame)} ref={(el) => this.instance = el}>
        </iframe>
      </div>
    );
  }
}

export default TVChartItem;
