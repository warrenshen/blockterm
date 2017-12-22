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

const TokenPriceItem = ({ nightMode, token }) => {
  const {
    markets,
  } = token;

  const market = markets[0];
  const chartData = generateChartData(market.marketTickers);

  return (
    <div>
      <LineChartWithSelect
        data={chartData}
        nightMode={nightMode}
        selectOptions={RANGE_SELECT_OPTIONS}
        selectValue={''}
        title={`${market.name}`}
        onChange={(option) => option.value}
      />
    </div>
  );
}

export default TokenPriceItem;
