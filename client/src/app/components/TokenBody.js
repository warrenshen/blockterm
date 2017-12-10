// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import moment              from 'moment';
import {
  DATA_STYLES,
  RANGE_SELECT_OPTIONS,
}                          from '../constants/plots'
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
    const gridLinesConfig = {
      color: nightMode ? 'rgba(255, 255, 255, 0.15)' :
                         'rgba(0, 0, 0, 0.15)',
      zeroLineColor: nightMode ? 'rgba(255, 255, 255, 0.15)' :
                                 'rgba(0, 0, 0, 0.15)',
    };
    const ticksConfig = {
      beginAtZero: true,
      fontColor: nightMode ? 'rgba(255, 255, 255, 0.5)' :
                             'rgba(0, 0, 0, 0.5)',
      padding: 6,
    };

    const {
      changeMentionTotalPlotRange,
      changeMentionSubredditPlotRange,
      mentionTotalPlotRange,
      mentionSubredditPlotRange,
      nightMode,
      token,
    } = this.props;

    var labels = token.subredditMentions[0].mentionTotalCounts.map(
      (mentionTotalCount) => moment(mentionTotalCount.timestamp).format('MM/DD')
    );
    var data = token.subredditMentions.map((subredditMention, index) => {
      return Object.assign(
        {},
        {
          data: subredditMention.mentionTotalCounts.map((mentionTotalCount) => mentionTotalCount.count),
          label: subredditMention.subreddit.displayName,
          lineTension: 0,
          fill: false,
        },
        DATA_STYLES[index]
      );
    });

    var chart = {
      labels: labels,
      datasets: data,
    };

    var labels2 = token.mentionTotalCounts.map(
      (mentionTotalCount) => moment(mentionTotalCount.timestamp).format('MM/DD')
    );
    var data2 = [
      {
        data: token.mentionTotalCounts.map((mentionTotalCount) => mentionTotalCount.count),
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
      },
    ];

    var chart2 = {
      labels: labels2,
      datasets: data2,
    };
    return (
      <div className={css(styles.container, nightMode && styles.nightMode)}>
        <div className={css(styles.section)}>
          <El
            nightMode={nightMode}
            type={'h4'}
          >
            Recent activity
          </El>
          <BarChartWithSelect
            data={chart2}
            nightMode={nightMode}
            selectOptions={RANGE_SELECT_OPTIONS}
            selectValue={mentionTotalPlotRange}
            title={`${token.shortName} total activity`}
            onChange={(option) => changeMentionTotalPlotRange(option.value)}
          />
          <LineChartWithSelect
            data={chart}
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
