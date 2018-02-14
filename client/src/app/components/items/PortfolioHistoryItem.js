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
  generatePortfolioHistoryChartData,
} from '../../helpers/chart';
import {
  LINE_CHART_AUXILLARY_STYLES,
  PORTFOLIO_RANGE_SELECT_OPTIONS,
  RANGE_SELECT_OPTIONS,
} from '../../constants/plots';
import LineChartWithSelectItem from './LineChartWithSelectItem';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minWidth: '0px',
    padding: '6px',
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
      portfolioTickers = [];
    }

    const [chartData, chartOptions] = generatePortfolioHistoryChartData(
      portfolioTickers,
      nightMode,
    );

    const selectOptions = disableChartOptions(
      earliestPortfolioTickerDate,
      PORTFOLIO_RANGE_SELECT_OPTIONS,
    );

    const onChange = (option) =>
      changeDashboardItemState(identifier, 'plotRange', option.value);

    return (
      <div className={css(styles.container)}>
        <LineChartWithSelectItem
          chartOptions={chartOptions}
          data={chartData}
          options={selectOptions}
          nightMode={nightMode}
          selectValue={plotRange}
          title={`Portfolio history`}
          onChange={onChange}
        />
      </div>
    );
  }
}

export default PortfolioHistoryItem;
