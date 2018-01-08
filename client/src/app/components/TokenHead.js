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
    //marginLeft: '64px',
    //paddingTop: '12px',
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
    marginRight: '8px',
  },
  informationItem: {
    boxShadow: `inset 0px -3px 0px 0px ${STYLES.TICKER_GREEN}`,
    //boxShadow: 'inset 0px -75px 50px -80px rgba(76,255,97,1) !important',
    padding: '5px 0px 15px !important',
    marginRight: '5px',
    marginLeft: '5px',
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
            {this.renderMarkets(token.markets)}
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

    return (
        <div className={css(styles.row, styles.information, nightMode && styles.nightInformation)}>
          <div className={css(styles.names)}>
            <img className={css(styles.imageIcon)} src={token.imageUrl} width={48} height={48}></img>
            <El
              nightMode={nightMode}
              type={'h3'}
            >
              {token.longName}<br />
              [{token.shortName}]
            </El>
          </div>
          <div className={css(styles.column, styles.informationItem, styles.itemRed)}>
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
              {numeral(priceUSD).format('$0,0.00')} USD ({percentChange24h}%)<br />
            </El>
            <El
              nightMode={nightMode}
              style={styles.condensed}
              type={'h5'}
            >
              {numeral(priceBTC).format('0,0.00')} BTC<br />
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
              {numeral(volumeUSD24h).format('$0,0')} USD<br />
            </El>
            <El
              nightMode={nightMode}
              style={styles.condensed}
              type={'h5'}
            >
              {numeral(volumeUSD24h/priceBTC).format('0,0')} BTC
            </El>
          </div>
          <div className={css(styles.column, styles.informationItem)}>
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
              {numeral(availableSupply).format('0,0')} {token.shortName} available<br />
            </El>
            <El
              nightMode={nightMode}
              style={styles.condensed}
              type={'h5'}
            >
              {numeral(totalSupply).format('0,0')} total, {numeral(maxSupply).format('0,0')} max
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
