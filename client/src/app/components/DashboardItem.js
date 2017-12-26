// @flow weak

import React, {
  Component,
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
import SubredditCommentCountsItem from './items/SubredditCommentCountsItem';
import SubredditPostsItem from './items/SubredditPostsItem';
import TokenPriceItem from './items/TokenPriceItem';
import TVChartItem from './items/TVChartItem';
import TVMarketOverviewItem from './items/TVMarketOverviewItem';
import * as STYLES from '../constants/styles';
import El                  from './El';

import {
  SUBREDDIT_COMMENT_COUNTS,
  SUBREDDIT_POST_COUNTS,
  TV_CANDLE_CHART,
  TV_MARKET_OVERVIEW,
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    lineHeight: '4px',
    width: '100%',
    borderBottom: `1px solid #666`,
    ':hover': {
      cursor: 'move',
    },
  },
  widgetTitle: {
    lineHeight: '12px',
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginLeft: '2px',
    marginTop: '2px',
  },
  section: {
    flex: '1',
  },
  rightAlign: {
    textAlign: 'right',
  }
});

class DashboardItem extends Component {

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
      case SUBREDDIT_COMMENT_COUNTS:
        return (
          <SubredditCommentCountsItem
            data={data}
            id={dashboardItem.id}
            nightMode={nightMode}
            storeState={storeState}
          />
        );
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
      case TV_MARKET_OVERVIEW:
        return (
          <TVMarketOverviewItem
            nightMode={nightMode}
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
      nightMode,
      removeFromLayout,
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
          <div className={css(styles.section)}>
            <El
              style={styles.widgetTitle}
              nightMode={nightMode}
              type={'h5'}>
              {dashboardItem.identifier}
            </El>
          </div>
          <div className={css(styles.section, styles.rightAlign)}>
            <button
              className={css(styles.closeButton, nightMode && styles.darkCloseButton)}
              onClick={(event) => removeFromLayout(id)}
            >
              <strong>x</strong>
            </button>
          </div>
        </div>
        {this.renderItem(dashboardItem)}
      </div>
    );
  }
}

export default DashboardItem;
