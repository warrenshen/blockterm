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
  SMALL_RANGE_SELECT_OPTIONS,
} from '../constants/plots';
import {
  disableChartOptions,
  generateChartData,
  generateCountChartData,
  generateCountChartData2,
  isPlotRangeBig,
} from '../helpers/chart';
import BarChartWithSelect  from './BarChartWithSelect';
import LineChartWithSelect from './LineChartWithSelect';
import El                  from './El';
import * as STYLES from '../constants/styles';

const styles = StyleSheet.create({
  container: {
    padding: '0px 12px 12px',
    boxSizing: 'content-box',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    borderTop: `1px solid ${STYLES.BORDERLIGHT}`,
  },
  nightMode: {
    backgroundColor: '#000',
    borderTop: `1px solid ${STYLES.BORDERDARK}`,
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
  sectionHeader: {
    marginBottom: '8px',
    borderBottom: '1px solid #bdc3c7',
  },
});

class TokenBody extends PureComponent {

  renderMarkets(markets)
  {
    const {
      changePricePlotRange,
      createDashboardItem,
      pricePlotRange,
      nightMode,
      token,
    } = this.props;

    if (markets.length > 0)
    {
      const market = markets[1];
      const chartData = generateChartData(market.marketTickers);
      return (
        <div>
          <button onClick={(event) => createDashboardItem(`TOKEN-PRICE-${token.id}`)}>
            Add to dashboard
          </button>
          <LineChartWithSelect
            data={chartData}
            displayLegend={false}
            nightMode={nightMode}
            selectOptions={SMALL_RANGE_SELECT_OPTIONS}
            selectValue={pricePlotRange}
            title={`${market.name}`}
            onChange={(option) => changePricePlotRange(option.value)}
          />
        </div>
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
        isPlotRangeBig(mentionTotalPlotRange) ? 'M/D/YY' : 'MM/DD'
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
            style={styles.sectionHeader}
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
