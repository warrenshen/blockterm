// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import moment              from 'moment';
import { Link }            from 'react-router-dom';
import Select from 'react-select';
import {
  DATA_STYLES,
  RANGE_SELECT_OPTIONS,
}                          from '../constants/plots'
import LineChartWithSelect from '../components/LineChartWithSelect';
import El                  from '../components/El';

const styles = StyleSheet.create({
  wrapper: {
    width: '100vw',
    minHeight: '100vh',
    padding: '0% 15%',
    backgroundColor: '#ecf0f1',
    gridTemplateColumns: 'repeat(8, 1fr)',
  },
  nightMode: {
    backgroundColor: '#232b2e',
  },
  container: {
    gridColumn: '3 / 7',
  },
  description: {
    paddingTop: '12px',
  },
  header: {
    display: 'flex',
    padding: '24px 0px',
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
  },
  headerRight: {
    width: '256px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  tokens: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '12px',
  },
});

class SubredditsCompare extends PureComponent {

  renderSubreddits(subreddits)
  {
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
      <div>
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
      </div>
    );
  }

  renderOptions(subreddits)
  {
    const {
      data,
      addSubredditId,
      nightMode,
    } = this.props;

    const selectOptions = data.allSubreddits.map((subreddit) => {
      return {
        label: subreddit.displayName,
        value: subreddit.id,
      };
    });

    return (
      <Select
        clearable={false}
        searchable={true}
        value={''}
        options={selectOptions}
        onChange={(option) => addSubredditId(option.value)}
      />
    );
  }

  render()
  {
    const {
      data,
      nightMode,
    } = this.props;

    return (
      <div className={css(styles.wrapper, nightMode && styles.nightMode)}>
        { data && data.allSubreddits && this.renderOptions(data.allSubreddits) }
        <div className={css(styles.container)}>
          { data && data.subredditsByIds && data.subredditsByIds.length > 0 && this.renderSubreddits(data.subredditsByIds) }
        </div>
      </div>
    );
  }
}

export default SubredditsCompare;
