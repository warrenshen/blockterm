// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import moment              from 'moment';
import {
  LINE_CHART_DATA_STYLES,
  RANGE_SELECT_OPTIONS,
} from '../constants/plots';
import {
  disableChartOptions,
  generateChartData,
  generateCountChartData,
  generateCountChartData2,
} from '../helpers/chart';
import SubredditWidget     from './SubredditWidget';
import BarChartWithSelect  from './BarChartWithSelect';
import LineChartWithSelect from './LineChartWithSelect';
import El                  from './El';
import numeral             from 'numeral';
import * as STYLES from '../constants/styles';
import {
  getImageUrl,
} from '../constants/items.js';


function scientificToDecimal(num) {
  //if the number is in scientific notation remove it
  if(/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
    var zero = '0',
        parts = String(num).toLowerCase().split('e'), //split into coeff and exponent
        e = parts.pop(),//store the exponential part
        l = Math.abs(e), //get the number of zeros
        sign = e/l,
        coeff_array = parts[0].split('.');
    if(sign === -1) {
        num = zero + '.' + new Array(l).join(zero) + coeff_array.join('');
    }
    else {
        var dec = coeff_array[1];
        if(dec) l = l - dec.length;
        num = coeff_array.join('') + new Array(l+1).join(zero);
    }
  }

  return num;
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    flex: '1',
    flexDirection: 'row',
    //alignItems: 'center',
  },
  rowSection: {
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
    paddingLeft: '8px',
  },
  names: {
    display: 'flex',
    padding: '8px 10px',
    //alignItems: 'flex-end',
  },
  shortName: {
    paddingLeft: '4px',
    lineHeight: '24px',
  },
  subreddits: {
    display: 'flex',
    flexDirection: 'row !important',
    paddingLeft: '10px',
  },
  column: {
    display: 'flex',
    flex: '1',
    flexDirection: 'column !important',
  },
  information: {
    marginTop: '3px',
    //borderBottom: `1px dashed ${STYLES.BORDERLIGHT}`,
  },
  nightInformation: {
    borderColor: STYLES.BORDERDARK,
  },
  markets: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '8px 10px',
  },
  market: {
    paddingRight: '12px',
    display: 'flex',
    flexDirection: 'column',
  },
  trueWhite: {
    color: '#ffffff !important',
  },
  condensed: {
    lineHeight: '12px',
    fontWeight: '400',
  },
  imageIcon: {
    marginTop: '8px',
    marginRight: '8px',
  },
  informationItem: {
    padding: '5px 0px 15px !important',
    marginRight: '5px',
    marginLeft: '5px',
  },
  itemGreen: {
    boxShadow: `inset 0px -3px 0px 0px ${STYLES.TICKER_GREEN}`,
  },
  itemRed: {
    boxShadow: `inset 0px -3px 0px 0px ${STYLES.TICKER_RED}`,
    //boxShadow: 'inset 0px -75px 50px -80px rgba(255,46,46,1) !important',
  },
  semibolded: {
    fontWeight: '500',
  },
  coloredColumn: {
    backgroundColor: STYLES.LIGHT_HIGHLIGHT_GREEN,
    borderTop: '1px solid #aaa',
  },
  columnRed: {
    backgroundColor: STYLES.LIGHT_HIGHLIGHT_RED,
  },
  darkColoredColumn: {
    backgroundColor: STYLES.DARK_HIGHLIGHT_GREEN,
    borderTop: '1px solid #555',
  },
  darkColumnRed: {
    backgroundColor: STYLES.DARK_HIGHLIGHT_RED,
  }
});

// priceUSD
// priceBTC
// volumeUSD24h
// marketCapUSD
// availableSupply
// totalSupply
// maxSupply
// percentChange1h
// percentChange24h
// percentChange7d

//todo: change in volume percent in last week, volume rank

class TokenHead extends PureComponent {

  renderMarkets(markets)
  {
    const {
      nightMode,
      token,
    } = this.props;

    if (markets.length > 0)
    {
      return (
        <div className={css(styles.markets, styles.row)}>
          {
            markets.map((market) => (
              <div
                className={css(styles.market)}
                key={market.id}
              >
                <El
                  nightMode={nightMode}
                  style={styles.semibolded}
                  type={'span'}
                >
                  {market.name}
                </El>
                <El
                  nightMode={nightMode}
                  type={'span'}
                >
                  {market.lastPrice}
                </El>
              </div>
            ))
          }
        </div>
      );
    }
  }

  renderSubreddits(subreddits, token)
  {
    const {
      nightMode,
    } = this.props;

    if (subreddits.length > 0)
    {
      return (
        <div className={css(styles.column, styles.coloredColumn, nightMode && styles.darkColoredColumn)}>
          <div className={css(styles.subreddits)}>
            {
              subreddits.map((subreddit) => (
                <SubredditWidget
                  key={subreddit.id}
                  nightMode={nightMode}
                  subreddit={subreddit}
                />
              ))
            }
            {
              //this.renderMarkets(token.markets)}
            }
          </div>
        </div>
      );
    }
  }

  renderInformation() {
    const {
      nightMode,
      token,
    } = this.props;

    const {
      shortName,
      longName,
      imageUrl,
      priceUSD,
      priceBTC,
      volumeUSD24h,
      marketCapUSD,
      availableSupply,
      totalSupply,
      maxSupply,
      percentChange1h,
      percentChange24h,
      percentChange7d,
    } = token;

    let green24h = percentChange24h > 0;
    const floatPriceUSD = parseFloat(numeral(priceUSD).format('0.00000000')).toString();
    const decimalIndex = floatPriceUSD.indexOf('.');
    const formattedPriceUSD = `${numeral(priceUSD).format('$0,0')}${floatPriceUSD.substring(decimalIndex)}`;
    const multipliedPriceBTC = numeral(scientificToDecimal(priceBTC) * 100000000).format('00000000');
    const formattedPriceBTC = multipliedPriceBTC >= 100000000 ? `1.00000000` : `0.${multipliedPriceBTC}`;

    return (
        <div className={css(styles.row, styles.information, nightMode && styles.nightInformation)}>
          <div className={css(styles.names)}>
            <img
              className={css(styles.imageIcon)}
              src={getImageUrl(imageUrl)}
              width={32}
              height={32}
            />
            <El
              nightMode={nightMode}
              type={'h3'}
            >
              {longName}
              <br />
              [{shortName}]
            </El>
          </div>
          <div className={css(styles.column, styles.informationItem, green24h ? styles.itemGreen : styles.itemRed)}>
            <El
              nightMode={nightMode}
              nightModeStyle={styles.trueWhite}
              type={'h5'}
            >
              Price:
            </El>
            <El
              nightMode={nightMode}
              nightModeStyle={styles.trueWhite}
              type={'h4'}
            >
              {`${formattedPriceUSD} USD (${percentChange24h}%)`}
            </El>
            <El
              nightMode={nightMode}
              style={styles.condensed}
              type={'h5'}
            >
              {`${formattedPriceBTC} BTC`}
            </El>
          </div>
          <div className={css(styles.column, styles.informationItem)}>
            <El
              nightMode={nightMode}
              nightModeStyle={styles.trueWhite}
              type={'h5'}
            >
              Volume (24h):
            </El>
            <El
              nightMode={nightMode}
              nightModeStyle={styles.trueWhite}
              type={'h4'}
            >
              {numeral(volumeUSD24h).format('$0,0')} USD
            </El>
            <El
              nightMode={nightMode}
              style={styles.condensed}
              type={'h5'}
            >
              {numeral(volumeUSD24h / priceBTC).format('0,0')} BTC
            </El>
          </div>
          <div className={css(styles.column, styles.informationItem, green24h ? styles.itemGreen : styles.itemRed)}>
            <El
              nightMode={nightMode}
              type={'h5'}
            >
              Market Cap:
            </El>
            <El
              nightMode={nightMode}
              nightModeStyle={styles.trueWhite}
              type={'h4'}
            >
              {numeral(marketCapUSD).format('$0,0')} USD
            </El>
            <El
              nightMode={nightMode}
              style={styles.condensed}
              type={'h5'}
            >
              {numeral(marketCapUSD/priceBTC).format('0,0')} BTC
            </El>
          </div>
          <div className={css(styles.column, styles.informationItem)}>
            <El
              nightMode={nightMode}
              nightModeStyle={styles.trueWhite}
              type={'h5'}
            >
              Supply:
            </El>
            <El
              nightMode={nightMode}
              nightModeStyle={styles.trueWhite}
              type={'h4'}
            >
              {numeral(availableSupply).format('0,0')} {shortName} available
            </El>
            <El
              nightMode={nightMode}
              style={styles.condensed}
              type={'h5'}
            >
              {numeral(totalSupply).format('0,0')} total, {numeral(maxSupply).format('0,0')} {token.shortName} max
            </El>
          </div>
        </div>
      );
  }

  render()
  {
    const {
      nightMode,
      token,
    } = this.props;

    return (
      <div className={css(styles.container)}>
        {this.renderInformation()}
        {this.renderSubreddits(token.subreddits, token)}
      </div>
    );
  }
}

export default TokenHead;
