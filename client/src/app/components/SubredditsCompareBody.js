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
}                           from '../constants/plots'
import {
  disableChartOptions,
  generateCountChartData,
} from '../helpers/chart';
import LineChartWithSelect  from '../components/LineChartWithSelect';
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
});

class SubredditsCompareBody extends PureComponent {

  render()
  {
    const {
      subreddits,
    } = this.props;

    const {
      changeCommentCountPlotRange,
      changePostCountPlotRange,
      commentCountPlotRange,
      postCountPlotRange,
      nightMode,
    } = this.props;

    const labels = subreddits[0].postCounts.map(
      (postCount) => moment(postCount.timestamp).format('MM/DD')
    );
    const data = subreddits.map((subreddit, index) => {
      return Object.assign(
        {},
        {
          data: subreddit.postCounts.map((postCount) => postCount.count),
          label: subreddit.displayName,
          lineTension: 0,
          fill: false,
        },
        DATA_STYLES[index]
      );
    });

    const chart = {
      labels: labels,
      datasets: data,
    };

    const commentCountsLabels = subreddits[0].commentCounts.map(
      (commentCount) => moment(commentCount.timestamp).format('MM/DD')
    );
    const commentCountsData = subreddits.map((subreddit, index) => {
      return Object.assign(
        {},
        {
          data: subreddit.commentCounts.map((commentCount) => commentCount.count),
          label: subreddit.displayName,
          lineTension: 0,
          fill: false,
        },
        DATA_STYLES[index]
      );
    });

    const commentCountsChart = {
      labels: commentCountsLabels,
      datasets: commentCountsData,
    };

    return (
      <div className={css(styles.container, nightMode && styles.nightMode)}>
        <LineChartWithSelect
          data={chart}
          nightMode={nightMode}
          selectOptions={RANGE_SELECT_OPTIONS}
          selectValue={postCountPlotRange}
          title={'Number of new posts'}
          onChange={(option) => changePostCountPlotRange(option.value)}
        />
        <LineChartWithSelect
          data={commentCountsChart}
          nightMode={nightMode}
          selectOptions={RANGE_SELECT_OPTIONS}
          selectValue={commentCountPlotRange}
          title={'Number of new comments'}
          onChange={(option) => changeCommentCountPlotRange(option.value)}
        />
        <LineChartWithSelect
          data={commentCountsChart}
          nightMode={nightMode}
          selectOptions={RANGE_SELECT_OPTIONS}
          selectValue={commentCountPlotRange}
          title={'Number of active users'}
          onChange={(option) => changeCommentCountPlotRange(option.value)}
        />
      </div>
    );
  }
}

export default SubredditsCompareBody;
