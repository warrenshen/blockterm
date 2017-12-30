// @flow weak

import React, {
  Component,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { isEqual }         from 'underscore';
import moment              from 'moment';
import {
  disableChartOptions,
  generateLineChartDataValue,
  isPlotRangeBig,
} from '../../helpers/chart';
import {
  RANGE_SELECT_OPTIONS,
} from '../../constants/plots';
import LineChartWithSelectItem from './LineChartWithSelectItem';

class TotalMarketCapItem extends Component {

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

    let earliestMarketTickerDate;
    let marketTickers;

    if (dashboardData)
    {
      earliestMarketTickerDate = dashboardData.earliestMarketTickerDate;
      marketTickers = dashboardData.marketTickers;
    }
    else
    {
      earliestMarketTickerDate = undefined;
      marketTickers = [];
    }

    const marketTickersX = marketTickers.map(
      (marketTicker) => moment(marketTicker.timestamp, 'YYYY-M-D H:m:s Z').format('MM/DD')
    );
    const data = generateLineChartDataValue(
      marketTickers,
      null,
      'now',
      isPlotRangeBig(plotRange) ? 'M/D/YY' : 'MM/DD',
      nightMode,
    );
    const selectOptions = disableChartOptions(
      earliestMarketTickerDate,
      RANGE_SELECT_OPTIONS,
    );

    const onChange = (option) =>
      changeDashboardItemState(identifier, 'plotRange', option.value);

    return (
      <LineChartWithSelectItem
        data={data}
        onChange={onChange}
        options={selectOptions}
        nightMode={nightMode}
        selectValue={plotRange}
        title={`Total market cap over time`}
      />
    );
  }
}

export default TotalMarketCapItem;
