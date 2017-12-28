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
  changeDashboardPageState,
  dashboardState,
  data,
  identifier,
  nightMode,
  specific,
}) => {
  const {
    plotRange,
  } = dashboardState;

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
    isPlotRangeBig(plotRange) ? 'M/D/YY' : 'MM/DD',
    nightMode,
  );
  const onChange = (option) =>
    changeDashboardPageState(identifier, 'plotRange', option.value);

  return (
    <div className={css(styles.container)}>
      <LineChartWithSelect
        data={postsData}
        nightMode={nightMode}
        selectOptions={RANGE_SELECT_OPTIONS}
        selectValue={plotRange}
        title={`# of daily posts in r/${specific}`}
        onChange={onChange}
      />
    </div>
  );
}

export default SubredditPostsItem;
