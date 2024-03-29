// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import moment              from 'moment';
import numeral             from 'numeral';
import { RANGE_SELECT_OPTIONS } from '../constants/plots';
import {
  disableChartOptions,
  generateCountChartData,
  isPlotRangeBig,
} from '../helpers/chart';
import BarChartWithSelect  from './BarChartWithSelect';
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
  sectionHeader: {
    display: 'inline-flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '8px',
    borderBottom: '1px solid #bdc3c7',
  },
});

class SubredditBody extends PureComponent {

  render()
  {
    const {
      activeUserCountPlotRange,
      commentCountPlotRange,
      nightMode,
      postCountPlotRange,
      subscriberCountPlotRange,
      subreddit,

      changeActiveUserCountPlotRange,
      changeCommentCountPlotRange,
      changePostCountPlotRange,
      changeSubscriberCountPlotRange,
    } = this.props;

    const {
      activeUserCount,
      activeUserCounts,
      commentCount,
      commentCounts,
      earliestActiveUserCountDate,
      earliestCommentCountDate,
      earliestPostCountDate,
      earliestSubscriberCountDate,
      postCount,
      postCounts,
      startDate,
      subscriberCount,
      subscriberCounts,
    } = subreddit;

    const postsX = postCounts.map(
      (postCount) => moment(postCount.timestamp, 'YYYY-M-D H:m:s Z').format('MM/DD')
    );
    const commentsX = commentCounts.map(
      (commentCount) => moment(commentCount.timestamp, 'YYYY-M-D H:m:s Z').format('MM/DD')
    );
    const activeUsersX = activeUserCounts.map(
      (activeUserCount) => moment(activeUserCount.timestamp, 'YYYY-M-D H:m:s Z').format('MM/DD HH:mm')
    );
    const subscibersX = subscriberCounts.map(
      (subscriberCount) => moment(subscriberCount.timestamp, 'YYYY-M-D H:m:s Z').format('MM/DD HH:mm')
    );

    // TODO: change chart labels from MM/DD to MM/DD/YY based on time range.
    const activeUsersData = generateCountChartData(
      activeUserCounts,
      activeUserCount,
      'now',
      isPlotRangeBig(activeUserCountPlotRange) ? 'M/D/YY' : 'MM/DD h:mm'
    );
    const commentsData = generateCountChartData(
      commentCounts,
      commentCount,
      'last 24 hours',
      isPlotRangeBig(commentCountPlotRange) ? 'M/D/YY' : 'MM/DD'
    );
    const postsData = generateCountChartData(
      postCounts,
      postCount,
      'last 24 hours',
      isPlotRangeBig(postCountPlotRange) ? 'M/D/YY' : 'MM/DD'
    );
    const subscribersData = generateCountChartData(
      subscriberCounts,
      subscriberCount,
      'now',
      isPlotRangeBig(subscriberCountPlotRange) ? 'M/D/YY' : 'MM/DD h:mm'
    );

    const activeUsersSelectOptions = disableChartOptions(
      earliestActiveUserCountDate,
      RANGE_SELECT_OPTIONS
    );
    const commentsSelectOptions = disableChartOptions(
      earliestCommentCountDate,
      RANGE_SELECT_OPTIONS
    );
    const postsSelectOptions = disableChartOptions(
      earliestPostCountDate,
      RANGE_SELECT_OPTIONS
    );
    const subscribersSelectOptions = disableChartOptions(
      earliestSubscriberCountDate,
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
          <div className={css(styles.sectionHeader)}>
            <El
              nightMode={nightMode}
              type={'h4'}
            >
              Historical activity
            </El>
            {
              earliestPostCountDate !== startDate && (
                <El
                  nightMode={nightMode}
                  type={'h5'}
                >
                  Note: posts and comments data collection still in progress, data may not be complete
                </El>
              )
            }
          </div>
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
            selectOptions={subscribersSelectOptions}
            selectValue={subscriberCountPlotRange}
            title={'Number of subscribers'}
            onChange={(option) => changeSubscriberCountPlotRange(option.value)}
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
