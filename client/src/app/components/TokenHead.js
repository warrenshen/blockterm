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

const styles = StyleSheet.create({
  container: {
    padding: '24px 24px',
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
  },
  rowSection: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '8px',
  },
  names: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  shortName: {
    paddingLeft: '4px',
    lineHeight: '24px',
  },
  subreddits: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '12px',
  },
  markets: {
    display: 'flex',
  },
  market: {
    paddingRight: '12px',
    display: 'flex',
    flexDirection: 'column',
  },
});

class TokenBody extends PureComponent {

  renderMarkets(markets)
  {
    const {
      nightMode,
    } = this.props;

    const market = markets[2];
    const chartData = generateChartData(market.marketTickers);
    return (
      <LineChartWithSelect
        data={chartData}
        nightMode={nightMode}
        selectOptions={RANGE_SELECT_OPTIONS}
        selectValue={''}
        title={`${market.name}`}
        onChange={(option) => option.value}
      />
    );
  }

  renderMarkets(markets)
  {
    const {
      nightMode,
    } = this.props;

    if (markets.length > 0)
    {
      return (
        <div className={css(styles.markets)}>
          {
            markets.map((market) => (
              <div
                className={css(styles.market)}
                key={market.id}
              >
                <El
                  nightMode={nightMode}
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
  renderSubreddits(subreddits)
  {
    const {
      nightMode,
    } = this.props;

    if (subreddits.length > 0)
    {
      return (
        <div className={css(styles.subreddits)}>
          <El
            nightMode={nightMode}
            type={'h5'}
          >
            Related subreddits
          </El>
          {
            subreddits.map((subreddit) => (
              <SubredditWidget
                key={subreddit.id}
                nightMode={nightMode}
                subreddit={subreddit}
              />
            ))
          }
        </div>
      );
    }
  }


  render()
  {
    const {
      nightMode,
      token,
    } = this.props;

    return (
      <div className={css(styles.container)}>
        <div className={css(styles.row)}>
          <img src={token.imageUrl} width={48} height={48}></img>
          <div className={css(styles.rowSection)}>
            <div className={css(styles.names)}>
              <El
                nightMode={nightMode}
                type={'h3'}
              >
                {token.longName}
              </El>
              <El
                nightMode={nightMode}
                style={styles.shortName}
                type={'h4'}
              >
                {`[${token.shortName}]`}
              </El>
            </div>
            {this.renderMarkets(token.markets)}
          </div>
        </div>
        {this.renderSubreddits(token.subreddits)}
      </div>
    );
  }
}

export default TokenBody;
