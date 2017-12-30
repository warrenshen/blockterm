// @flow weak

import React, {
  Component,
}                          from 'react';
import PropTypes           from 'prop-types';
import { isEqual }         from 'underscore';
import moment              from 'moment';
import {
  generateLineChartData,
  isPlotRangeBig,
} from '../../helpers/chart';
import {
  RANGE_SELECT_OPTIONS,
} from '../../constants/plots';
import LineChartWithSelectItem from './LineChartWithSelectItem';

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

    if (dashboardData)
    {
      commentCount = dashboardData.commentCount;
      commentCounts = dashboardData.commentCounts;
    }
    else
    {
      commentCount = undefined;
      commentCounts = [];
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
    const onChange = (option) =>
      changeDashboardItemState(identifier, 'plotRange', option.value);

    return (
      <LineChartWithSelectItem
        data={data}
        onChange={onChange}
        options={RANGE_SELECT_OPTIONS}
        nightMode={nightMode}
        selectValue={plotRange}
        title={`# of daily comments in r/${specific}`}
      />
    );
  }
}

export default SubredditCommentCountsItem;
