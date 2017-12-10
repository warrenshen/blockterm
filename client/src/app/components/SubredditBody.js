// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import moment              from 'moment';
import { RANGE_SELECT_OPTIONS } from '../constants/plots';
import { disableChartOptions } from '../helpers/chart';
import BarChartWithSelect  from './BarChartWithSelect';
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
  sectionHeader: {
    paddingBottom: '12px',
    borderBottom: '1px solid #bdc3c7',
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

    var backgroundColor = postsX.map(
      (postCount) => 'rgba(255,99,132,0.2)'
    );

    const blob = JSON.parse(subreddit.blob);

    if (blob.postCount24h)
    {
      backgroundColor.push('rgba(255,99,132,1)');
      postsX.push('today');
      postsY.push(blob.postCount24h);
    }

    var postsData = {
      labels: postsX,
      datasets: [
        {
          backgroundColor: backgroundColor,
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

    const activeUsersSelectOptions = disableChartOptions(
      subreddit.earliestActiveUserCountDate,
      RANGE_SELECT_OPTIONS
    );
    const commentsSelectOptions = disableChartOptions(
      subreddit.earliestCommentCountDate,
      RANGE_SELECT_OPTIONS
    );
    const postsSelectOptions = disableChartOptions(
      subreddit.earliestPostCountDate,
      RANGE_SELECT_OPTIONS
    );

    return (
      <div className={css(styles.container, nightMode && styles.nightMode)}>
        <div className={css(styles.section)}>
          <div className={css(styles.sectionHeader)}>
            <El
              nightMode={nightMode}
              type={'h4'}
            >
              Recent activity
            </El>
          </div>
          <El
            nightMode={nightMode}
            type={'span'}
          >
            {`${blob.activeUserCountNow} active users`}
          </El>
          <El nightMode={nightMode} type={'span'}>
            {`${blob.postCount24h} new posts`}
          </El>
          <El nightMode={nightMode} type={'span'}>
            {`${blob.commentCount24h} new comments`}
          </El>
        </div>
        <div className={css(styles.section)}>
          <El
            nightMode={nightMode}
            type={'h4'}
          >
            Historical activity
          </El>
          <BarChartWithSelect
            data={postsData}
            nightMode={nightMode}
            rangeStart={postsX[0]}
            rangeEnd={postsX[postsX.length - 1]}
            selectOptions={postsSelectOptions}
            selectValue={postCountPlotRange}
            title={'Number of new posts'}
            onChange={(option) => changePostCountPlotRange(option.value)}
          />
          <BarChartWithSelect
            data={commentsData}
            nightMode={nightMode}
            rangeStart={commentsX[0]}
            rangeEnd={commentsX[commentsX.length - 1]}
            selectOptions={commentsSelectOptions}
            selectValue={commentCountPlotRange}
            title={'Number of new comments'}
            onChange={(option) => changeCommentCountPlotRange(option.value)}
          />
          <BarChartWithSelect
            data={activeUsersData}
            nightMode={nightMode}
            rangeStart={activeUsersX[0]}
            rangeEnd={activeUsersX[activeUsersX.length - 1]}
            selectOptions={activeUsersSelectOptions}
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
