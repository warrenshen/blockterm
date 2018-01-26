// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import TVChartItemLarge    from './items/TVChartItemLarge';

class DashboardItemLarge extends PureComponent
{
  render()
  {
    const {
      nightMode,
      value,
    } = this.props;

    return (
      <TVChartItemLarge
        dashboardAction={false}
        nightMode={nightMode}
        value={value}
      />
    );
  }
}

export default DashboardItemLarge;
