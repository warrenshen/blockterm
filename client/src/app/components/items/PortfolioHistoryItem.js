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
  LINE_CHART_AUXILLARY_STYLES,
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

class PortfolioHistoryItem extends Component
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
    } = this.props;

    const {
      plotRange,
    } = dashboardState;

    let earliestPortfolioTickerDate;
    let portfolioTickers;

    if (dashboardData)
    {
      earliestPortfolioTickerDate = dashboardData.earliestPortfolioTickerDate;
      portfolioTickers = dashboardData.portfolioTickers;
    }
    else
    {
      earliestPortfolioTickerDate = undefined;
      marketTickers = [];
    }

    const chartData = {
      labels: portfolioTickers.map(
        (portfolioTicker) => moment(portfolioTicker.timestamp, 'YYYY-M-D H:m:s Z').format('MM/DD/YY')
      ),
      datasets: [
        Object.assign(
          {},
          LINE_CHART_AUXILLARY_STYLES[2].historical,
          {
            data: portfolioTickers.map((portfolioTicker) => portfolioTicker.valueUSD),
            label: 'Fiat',
            yAxisID: 'fiat',
          }
        ),
        Object.assign(
          {},
          LINE_CHART_AUXILLARY_STYLES[3].historical,
          {
            data: portfolioTickers.map((portfolioTicker) => portfolioTicker.valueBTC),
            label: 'BTC',
            yAxisID: 'btc',
          }
        ),
        Object.assign(
          {},
          LINE_CHART_AUXILLARY_STYLES[0].historical,
          {
            data: portfolioTickers.map((portfolioTicker) => portfolioTicker.valueETH),
            label: 'ETH',
            yAxisID: 'eth',
          }
        ),
      ],
    };

    const selectOptions = disableChartOptions(
      earliestPortfolioTickerDate,
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
      animation: false,
      legend: legendConfig,
      maintainAspectRatio: false,
      tooltips: {
        // callbacks: {
        //   label: (tooltipItem, data) => numeral(tooltipItem.yLabel).format('$0,0'),
        //   title: (tooltipItem, data) => data.labels[tooltipItem[0].index],
        // },
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
            display: true,
            gridLines: gridLinesConfig,
            id: 'fiat',
            position: 'right',
            ticks: yTicksConfig,
            type: 'linear',
          },
          {
            display: true,
            gridLines: {
              drawOnChartArea: false,
            },
            id: 'btc',
            ticks: yTicksConfig,
            type: 'linear',
          },
          {
            display: true,
            gridLines: {
              drawOnChartArea: false,
            },
            id: 'eth',
            ticks: yTicksConfig,
            type: 'linear',
          },
        ],
      },
    };

    return (
      <div className={css(styles.container)}>
        <LineChartWithSelectItem
          chartOptions={chartOptions}
          data={chartData}
          onChange={onChange}
          options={selectOptions}
          nightMode={nightMode}
          selectValue={plotRange}
          title={`Current value: ${numeral(lastPrice).format('$0,0')}`}
        />
      </div>
    );
  }
}

export default PortfolioHistoryItem;
