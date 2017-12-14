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
    backgroundColor: '#373b3e',
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

  render()
  {
    const {
      changeMentionTotalPlotRange,
      changeMentionSubredditPlotRange,
      mentionTotalPlotRange,
      mentionSubredditPlotRange,
      nightMode,
      token,
    } = this.props;

    const {
      mentionTotalCounts,
      subredditMentions,
    } = token;

    const subredditMentionsData = generateCountChartData2(
      subredditMentions.slice(0, 3).map((subredditMention) => subredditMention.mentionTotalCounts),
      subredditMentions.slice(0, 3).map((subredditMention) => subredditMention.displayName)
    );

    const totalMentionsData = generateCountChartData(
      mentionTotalCounts,
      undefined,
      'now',
      'MM/DD'
    );

    return (
      <div className={css(styles.container, nightMode && styles.nightMode)}>
        <div className={css(styles.section)}>
          <El
            nightMode={nightMode}
            type={'h4'}
          >
            Historical activity
          </El>
          <BarChartWithSelect
            data={totalMentionsData}
            nightMode={nightMode}
            selectOptions={RANGE_SELECT_OPTIONS}
            selectValue={mentionTotalPlotRange}
            title={`${token.shortName} total activity`}
            onChange={(option) => changeMentionTotalPlotRange(option.value)}
          />
          <LineChartWithSelect
            data={subredditMentionsData}
            nightMode={nightMode}
            selectOptions={RANGE_SELECT_OPTIONS}
            selectValue={mentionSubredditPlotRange}
            title={`${token.shortName} activity by subreddits`}
            onChange={(option) => changeMentionSubredditPlotRange(option.value)}
          />
        </div>
      </div>
    );
  }
}

export default TokenBody;
