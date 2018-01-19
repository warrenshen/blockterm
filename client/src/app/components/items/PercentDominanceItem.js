// @flow weak

import React, {
  Component,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { isEqual }         from 'underscore';
import moment              from 'moment';
import numeral             from 'numeral';
import {
  disableChartOptions,
  generateLineChartDataValue,
  isPlotRangeBig,
} from '../../helpers/chart';
import {
  RANGE_SELECT_OPTIONS,
} from '../../constants/plots';
import LineChartWithSelectItem from './LineChartWithSelectItem';


import {
  BAR_CHART_DATA_STYLES,
  LINE_CHART_DATA_STYLES,
  LINE_CHART_AUXILLARY_STYLES,
  COMPARE_CHART_DATA_STYLES,
  THREE_MONTHS,
  SIX_MONTHS,
  ONE_YEAR,
  THREE_YEARS,
  ALL_TIME,
} from '../../constants/plots';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
});

class PercentDominanceItem extends Component
{
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

    if (dashboardData)
    {
      const labels = dashboardData[0].marketTickers.map(
        (historicalCount) => moment(historicalCount.timestamp, 'YYYY-M-D H:m:s Z').format('MM/DD')
      );

      var style = LINE_CHART_DATA_STYLES;

      const datasets = [];
      datasets.push(Object.assign(
        {},
        LINE_CHART_DATA_STYLES[0].historical,
        {
          data: dashboardData[0].marketTickers.map((historicalCount) => historicalCount.value),
          fill: 'origin',
          label: 'Bitcoin',
        }
      ));
      datasets.push(Object.assign(
        {},
        LINE_CHART_AUXILLARY_STYLES[0].historical,
        {
          data: dashboardData[1].marketTickers.map((historicalCount) => historicalCount.value),
          fill: '-1',
          label: 'Ethereum',
        }
      ));
      datasets.push(Object.assign(
        {},
        LINE_CHART_AUXILLARY_STYLES[0].historical,
        {
          data: dashboardData[2].marketTickers.map((historicalCount) => historicalCount.value),
          fill: '-1',
          label: 'Other coins',
        }
      ));

      const data = {
        labels: labels,
        datasets: datasets,
      };

      console.log(datasets);
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
        callback: (value, index, values) => numeral(value / 100.0).format('(0.00%)'),
        fontColor: nightMode ? 'rgba(255, 255, 255, 0.5)' :
                               'rgba(0, 0, 0, 0.5)',
        padding: 6,
      };
      const legendConfig = {
        display: true,
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
            label: (tooltipItem, data) => numeral(parseFloat(tooltipItem.yLabel) / 100).format('(0.00%)'),
            title: (tooltipItem, data) => data.labels[tooltipItem[0].index],
          },
          displayColors: false,
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
              gridLines: gridLinesConfig,
              stacked: true,
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
            // onChange={onChange}
            // options={selectOptions}
            nightMode={nightMode}
            selectValue={plotRange}
            title={`Bitcoin dominance`}
          />
        </div>
      );
    }
    else
    {
      return (
        <div className={css(styles.container)}>
        </div>
      );
    }
  }
}

export default PercentDominanceItem;
