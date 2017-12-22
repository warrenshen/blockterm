// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import moment              from 'moment';
import { RANGE_SELECT_OPTIONS } from '../constants/plots';
import {
  disableChartOptions,
  generateCountChartData,
} from '../helpers/chart';
import BarChartWithSelect  from './BarChartWithSelect';
import El                  from './El';

const styles = StyleSheet.create({
  container: {
    padding: '0px 24px 24px',
    boxSizing: 'content-box',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
  nightMode: {
    backgroundColor: '#000',
  },
  section: {
    width: '100%',
    paddingTop: '24px',
    display: 'flex',
    flexDirection: 'column',
  },
  sectionHeader: {
    marginBottom: '8px',
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

    const {
      activeUserCount,
      commentCount,
      postCount,
      subscriberCount,
      activeUserCounts,
      commentCounts,
      postCounts,
      subscriberCounts,
    } = subreddit;

    const postsX = postCounts.map(
      (postCount) => moment(postCount.timestamp).format('MM/DD')
    );
    const commentsX = commentCounts.map(
      (commentCount) => moment(commentCount.timestamp).format('MM/DD')
    );
    const activeUsersX = activeUserCounts.map(
      (activeUserCount) => moment(activeUserCount.timestamp).format('MM/DD h:mm')
    );
    const subscibersX = subscriberCounts.map(
      (subscriberCount) => moment(subscriberCount.timestamp).format('MM/DD h:mm')
    );

    // TODO: change chart labels from MM/DD to MM/DD/YY based on time range.
    const activeUsersData = generateCountChartData(
      activeUserCounts,
      activeUserCount,
      'now',
      'MM/DD h:mm'
    );
    const commentsData = generateCountChartData(commentCounts, commentCount);
    const postsData = generateCountChartData(postCounts, postCount);
    const subscribersData = generateCountChartData(
      subscriberCounts,
      subscriberCount,
      'now',
      'MM/DD h:mm'
    );

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
            <strong>{`${activeUserCount}`}</strong> active users
          </El>
          <El nightMode={nightMode} type={'span'}>
            <strong>{`${postCount}`}</strong> new posts
          </El>
          <El nightMode={nightMode} type={'span'}>
            <strong>{`${commentCount}`}</strong> new comments
          </El>
        </div>
        <div className={css(styles.section)}>
          <El
            style={styles.sectionHeader}
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
            data={subscribersData}
            nightMode={nightMode}
            title={'Number of subscribers'}
            onChange={(option) => option.value}
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
