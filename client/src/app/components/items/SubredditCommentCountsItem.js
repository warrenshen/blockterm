// @flow weak

import React, {
  Component,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import { isEqual }         from 'underscore';
import moment              from 'moment';
import numeral             from 'numeral';
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
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '6px 6px 0px 6px',
  },
});

class SubredditCommentCountsItem extends Component {

  shouldComponentUpdate(nextProps, nextState)
  {
    return !isEqual(this.props.dashboardData, nextProps.dashboardData) ||
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

    const gridLinesConfig = {
      color: nightMode ? 'rgba(255, 255, 255, 0.15)' :
                         'rgba(0, 0, 0, 0.15)',
      zeroLineColor: nightMode ? 'rgba(255, 255, 255, 0.15)' :
                                 'rgba(0, 0, 0, 0.15)',
    };
    const xTicksConfig = {
      fontColor: nightMode ? 'rgba(255, 255, 255, 0.5)' :
                             'rgba(0, 0, 0, 0.5)',
      padding: 6,
    };
    const yTicksConfig = {
      callback: (value, index, values) => numeral(value).format('(0a)'),
      fontColor: nightMode ? 'rgba(255, 255, 255, 0.5)' :
                             'rgba(0, 0, 0, 0.5)',
      padding: 6,
    };
    const legendConfig = {
      display: false,
      labels: {
        fontColor: nightMode ? 'rgba(255, 255, 255, 0.5)' :
                               'rgba(0, 0, 0, 0.5)',
      },
    };

    const chartOptions = {
      animation: false,
      legend: legendConfig,
      maintainAspectRatio: false,
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => numeral(tooltipItem.yLabel).format('0,0'),
        },
        displayColors: true,
        intersect: false,
        mode: 'nearest',
      },
      scales: {
        xAxes: [
          {
            gridLines: gridLinesConfig,
            ticks: xTicksConfig,
          },
        ],
        yAxes: [
          {
            beginAtZero: true,
            gridLines: gridLinesConfig,
            ticks: yTicksConfig,
          },
        ],
      },
    };

    return (
      <div className={css(styles.container)}>
        <LineChartWithSelectItem
          chartOptions={chartOptions}
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
