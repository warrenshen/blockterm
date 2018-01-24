// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import TVChartItem         from './items/TVChartItem';

class DashboardItemLarge extends PureComponent
{
  render()
  {
    const {
      nightMode,
    } = this.props;

    return (
      <TVChartItem
        dashboardAction={false}
        nightMode={nightMode}
        value={'BITSTAMP:ETHBTC'}
      />
    );
  }
}

export default DashboardItemLarge;
