// @flow weak

import React, {
  Component,
}                          from 'react';
import PropTypes           from 'prop-types';
import { isEqual }         from 'underscore';
import moment              from 'moment';
import { StyleSheet, css } from 'aphrodite/no-important';
import {
  disableChartOptions,
  generateLineChartData,
  isPlotRangeBig,
} from '../../helpers/chart';
import {
  RANGE_SELECT_OPTIONS,
} from '../../constants/plots';
import LineChartWithSelectItem from './LineChartWithSelectItem';

const styles = StyleSheet.create({
  chartWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flex: '1',
    marginBottom: '-10px',
  },
});

class SubredditCommentCountsItem extends Component {

  shouldComponentUpdate(nextProps, nextState)
  {
    return !isEqual(this.props.dashboardData, nextProps.dashboardData) ||
           !isEqual(this.props.dashboardItem, nextProps.dashboardItem) ||
           !isEqual(this.props.dashboardState, nextProps.dashboardState) ||
           !isEqual(this.props.nightMode, nextProps.nightMode);
  }

  render()
  {
    const {
      changeDashboardItemState,
      dashboardData,
      dashboardState,
      identifier,
      nightMode,
      specific,
    } = this.props;

    const {
      plotRange,
    } = dashboardState;

    let commentCount;
    let commentCounts;
    let earliestCommentCountDate;

    if (dashboardData)
    {
      commentCount = dashboardData.commentCount;
      commentCounts = dashboardData.commentCounts;
      earliestCommentCountDate = dashboardData.earliestCommentCountDate;
    }
    else
    {
      commentCount = undefined;
      commentCounts = [];
      earliestCommentCountDate = undefined;
    }

    const commentsX = commentCounts.map(
      (commentCount) => moment(commentCount.timestamp, 'YYYY-M-D H:m:s Z').format('MM/DD')
    );
    const data = generateLineChartData(
      commentCounts,
      commentCount,
      'last 24 hours',
      isPlotRangeBig(plotRange) ? 'M/D/YY' : 'MM/DD',
      nightMode,
    );
    const selectOptions = disableChartOptions(
      earliestCommentCountDate,
      RANGE_SELECT_OPTIONS,
    );

    const onChange = (option) =>
      changeDashboardItemState(identifier, 'plotRange', option.value);

    return (
      <div className={css(styles.chartWrapper)}>
        <LineChartWithSelectItem
          data={data}
          onChange={onChange}
          options={selectOptions}
          nightMode={nightMode}
          selectValue={plotRange}
          title={`# of daily comments in r/${specific}`}
        />
      </div>
    );
  }
}

export default SubredditCommentCountsItem;
