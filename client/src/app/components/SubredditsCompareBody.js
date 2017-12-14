// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import moment              from 'moment';
import {
  BAR_CHART_DATA_STYLES,
  RANGE_SELECT_OPTIONS,
}                           from '../constants/plots'
import {
  disableChartOptions,
  generateCountChartData,
  generateCountChartData2,
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

    const postCountsData = generateCountChartData2(
      subreddits.map((subreddit) => subreddit.postCounts),
      subreddits.map((subreddit) => subreddit.displayName)
    );
    const commentCountsData = generateCountChartData2(
      subreddits.map((subreddit) => subreddit.commentCounts),
      subreddits.map((subreddit) => subreddit.displayName)
    );

    return (
      <div className={css(styles.container, nightMode && styles.nightMode)}>
        <LineChartWithSelect
          data={postCountsData}
          nightMode={nightMode}
          selectOptions={RANGE_SELECT_OPTIONS}
          selectValue={postCountPlotRange}
          title={'Number of new posts'}
          onChange={(option) => changePostCountPlotRange(option.value)}
        />
        <LineChartWithSelect
          data={commentCountsData}
          nightMode={nightMode}
          selectOptions={RANGE_SELECT_OPTIONS}
          selectValue={commentCountPlotRange}
          title={'Number of new comments'}
          onChange={(option) => changeCommentCountPlotRange(option.value)}
        />
        <LineChartWithSelect
          data={commentCountsData}
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
