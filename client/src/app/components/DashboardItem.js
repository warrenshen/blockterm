// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import {
  disableChartOptions,
  generateCountChartData,
} from '../helpers/chart';
import {
  RANGE_SELECT_OPTIONS,
} from '../constants/plots';
import SubredditPostsItem from './items/SubredditPostsItem';
import TokenPriceItem from './items/TokenPriceItem';
import TVChartItem from './items/TVChartItem';
import * as STYLES from '../constants/styles';

import {
  SUBREDDIT_POST_COUNTS,
  TV_CANDLE_CHART,
  parseIdentifer,
}                             from '../constants/items';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  closeButton: {
    color: '#000',
    borderLeft: `1px solid ${STYLES.BORDERLIGHT}`,
    padding: '0px 2px',
    lineHeight: '12px',
  },
  darkCloseButton: {
    backgroundColor: '#000',
    color: '#fff',
  },
  grabBar: {
    lineHeight: '4px',
    textAlign: 'right',
    width: '100%',
    borderBottom: `1px solid #666`,
    ':hover': {
      cursor: 'move',
    },
  },
});

class DashboardItem extends PureComponent {
  renderItem(dashboardItem)
  {
    const {
      changeDashboardItemPlotRange,
      data,
      nightMode,
      storeState,
    } = this.props;

    const arr = parseIdentifer(dashboardItem.identifier);
    const identifierKey = arr[0];
    const identifierValue = arr[1];

    switch (identifierKey)
    {
      case SUBREDDIT_POST_COUNTS:
        return (
          <SubredditPostsItem
            data={data}
            id={dashboardItem.id}
            nightMode={nightMode}
            storeState={storeState}
          />
        );
      case 'TOKEN-PRICE':
        return (
          <TokenPriceItem
            changeDashboardItemPlotRange={changeDashboardItemPlotRange}
            id={dashboardItem.id}
            nightMode={nightMode}
            storeState={storeState}
            token={data}
          />
        );
      case TV_CANDLE_CHART:
        return (
          <TVChartItem
            nightMode={nightMode}
            value={identifierValue}
          />
        );
      default:
        return <div>Unmatched identifier</div>;
    }
  }

  render()
  {
    const {
      dashboardItem,
      destroyDashboardItem,
      nightMode,
    } = this.props;

    const {
      id,
    } = dashboardItem;

    return (
      <div
        className={css(styles.container)}
        key={id}
      >
        <div className={css(styles.grabBar)}>
          <button className={css(styles.closeButton, nightMode && styles.darkCloseButton)} onClick={(event) => destroyDashboardItem(id)}>
            <strong>x</strong>
          </button>
        </div>
        {this.renderItem(dashboardItem)}
      </div>
    );
  }
}

export default DashboardItem;
