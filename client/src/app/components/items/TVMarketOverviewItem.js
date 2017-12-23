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
      <span id="tradingview-copyright"><a ref="nofollow noopener" target="_blank" href="http://www.tradingview.com" style="color: rgb(173, 174, 176); font-family: &quot;Trebuchet MS&quot;, Tahoma, Arial, sans-serif; font-size: 13px;">Market Quotes by <span style="color: #3BB3E4">TradingView</span></a></span>
      <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js">
      {
        "showChart": true,
        "locale": "en",
        "width": "100%",
        "height": "100%",
        "plotLineColorGrowing": "rgba(60, 188, 152, 1)",
        "plotLineColorFalling": "rgba(255, 74, 104, 1)",
        "gridLineColor": "rgba(203, 203, 203, 1)",
        "scaleFontColor": "rgba(66, 66, 66, 1)",
        "belowLineFillColorGrowing": "rgba(217, 234, 211, 0.05)",
        "belowLineFillColorFalling": "rgba(255, 74, 104, 0.05)",
        "symbolActiveColor": "rgba(228, 244, 248, 1)",
        "tabs": [
          {
            "title": "VS USD",
            "symbols": [
              {
                "s": "BITSTAMP:BTCUSD",
                "d": "Bitcoin : US Dollar"
              },
              {
                "s": "BITSTAMP:ETHUSD",
                "d": "Ethereum : US Dollar"
              },
              {
                "s": "BITSTAMP:LTCUSD",
                "d": "Litecoin : US Dollar"
              },
              {
                "s": "BITFINEX:BCHUSD",
                "d": "Bitcoin Cash : US Dollar"
              },
              {
                "s": "BITSTAMP:XRPUSD",
                "d": "Ripple : US Dollar"
              },
              {
                "s": "BITFINEX:IOTUSD",
                "d": "Iota : US Dollar"
              },
              {
                "s": "BITTREX:DASHUSD",
                "d": "Bitcoin : US Dollar"
              },
              {
                "s": "BITFINEX:XMRUSD",
                "d": "Monero : US Dollar"
              }
            ]
          },
          {
            "title": "VS BTC",
            "symbols": [
              {
                "s": "BITSTAMP:ETHBTC",
                "d": "Ethereum : Bitcoin"
              },
              {
                "s": "BITSTAMP:LTCBTC",
                "d": "Litecoin : Bitcoin"
              },
              {
                "s": "BITSTAMP:BCHBTC",
                "d": "Bitcoin Cash : Bitcoin"
              },
              {
                "s": "BITSTAMP:XRPBTC",
                "d": "Ripple : Bitcoin"
              },
              {
                "s": "BITFINEX:IOTBTC",
                "d": "Iota : Bitcoin"
              },
              {
                "s": "POLONIEX:DASHBTC",
                "d": "Dash : Bitcoin"
              },
              {
                "s": "BITTREX:XMRBTC",
                "d": "Monero : Bitcoin"
              }
            ]
          }
        ]
      }
      </script>
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
