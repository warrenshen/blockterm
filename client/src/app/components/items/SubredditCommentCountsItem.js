// @flow weak

import React               from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import moment              from 'moment';
import BarChartWithSelect  from '../BarChartWithSelect';
import {
  generateCountChartData,
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
  data,
  nightMode,
  storeState,
}) => {
  // const {
  //   plotRange,
  // } = storeState;

  const {
    commentCount,
    commentCounts,
  } = data;

  const commentsX = commentCounts.map(
    (commentCount) => moment(commentCount.timestamp, 'YYYY-M-D H:m:s Z').format('MM/DD')
  );
  const commentsData = generateCountChartData(
    commentCounts,
    commentCount,
    'last 24 hours',
    isPlotRangeBig('1 week') ? 'M/D/YY' : 'MM/DD'
  );

  return (
    <div className={css(styles.container)}>
      <BarChartWithSelect
        data={commentsData}
        nightMode={nightMode}
        selectOptions={RANGE_SELECT_OPTIONS}
        selectValue={'1 week'}
        title={'Number of new posts'}
        onChange={(option) => changeDashboardItemPlotRange(dashboardItem.id, option.value)}
      />
    </div>
  );
}

export default SubredditCommentCountsItem;
