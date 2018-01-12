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

class TotalMarketCapItem extends Component
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

    let lastPrice;
    let earliestMarketTickerDate;
    let marketTickers;

    if (dashboardData)
    {
      lastPrice = dashboardData.lastPrice;
      earliestMarketTickerDate = dashboardData.earliestMarketTickerDate;
      marketTickers = dashboardData.marketTickers;
    }
    else
    {
      lastPrice = undefined;
      earliestMarketTickerDate = undefined;
      marketTickers = [];
    }

    const data = generateLineChartDataValue(
      marketTickers,
      null,
      'now',
      isPlotRangeBig(plotRange) ? 'M/D/YY' : 'MM/DD H:m',
      nightMode,
      true,
    );
    const selectOptions = disableChartOptions(
      earliestMarketTickerDate,
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
      fontColor: nightMode ? 'rgba(255, 255, 255, 0.5)' :
                             'rgba(0, 0, 0, 0.5)',
      padding: 6,
    };
    const yTicksConfig = {
      callback: (value, index, values) => numeral(value).format('($0a)'),
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
      legend: legendConfig,
      maintainAspectRatio: false,
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => numeral(tooltipItem.yLabel).format('$0,0'),
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
            ticks: yTicksConfig,
          },
        ],
      },
    };

    return (
      <LineChartWithSelectItem
        chartOptions={chartOptions}
        data={data}
        onChange={onChange}
        options={selectOptions}
        nightMode={nightMode}
        selectValue={plotRange}
        title={`Total Market Cap: ${numeral(lastPrice).format('$0,0')}`}
      />
    );
  }
}

export default TotalMarketCapItem;
