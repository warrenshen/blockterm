// @flow weak

import React, {
  Component,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { isEqual }         from 'underscore';
import {
  disableChartOptions,
  generateCountChartData,
} from '../helpers/chart';
import {
  RANGE_SELECT_OPTIONS,
} from '../constants/plots';
import SubredditCommentCountsItem from './items/SubredditCommentCountsItem';
import SubredditPostCountsItem    from './items/SubredditPostCountsItem';
import TokenPriceItem             from './items/TokenPriceItem';
import TotalMarketCapItem         from './items/TotalMarketCapItem';
import TVChartItem                from './items/TVChartItem';
import TVMarketOverviewItem       from './items/TVMarketOverviewItem';
import * as STYLES                from '../constants/styles';
import El                         from './El';
import FontAwesome                from 'react-fontawesome';

import {
  SUBREDDIT_COMMENT_COUNTS,
  SUBREDDIT_POST_COUNTS,
  TOTAL_MARKET_CAP,
  TV_CANDLE_CHART,
  TV_MARKET_OVERVIEW,
  parseIdentifer,
}                             from '../constants/items';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  closeButton: {
    color: '#000',
    borderLeft: `1px solid ${STYLES.BORDERLIGHT}`,
    padding: '1px 4px',
    lineHeight: '14px',
    width:'20px',
  },
  darkCloseButton: {
    backgroundColor: '#000',
    borderColor: '#ccc',
    color: '#fff',
  },
  floatingResizeButton: {
    position: 'absolute',
    bottom:'-2px',
    right:'0px',
    zIndex:'1',
    color: '#333',
    pointerEvents: 'none',
  },
  nightResizeButton: {
    color: '#fff',
  },
  lockedElement: {
    opacity: '0.5',
    pointerEvents: 'none',
  },
  lockedResize: {
    opacity: '0.4',
    pointerEvents: 'none',
  },
  grabBar: {
    zIndex: '2',
    display: 'inline-flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    lineHeight: '4px',
    width: '100%',
    borderBottom: `1px solid #666`,
    ':hover': {
      cursor: 'move',
    },
  },
  nightBar: {
    backgroundColor: '#000',
  },
  widgetTitle: {
    lineHeight: '16px',
    fontSize: '14px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginLeft: '4px',
    marginTop: '1px',
    fontWeight: '500',
  },
  section: {
    flex: '1',
    overflowX: 'hidden',
    backgroundColor: 'none',
  },
  leftSection: {
    flex: '1',
  },
  rightAlignSmall: {
    textAlign: 'right',
  },
  item: {
    flex: '1',
    display: 'inline-flex',
  },
});

class DashboardItem extends Component {

  shouldComponentUpdate(nextProps, nextState)
  {
    return !isEqual(this.props.dashboardAction, nextProps.dashboardAction) ||
           !isEqual(this.props.dashboardData, nextProps.dashboardData) ||
           !isEqual(this.props.dashboardItem, nextProps.dashboardItem) ||
           !isEqual(this.props.dashboardState, nextProps.dashboardState) ||
           !isEqual(this.props.nightMode, nextProps.nightMode);
  }

  renderItem(dashboardItem)
  {
    const {
      dashboardAction,
      dashboardData,
      dashboardState,
      nightMode,

      changeDashboardItemState,
    } = this.props;

    const identifier = dashboardItem.identifier;
    const arr = parseIdentifer(identifier);
    const identifierKey = arr[0];
    const identifierValue = arr[1];

    switch (identifierKey)
    {
      case SUBREDDIT_COMMENT_COUNTS:
        return (
          <SubredditCommentCountsItem
            changeDashboardItemState={changeDashboardItemState}
            dashboardData={dashboardData}
            dashboardState={dashboardState}
            identifier={identifier}
            specific={identifierValue}
            nightMode={nightMode}
          />
        );
      case SUBREDDIT_POST_COUNTS:
        return (
          <SubredditPostCountsItem
            changeDashboardItemState={changeDashboardItemState}
            dashboardData={dashboardData}
            dashboardState={dashboardState}
            identifier={identifier}
            specific={identifierValue}
            nightMode={nightMode}
          />
        );
      case TOTAL_MARKET_CAP:
        return (
          <TotalMarketCapItem
            changeDashboardItemState={changeDashboardItemState}
            dashboardData={dashboardData}
            dashboardState={dashboardState}
            identifier={identifier}
            nightMode={nightMode}
          />
        );
      case TV_CANDLE_CHART:
        return (
          <TVChartItem
            dashboardAction={dashboardAction}
            nightMode={nightMode}
            value={identifierValue}
          />
        );
      case TV_MARKET_OVERVIEW:
        return (
          <TVMarketOverviewItem
            dashboardAction={dashboardAction}
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
      updateLayoutItem,
    } = this.props;

    const {
      id,
      identifier,
    } = dashboardItem;
    const staticActive = dashboardItem.static;

    const onClickEdit = (event) => console.log('helo');
    const onClickLock = (event) => updateLayoutItem(id, identifier, !staticActive);
    const onClickRemove = (event) => removeFromLayout(id);

    return (
      <div
        className={css(styles.container)}
        key={id}
      >
        <div className={css(styles.grabBar, nightMode && styles.nightBar)}>
          <div className={css(styles.section, styles.leftSection)}>
            <El
              style={styles.widgetTitle}
              nightMode={nightMode}
              type={'h5'}>
              {dashboardItem.identifier}
            </El>
          </div>
          <div className={css(styles.rightAlignSmall)}>
            <button
              className={css(styles.closeButton, nightMode && styles.darkCloseButton, staticActive && styles.lockedElement)}
              onClick={onClickEdit}
              title="Edit this widget and or swap it out for another."
            >
              <FontAwesome name='pencil' style={{'fontSize':'13px'}}/>
            </button>
            <button
              title="Drag and drop to move widget around"
              className={css(styles.closeButton, nightMode && styles.darkCloseButton, staticActive && styles.lockedElement)}
              >
              <FontAwesome name='arrows' style={{'fontSize':'13px'}}/>
            </button>
            <button
              className={css(styles.closeButton, nightMode && styles.darkCloseButton)}
              onClick={onClickLock}
              title="Lock and unlock element position and sizing"
            >
              <FontAwesome name={staticActive ? 'lock' : 'unlock'} style={{'fontSize':'13px'}}/>
            </button>
            <button
              title="Press to remove this widget from the dashboard."
              className={css(styles.closeButton, nightMode && styles.darkCloseButton)}
              onClick={onClickRemove}
            >
              <FontAwesome name='remove' />
            </button>
          </div>
        </div>
        <div className={css(styles.item)}>
          {this.renderItem(dashboardItem)}
          <FontAwesome name='caret-up' className={css(styles.floatingResizeButton, nightMode && styles.nightResizeButton, staticActive && styles.lockedResize)} style={{'transform':'rotate(135deg)'}} />
        </div>
      </div>
    );
  }
}

export default DashboardItem;
