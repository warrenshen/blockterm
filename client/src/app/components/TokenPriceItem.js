// @flow weak

import React               from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

import {
  LINE_CHART_DATA_STYLES,
  RANGE_SELECT_OPTIONS,
} from '../constants/plots';
import {
  generateChartData,
} from '../helpers/chart';
import LineChartWithSelect from './LineChartWithSelect';
import {
  SMALL_RANGE_SELECT_OPTIONS,
} from '../constants/plots';

const TokenPriceItem = ({
  changeDashboardItemPlotRange,
  id,
  nightMode,
  storeState,
  token,
}) => {
  const {
    markets,
  } = token;

  const {
    plotRange,
  } = storeState;

  const market = markets[0];
  const chartData = generateChartData(market.marketTickers);

  return (
    <div>
      <LineChartWithSelect
        data={chartData}
        nightMode={nightMode}
        selectOptions={SMALL_RANGE_SELECT_OPTIONS}
        selectValue={plotRange}
        title={`${market.name}`}
        onChange={(option) => changeDashboardItemPlotRange(id, option.value)}
      />
    </div>
  );
}

export default TokenPriceItem;
