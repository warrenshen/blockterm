// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { uniqueId }        from 'underscore';
import moment              from 'moment-timezone';
import * as STYLES         from '../../constants/styles';
import {
  ITEM_VALUE_TO_IMAGE,
  getImageUrl,
}                          from '../../constants/items.js';
import El                  from '../El';

import ccxt             from 'ccxt';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  noPointerEvents: {
    pointerEvents: 'none',
  },
  frame: {
    display: 'flex',
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
    right: '12px',
    zIndex: '1',
  },
  activeAlerts: {
    padding: '4px 8px',
    marginRight: '4px',
    border: '1px solid #000',
    borderRadius: '2px',
    backgroundColor: 'transparent',
  },
  activeAlertsNightMode: {
    border: '1px solid #f3f3f3',
  },
});

function getKucoin()
{
  const kucoin = new ccxt.kucoin();
  if (process.env.NODE_ENV == 'dev')
  {
    kucoin.proxy = 'http://localhost:9876/';
  }
  else
  {
    kucoin.proxy = 'https://cors.blockterm.com/';
  }
  return kucoin;
}

async function fetchOHLCVTickers(symbol, fromUnix, toUnix, resolution)
{
  const kucoin = getKucoin();

  try
  {
    const response = await kucoin.fetchOHLCV(
      symbol,
      undefined,
      undefined,
      undefined,
      {
        from: fromUnix,
        to: toUnix,
        resolution: resolution,
      },
    );
    return response;
  }
  catch (error)
  {
    console.log(error);
  }
}

async function fetchFormattedOHLCVTickers(symbol, fromUnix, toUnix, resolution)
{
  const response = await fetchOHLCVTickers(
    symbol,
    fromUnix,
    toUnix,
    resolution,
  );
  return response.map(
    ([time, open, high, low, close, volume]) => ({
      time: time,
      open,
      high,
      low,
      close,
      volume,
    })
  );
}

class TVChartItem extends PureComponent
{
  static propTypes = {
    alerts: PropTypes.array.isRequired,
    exchangeData: PropTypes.object,
    dashboardAction: PropTypes.bool.isRequired,
    nightMode: PropTypes.bool.isRequired,
    identifier: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,

    changeModalState: PropTypes.func.isRequired,
  };

  constructor(props)
  {
    super(props);
    this.uId = uniqueId('tv-chart-item-');
    this.apiId = null;
  }

  componentDidMount()
  {
    this.update();
  }

  // componentDidUpdate(prevProps)
  // {
  //   if (
  //     !isEqual(prevProps.dashboardState, this.props.dashboardState) ||
  //     !isEqual(prevProps.value, this.props.value)
  //   )
  //   {
  //     this.update();
  //   }
  // }

  update() {
    const {
      dashboardState,
      value,
    } = this.props;

    if (value.indexOf('KUCOIN:') === 0)
    {
      const symbol = value.split(':', 2)[1];

      const datafeed = {
        onReady: (callback) => {
          if (this.instance)
          {
            this.instance.firstChild.style = 'width: 100%; height: 100%;';
          }
          setTimeout(
            () => callback({
              supported_resolutions: ['1', '5', '15', '30', '60', '480', '1D', '1W', '1M'],
              supports_mark: false,
              supports_search: false,
              supports_time: true,
            }),
            0,
          );
        },
        resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
          setTimeout(
            () => onSymbolResolvedCallback({
              name: symbolName,
              ticker: symbolName,
              description: symbolName,
              type: 'bitcoin',
              session: '24x7',
              timezone: 'America/Los_Angeles',
              minmov: 1,
              pricescale: 100000000,

              has_intraday: true,
              has_daily: true,
              has_weekly_and_monthly: true,
              has_empty_bars: true,
              supported_resolutions: ['1', '5', '15', '30', '60', '480', '1D', '1W', '1M'],
            }),
            0,
          );
        },
        getBars: async (
          symbolInfo,
          resolution,
          fromUnixTimestamp,
          toUnixTimestamp,
          onHistoryCallback,
          onErrorCallback,
          firstDataRequest,
        ) => {
          const formattedResponse = await fetchFormattedOHLCVTickers(
            symbol,
            fromUnixTimestamp,
            toUnixTimestamp,
            resolution,
          );
          onHistoryCallback(formattedResponse);
        },
        subscribeBars: (
          symbolInfo,
          resolution,
          onRealtimeCallback,
          subscriberUID,
          onResetCacheNeededCallback,
        ) => {
          if (this.apiId !== null)
          {
            console.log('bad');
          }

          this.apiId = setInterval(
            async () => {
              const toUnix = moment.utc().unix();
              let fromUnix;

              switch (resolution)
              {
                case '1':
                  fromUnix = toUnix - 60;
                  break;
                case '60':
                  fromUnix = toUnix - 60 * 60;
                  break;
                case 'D':
                  fromUnix = toUnix - 24 * 60 * 60;
                  break;
                case 'W':
                  fromUnix = toUnix - 7 * 24 * 60 * 60;
                  break;
                default:
                  console.log('Unsupported resolution!!!!');
                  break;
              }

              const formattedResponse = await fetchFormattedOHLCVTickers(
                symbol,
                fromUnix,
                toUnix,
                resolution,
              );
              if (formattedResponse.length > 0)
              {
                onRealtimeCallback(formattedResponse[0]);
              }
            },
            4096,
          );
        },
        unsubscribeBars: (subscriberUID) => {
          if (this.apiId === null)
          {
            console.log('bad bad');
          }

          clearInterval(this.apiId);
          this.apiId = null;
        },
      };

      const widgetConfig = {
        debug: true,
        fullscreen: true,
        symbol: symbol,
        interval: '1D',
        container_id: `${this.uId}`,
        datafeed: datafeed,
        library_path: "/",
        locale: "en",
        //  Regression Trend-related functionality is not implemented yet, so it's hidden for a while
        drawings_access: { type: 'black', tools: [ { name: "Regression Trend" } ] },
        disabled_features: [
          'go_to_date',
          'header_compare',
          'header_fullscreen_button',
          'header_screenshot',
          'header_settings',
          'header_symbol_search',
          'header_undo_redo',
          'left_toolbar',
          // 'symbol_info',
          'use_localstorage_for_settings',
        ],
        // enabled_features: ["study_templates"],
        // charts_storage_url: 'http://saveload.tradingview.com',
        //           charts_storage_api_version: "1.1",
        // client_id: 'tradingview.com',
        // user_id: 'public_user_id'
        overrides: {
          "paneProperties.background": "#222222",
                      "paneProperties.vertGridProperties.color": "#454545",
                      "paneProperties.horzGridProperties.color": "#454545",
          "symbolWatermarkProperties.transparency": 90,
          "scalesProperties.textColor" : "#AAA"
        },
      };

      var widget = new window.TradingView.widget(widgetConfig);
    }
  }

  renderExtras()
  {
    const {
      alerts,
      exchangeData,
      identifier,
      nightMode,
      value,

      changeModalState,
    } = this.props;

    const validAlerts = alerts.filter(
      (alert) => alert.identifier.indexOf(value) === 0
    );
    const onClick = (event) => {
      changeModalState(identifier);
    };

    return (
      <div className={css(styles.extras)}>
        {
          exchangeData && (
            <El
              nightMode={nightMode}
              type={'span'}
            >
              {exchangeData.last}
            </El>
          )
        }
        {
          validAlerts.length > 0 && (
            <El
              icon={'bullhorn'}
              nightMode={nightMode}
              nightModeStyle={styles.activeAlertsNightMode}
              style={styles.activeAlerts}
              type={'span'}
            >
              <b>{validAlerts.length}</b> active alert(s)
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

  renderChart()
  {
    const {
      alerts,
      exchangeData,
      identifier,
      nightMode,
      value,

      changeModalState,
    } = this.props;

    if (value.indexOf('KUCOIN:') === 0)
    {
      return (
        <div
          className={css(styles.frame, nightMode && styles.nightFrame)}
          id={this.uId}
          ref={(el) => this.instance = el}
        />
      );
    }
    else
    {
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
        <iframe
          className={css(styles.frame, nightMode && styles.nightFrame)}
          scrolling="no"
          src={url}
        />
      );
    }
  }

  render()
  {
    const {
      dashboardAction,
    } = this.props;

    return (
      <div className={css(styles.container, dashboardAction && styles.noPointerEvents)}>
        {this.renderExtras()}
        {this.renderChart()}
      </div>
    );
  }
}

export default TVChartItem;
