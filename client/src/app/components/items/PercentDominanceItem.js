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
        (historicalCount) => moment(historicalCount.timestamp, 'YYYY-M-D H:m:s Z').format(isPlotRangeBig(plotRange) ? 'MM/DD/YY' : 'MM/DD hh:mm a')
      );

      var style = LINE_CHART_DATA_STYLES;

      const datasets = [];
      datasets.push(Object.assign(
        {},
        LINE_CHART_AUXILLARY_STYLES[2].historical,
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
        LINE_CHART_AUXILLARY_STYLES[3].historical,
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
      const selectOptions = disableChartOptions(
        dashboardData[0].earliestMarketTickerDate,
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
        callback: (tick) => tick.substring(0, 5),
        fontColor: nightMode ? 'rgba(255, 255, 255, 0.7)' :
                               'rgba(0, 0, 0, 0.7)',
        padding: 6,
        minRotation: 45,
        maxRotation: 90, // angle in degrees
        autoSkip: true,
        maxTicksLimit: 25,
      };
      const yTicksConfig = {
        beginAtZero: true,
        callback: (value, index, values) => numeral(value / 100.0).format('(0%)'),
        fontColor: nightMode ? 'rgba(255, 255, 255, 0.7)' :
                               'rgba(0, 0, 0, 0.7)',
        max: 100.0,
        padding: 6,
      };
      const legendConfig = {
        display: true,
        labels: {
          fontColor: nightMode ? 'rgba(255, 255, 255, 1)' :
                                 'rgba(0, 0, 0, 1)',
        },
      };

      const chartOptions = {
        animation: false,
        legend: legendConfig,
        maintainAspectRatio: false,
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const name = data.datasets[tooltipItem.datasetIndex].label;
              const percent = numeral(parseFloat(tooltipItem.yLabel) / 100).format('(0.00%)');
              return `${name}: ${percent}`;
            },
            title: (tooltipItem, data) => data.labels[tooltipItem[0].index],
          },
          displayColors: false,
          intersect: false,
          mode: 'index',
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

      const bitcoinDominance = dashboardData[0].lastPrice;

      return (
        <div className={css(styles.container)}>
          <LineChartWithSelectItem
            chartOptions={chartOptions}
            data={data}
            onChange={onChange}
            options={selectOptions}
            nightMode={nightMode}
            selectValue={plotRange}
            title={`BTC Dominance: ${numeral(bitcoinDominance / 100).format('0.00%')}`}
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
