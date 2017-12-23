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
  nightFrame: {
    backgroundColor: '#000',
  },
});

class TVChartItem extends PureComponent {

  componentDidMount()
  {
    this.update();
  }

  componentDidUpdate()
  {
    this.update();
  }

  update() {
    const {
      nightMode,
    } = this.props;

    const iframeDocument = this.instance.contentWindow.document;
    while (iframeDocument.body.firstChild) iframeDocument.body.removeChild(iframeDocument.body.firstChild);

    var s = iframeDocument.createElement('script');
    s.type = 'text/javascript';
    s.src = 'https://s3.tradingview.com/tv.js';

    const text = `
      new TradingView.widget({
        "autosize": true,
        "symbol": "BITSTAMP:BTCUSD",
        "interval": "1",
        "timezone": "America/Los_Angeles",
        "theme": "${nightMode ? "Dark" : "Light"}",
        "style": "1",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "hide_top_toolbar": true,
        "withdateranges": true,
        "save_image": false,
        "hideideas": true
      });
    `;

    s.onload = function() {
      var s = iframeDocument.createElement('script');
      s.type = 'text/javascript';
      s.text = text;
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
        <iframe className={css(styles.frame, nightMode && styles.nightFrame)} ref={(el) => this.instance = el}>
        </iframe>
      </div>
    );
  }
}

export default TVChartItem;
