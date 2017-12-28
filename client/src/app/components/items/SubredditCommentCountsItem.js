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

const SubredditCommentCountsItem = ({
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
    commentCount,
    commentCounts,
  } = data;

  const commentsX = commentCounts.map(
    (commentCount) => moment(commentCount.timestamp, 'YYYY-M-D H:m:s Z').format('MM/DD')
  );
  const commentsData = generateLineChartData(
    commentCounts,
    commentCount,
    'last 24 hours',
    isPlotRangeBig(plotRange) ? 'M/D/YY' : 'MM/DD',
    nightMode,
  );
  const onChange = (option) =>
    changeDashboardPageState(identifier, 'plotRange', option.value);

  return (
    <div className={css(styles.container)}>
      <LineChartWithSelect
        data={commentsData}
        nightMode={nightMode}
        selectOptions={RANGE_SELECT_OPTIONS}
        selectValue={plotRange}
        title={`# of daily comments in r/${specific}`}
        onChange={onChange}
      />
    </div>
  );
}

export default SubredditCommentCountsItem;
