// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import {
  isEqual,
  uniqueId,
}                          from 'underscore';
import moment              from 'moment-timezone';
import {
  fetchFormattedOHLCVTickers,
}                          from '../../helpers/kucoin';
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
  static propTypes = {
    nightMode: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
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

  componentDidUpdate(prevProps)
  {
    if (
      !isEqual(prevProps.nightMode, this.props.nightMode) ||
      !isEqual(prevProps.value, this.props.value)
    )
    {
      this.update();
    }
  }

  update() {
    const {
      nightMode,
      value,
    } = this.props;

    if (value.indexOf('KUCOIN:') === 0)
    {
      const overrides = nightMode ? {
        'paneProperties.background': '#131722',
        'paneProperties.vertGridProperties.color': '#454545',
        'paneProperties.horzGridProperties.color': '#454545',
        'symbolWatermarkProperties.transparency': 90,
        'scalesProperties.textColor' : '#AAA',
      } :
      {};
      const symbol = value.split(':', 2)[1];
      const datafeed = {
        onReady: (callback) => {
          if (this.instance)
          {
            this.instance.firstChild.style = 'width: 100%; height: 100%;';

            if (nightMode)
            {
              const iframeDocument = this.instance.firstChild.contentWindow.document;
              const s = iframeDocument.createElement('script');
              s.type = 'text/javascript';
              s.innerHTML = "$('.chart-page').css('background-color', '#131722');";

              iframeDocument.body.appendChild(s);
            }
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
          if (this.instance && nightMode)
          {
            const iframeDocument = this.instance.firstChild.contentWindow.document;
            const s = iframeDocument.createElement('script');
            s.type = 'text/javascript';
            s.innerHTML = "$('.chart-controls-bar').css('background-color', '#141823');";

            iframeDocument.body.appendChild(s);
          }

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
                case '5':
                  fromUnix = toUnix - 60 * 5;
                  break;
                case '15':
                  fromUnix = toUnix - 60 * 15;
                  break;
                case '30':
                  fromUnix = toUnix - 60 * 30;
                  break;
                case '60':
                  fromUnix = toUnix - 60 * 60;
                  break;
                case '480':
                  fromUnix = toUnix - 60 * 480;
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

      const libraryPath = process.env.NODE_ENV === 'dev' ? '/' : '/tv/';
      const widgetConfig = {
        debug: process.env.NODE_ENV === 'dev',
        fullscreen: true,
        symbol: symbol,
        interval: '15',
        container_id: `${this.uId}`,
        datafeed: datafeed,
        library_path: libraryPath,
        locale: 'en',
        //  Regression Trend-related functionality is not implemented yet, so it's hidden for a while
        drawings_access: { type: 'black', tools: [ { name: 'Regression Trend' } ] },
        disabled_features: [
          'go_to_date',
          'header_compare',
          'header_fullscreen_button',
          // 'header_screenshot',
          'header_settings',
          'header_symbol_search',
          'header_undo_redo',
          // 'left_toolbar',
          'show_hide_button_in_legend',
          'symbol_info',
          'use_localstorage_for_settings',
        ],
        overrides: overrides,
      };

      var widget = new window.TradingView.widget(widgetConfig);
    }
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
        'interval=15&' +
        'withdateranges=1&' +
        'hideideas=1&' +
        'hidesidetoolbar=1&' +
        'symboledit=0&' +
        'saveimage=0&' +
        'toolbarbg=rgba(0,0,0,0)&' +
        `theme=${nightMode ? 'Dark' : 'Light'}&` +
        `timezone=${moment.tz.guess()}`
      ;

      return (
        <iframe
          className={css(styles.frame, nightMode && styles.nightFrame)}
          scrolling='no'
          src={url}
        />
      );
    }
  }

  render()
  {
    return (
      <div className={css(styles.container)}>
        {this.renderChart()}
      </div>
    );
  }
}

export default TVChartItemLarge;
