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

    let earliestPostCountDate;
    let postCount;
    let postCounts;

    if (dashboardData)
    {
      earliestPostCountDate = dashboardData.earliestPostCountDate;
      postCount = dashboardData.postCount;
      postCounts = dashboardData.postCounts;
    }
    else
    {
      earliestPostCountDate = undefined;
      postCount = undefined;
      postCounts = [];
    }

    const postsX = postCounts.map(
      (postCount) => moment(postCount.timestamp, 'YYYY-M-D H:m:s Z').format('MM/DD')
    );
    const data = generateLineChartData(
      postCounts,
      postCount,
      'last 24 hours',
      isPlotRangeBig(plotRange) ? 'M/D/YY' : 'MM/DD',
      nightMode,
    );
    const selectOptions = disableChartOptions(
      earliestPostCountDate,
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
          title={`# of daily posts in r/${specific}`}
        />
      </div>
    );
  }
}

export default SubredditPostCountsItem;
