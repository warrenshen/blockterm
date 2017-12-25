// @flow weak

import React               from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import moment              from 'moment';
import BarChartWithSelect  from '../BarChartWithSelect';
import {
  generateCountChartData,
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
  },
});

const SubredditPostsItem = ({
  data,
  nightMode,
  storeState,
}) => {
  const {
    plotRange,
  } = storeState;

  const {
    postCount,
    postCounts,
  } = data;

  const postsX = postCounts.map(
    (postCount) => moment(postCount.timestamp, 'YYYY-M-D H:m:s Z').format('MM/DD')
  );
  const postsData = generateCountChartData(postCounts, postCount);

  return (
    <div className={css(styles.container)}>
      <BarChartWithSelect
        data={postsData}
        nightMode={nightMode}
        selectOptions={RANGE_SELECT_OPTIONS}
        selectValue={plotRange}
        title={'Number of new posts'}
        onChange={(option) => changeDashboardItemPlotRange(dashboardItem.id, option.value)}
      />
    </div>
  );
}

export default SubredditPostsItem;
