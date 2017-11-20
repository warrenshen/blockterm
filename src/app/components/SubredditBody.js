// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import moment              from 'moment';
import { RANGE_SELECT_OPTIONS } from '../constants/plots';
import BarChartWithSelect  from './BarChartWithSelect';

const styles = StyleSheet.create({
  container: {
    left: '-24px',
    width: '100%',
    padding: '0px 24px',
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
    padding: '24px 0px',
    display: 'flex',
    flexDirection: 'column',
  },
});

class SubredditBody extends PureComponent {

  render()
  {
    const {
      nightMode,
      subreddit,
      changeActiveUserCountPlotRange,
      changeCommentCountPlotRange,
      changePostCountPlotRange,
      activeUserCountPlotRange,
      commentCountPlotRange,
      postCountPlotRange,
    } = this.props;

    var postsX = subreddit.postCounts.map(
      (postCount) => moment(postCount.timestamp).format('MM/DD')
    );
    var postsY = subreddit.postCounts.map(
      (postCount) => postCount.count
    );

    var commentsX = subreddit.commentCounts.map(
      (commentCount) => moment(commentCount.timestamp).format('MM/DD')
    );
    var commentsY = subreddit.commentCounts.map(
      (commentCount) => commentCount.count
    );

    var activeUsersX = subreddit.activeUserCounts.map(
      (activeUserCount) => moment(activeUserCount.timestamp).format('MM/DD h:mm')
    );
    var activeUsersY = subreddit.activeUserCounts.map(
      (activeUserCount) => activeUserCount.count
    );

    var postsData = {
      labels: postsX,
      datasets: [
        {
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: postsY,
        }
      ]
    };

    var commentsData = {
      labels: commentsX,
      datasets: [
        {
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: commentsY,
        }
      ]
    };

    var activeUsersData = {
      labels: activeUsersX,
      datasets: [
        {
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: activeUsersY,
        }
      ]
    };

    var blob = JSON.parse(subreddit.blob);

    return (
      <div className={css(styles.container, nightMode && styles.nightMode)}>
        <div className={css(styles.section)}>
          <h3>Recent activity</h3>
          <span>{`${blob.post_count_24h} new posts`}</span>
          <span>{`${blob.comment_count_24h} new comments`}</span>
        </div>
        <div>
          <h2>Historical activity</h2>
          <BarChartWithSelect
            data={postsData}
            selectOptions={RANGE_SELECT_OPTIONS}
            selectValue={postCountPlotRange}
            title={'Number of new posts'}
            onChange={(option) => changePostCountPlotRange(option.value)}
          />
          <BarChartWithSelect
            data={commentsData}
            selectOptions={RANGE_SELECT_OPTIONS}
            selectValue={commentCountPlotRange}
            title={'Number of new comments'}
            onChange={(option) => changeCommentCountPlotRange(option.value)}
          />
          <BarChartWithSelect
            data={activeUsersData}
            selectOptions={RANGE_SELECT_OPTIONS}
            selectValue={activeUserCountPlotRange}
            title={'Number of active users'}
            onChange={(option) => changeActiveUserCountPlotRange(option.value)}
          />
        </div>
      </div>
    );
  }
}

export default SubredditBody;
