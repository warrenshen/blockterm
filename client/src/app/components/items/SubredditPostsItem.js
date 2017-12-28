// @flow weak

import React               from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import moment              from 'moment';
import LineChartWithSelect  from '../LineChartWithSelect';
import {
  generateLineChartData,
  isPlotRangeBig,
} from '../../helpers/chart';
import {
  RANGE_SELECT_OPTIONS,
} from '../../constants/plots';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '0px !important',
    position: 'relative',
    paddingBottom: '15px',
  },
});

const SubredditPostsItem = ({
  data,
  nightMode,
  storeState,
  specific
}) => {
  // const {
  //   plotRange,
  // } = storeState;

  const {
    postCount,
    postCounts,
  } = data;

  const postsX = postCounts.map(
    (postCount) => moment(postCount.timestamp, 'YYYY-M-D H:m:s Z').format('MM/DD')
  );
  const postsData = generateLineChartData(
    postCounts,
    postCount,
    'last 24 hours',
    isPlotRangeBig('1 week') ? 'M/D/YY' : 'MM/DD',
    nightMode,
  );

  return (
    <div className={css(styles.container)}>
      <LineChartWithSelect
        data={postsData}
        nightMode={nightMode}
        selectOptions={RANGE_SELECT_OPTIONS}
        selectValue={'1 week'}
        title={`# of daily posts in r/${specific}`}
        onChange={(option) => changeDashboardItemPlotRange(dashboardItem.id, option.value)}
      />
    </div>
  );
}

export default SubredditPostsItem;
