// @flow weak

import React, { PureComponent } from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import El from '../El';

const styles = StyleSheet.create({
  wrapper: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  container: {
    width: '100%',
    height: '100%',
    marginTop: '-35px',
  },
  nightContainer: {
    filter: 'hue-rotate(180deg) !important',
  },
  noPointerEvents: {
    pointerEvents: 'none',
  },
  frame: {
    width: '100% !important',
    height: '100% !important',
    border: 'none',
    transform: 'scale(1.05)',
  },
  nightFrame: {
    filter: 'invert(100%) brightness(2) !important',
  },
  tradingView: {
    position: 'absolute',
    bottom: '35px',
    left: '10px',
    zIndex: '1',
  },
  tradingViewText: {
    color: '#3BB3E4 !important',
    fontFamily: 'Tahoma, Arial, sans-serif',
    fontSize: '13px',
  },
  tryChrome: {
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    top: '50px',
    left: '0',
    right: '0',
    textAlign: 'center',
  },
  softColor: {
    color: '#888',
  },
});

class TVChartItem extends PureComponent {

  componentDidMount()
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
    s.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
    s.innerHTML = `
    {
      "showChart": true,
      "locale": "en",
      "width": "100%",
      "height": "100%",
      "plotLineColorGrowing": "rgba(1, 108, 66, 1)",
      "plotLineColorFalling": "rgba(190, 30, 30, 1)",
      "gridLineColor": "rgba(152, 152, 152, 1)",
      "scaleFontColor": "rgba(152, 152, 152, 1)",
      "belowLineFillColorGrowing": "rgba(1, 218, 108, 0.05)",
      "belowLineFillColorFalling": "rgba(255, 74, 104, 0.05)",
      "symbolActiveColor": "rgba(242, 250, 254, 1)",
      "tabs": [
        {
          "title": "Satoshi",
          "symbols": [
            {
              "s": "BITTREX:ETHBTC",
              "d": "Ethereum / Bitcoin"
            },
            {
              "s": "BITTREX:LTCBTC",
              "d": "Litecoin / Bitcoin"
            },
            {
              "s": "BITFINEX:BCHBTC",
              "d": "Bitcoin Cash / Bitcoin"
            },
            {
              "s": "BITTREX:XRPBTC",
              "d": "Ripple / Bitcoin"
            },
            {
              "s": "BITTREX:XMRBTC",
              "d": "Monero / Bitcoin"
            },
            {
              "s": "BITTREX:DASHBTC",
              "d": "Dash / BTC"
            },
            {
              "s": "BITTREX:ZECBTC",
              "d": "ZCash / BTC"
            },
            {
              "s": "BITTREX:NEOBTC",
              "d": "NEO / BTC"
            },
            {
              "s": "BITFINEX:IOTBTC",
              "d": "Iota / BTC"
            }
          ]
        },
        {
          "title": "Dollar",
          "symbols": [
            {
              "s": "BITSTAMP:BTCUSD",
              "d": "Bitcoin / USD"
            },
            {
              "s": "BITSTAMP:ETHUSD",
              "d": "Ethereum / USD"
            },
            {
              "s": "BITSTAMP:LTCUSD",
              "d": "Litecoin / USD"
            },
            {
              "s": "BITSTAMP:BCHUSD",
              "d": "Bitcoin Cash / USD"
            },
            {
              "s": "BITSTAMP:XRPUSD",
              "d": "Ripple / USD"
            },
            {
              "s": "BITFINEX:XMRUSD",
              "d": "Monero / USD"
            },
            {
              "s": "KRAKEN:DASHUSD",
              "d": "Dash / USD"
            },
            {
              "s": "BITFINEX:ZECUSD",
              "d": "ZCash / USD"
            },
            {
              "s": "BITFINEX:NEOUSD",
              "d": "NEO / USD"
            },
            {
              "s": "BITFINEX:IOTUSD",
              "d": "Iota / USD"
            }
          ]
        },
        {
          "title": "Euro",
          "symbols": [
            {
              "s": "BITSTAMP:BTCEUR",
              "d": "Bitcoin / Euro"
            },
            {
              "s": "BITSTAMP:ETHEUR",
              "d": "Ethereum / Euro"
            },
            {
              "s": "BITSTAMP:LTCEUR",
              "d": "Litecoin / Euro"
            },
            {
              "s": "BITSTAMP:BCHEUR",
              "d": "Bitcoin Cash / Euro"
            },
            {
              "s": "BITSTAMP:XRPEUR",
              "d": "Ripple / Euro"
            },
            {
              "s": "KRAKEN:XMREUR",
              "d": "Monero / Euro"
            },
            {
              "s": "KRAKEN:DASHEUR",
              "d": "Dash / Euro"
            },
            {
              "s": "KRAKEN:ZECEUR",
              "d": "ZCash / Euro"
            }
          ]
        },
        {
          "title": "KR Won",
          "symbols": [
            {
              "s": "KORBIT:BTCKRW",
              "d": "Bitcoin / KR Won"
            },
            {
              "s": "KORBIT:ETHKRW",
              "d": "Ethereum / KR Won"
            },
            {
              "s": "KORBIT:XRPKRW",
              "d": "Ripple / KR Won"
            },
            {
              "s": "KORBIT:BCHKRW",
              "d": "Bitcoin Cash / KR Won"
            },
            {
              "s": "KORBIT:ETCKRW",
              "d": "Ethereum Classic / KR Won"
            },
            {
              "s": "BITCOIN GOLD / KORBIT:BTGKRW",
              "d": "Bitcoin Gold / KR Won"
            }
          ]
        }
      ]
    }`;

    this.instance.contentWindow.document.body.appendChild(s);
  }

  render()
  {
    const {
      dashboardAction,
      nightMode,
    } = this.props;

    return (
      <div className={css(styles.wrapper)}>
        <El
          nightMode={nightMode}
          style={styles.tryChrome}
          nightModeStyle={styles.softColor}
          type={'span'}>
          If nothing renders here, please try Google Chrome.
        </El>
        <div className={css(styles.container, nightMode && styles.nightContainer)}>
          <iframe
            scrolling="no"
            className={css(styles.frame, nightMode && styles.nightFrame, dashboardAction && styles.noPointerEvents)}
            ref={(el) => this.instance = el}
          />
        </div>
      </div>
    );
  }
}

export default TVChartItem;
