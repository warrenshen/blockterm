// @flow weak

import React, {
  Component,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { isEqual }         from 'underscore';
import moment              from 'moment';
import LineChartWithSelect from '../LineChartWithSelect';
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

class SubredditPostCountsItem extends Component {

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


    let postCount;
    let postCounts;

    if (dashboardData)
    {
      postCount = dashboardData.postCount;
      postCounts = dashboardData.postCounts;
    }
    else
    {
      postCount = undefined;
      postCounts = [];
    }

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
      changeDashboardItemState(identifier, 'plotRange', option.value);

    return (
      <div className={css(styles.container)}>
        <LineChartWithSelect
          data={postsData}
          nightMode={nightMode}
          redraw={false}
          selectOptions={RANGE_SELECT_OPTIONS}
          selectValue={plotRange}
          title={`# of daily posts in r/${specific}`}
          onChange={onChange}
        />
      </div>
    );
  }
}

export default SubredditPostCountsItem;
