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
import BarChartWithSelect  from './BarChartWithSelect';
import LineChartWithSelect from './LineChartWithSelect';
import El                  from './El';

const styles = StyleSheet.create({
  container: {
    left: '-24px',
    width: '100%',
    padding: '0px 24px 24px',
    boxSizing: 'content-box',
    backgroundColor: 'white',
    borderRadius: '6px',
    display: 'flex',
    flexDirection: 'column',
  },
  nightMode: {
    backgroundColor: '#071010',
  },
  section: {
    width: '100%',
    paddingTop: '24px',
    display: 'flex',
    flexDirection: 'column',
  },
  chart: {
    width: '100%',
    paddingTop: '12px',
  },
});

class TokenBody extends PureComponent {

  renderMarkets(markets)
  {
    const {
      nightMode,
    } = this.props;

    if (markets.length > 0)
    {
      const market = markets[0];
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
  }

  renderMentionTotalCounts()
  {
    const {
      changeMentionTotalPlotRange,
      mentionTotalPlotRange,
      nightMode,
      token,
    } = this.props;

    const {
      mentionTotalCounts,
    } = token;

    if (mentionTotalCounts.length > 0)
    {
      const totalMentionsData = generateCountChartData(
        mentionTotalCounts,
        undefined,
        'now',
        'MM/DD'
      );

      return (
        <BarChartWithSelect
          data={totalMentionsData}
          nightMode={nightMode}
          selectOptions={RANGE_SELECT_OPTIONS}
          selectValue={mentionTotalPlotRange}
          title={`${token.shortName} total activity`}
          onChange={(option) => changeMentionTotalPlotRange(option.value)}
        />
      );
    }
  }

  renderMentionSubredditCounts()
  {
    const {
      changeMentionSubredditPlotRange,
      mentionSubredditPlotRange,
      nightMode,
      token,
    } = this.props;

    const {
      subredditMentions,
    } = token;

    if (subredditMentions.length > 0)
    {
      const subredditMentionsData = generateCountChartData2(
        subredditMentions.slice(0, 3).map((subredditMention) => subredditMention.mentionTotalCounts),
        subredditMentions.slice(0, 3).map((subredditMention) => subredditMention.subreddit.displayName)
      );

      return (
        <BarChartWithSelect
          data={subredditMentionsData}
          displayLegend={true}
          nightMode={nightMode}
          selectOptions={RANGE_SELECT_OPTIONS}
          selectValue={mentionSubredditPlotRange}
          stacked={true}
          title={`${token.shortName} activity by subreddits`}
          onChange={(option) => changeMentionSubredditPlotRange(option.value)}
        />
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
      <div className={css(styles.container, nightMode && styles.nightMode)}>
        <div className={css(styles.section)}>
          <El
            nightMode={nightMode}
            type={'h4'}
          >
            Historical activity
          </El>
          {this.renderMarkets(token.markets)}
          {this.renderMentionTotalCounts()}
          {this.renderMentionSubredditCounts()}
        </div>
      </div>
    );
  }
}

export default TokenBody;
