// @flow weak

import React, {
  Component,
}                                 from 'react';
import PropTypes                  from 'prop-types';
import { StyleSheet, css }        from 'aphrodite';
import { isEqual }                from 'underscore';
import * as STYLES                from '../constants/styles';
import {
  CC_CHART,
  PERCENT_DOMINANCE_ITEM,
  PORTFOLIO_ITEM,
  SUBREDDIT_COMMENT_COUNTS,
  SUBREDDIT_POST_COUNTS,
  TOTAL_MARKET_CAP,
  TV_CANDLE_CHART,
  TV_MARKET_OVERVIEW,
  TWITTER_ITEM,
  convertIdentifierToTitle,
  parseIdentifier,
  parseIdentiferKey,
}                                 from '../constants/items';
import CCChartItem                from './items/CCChartItem';
import PercentDominanceItem       from './items/PercentDominanceItem';
import PortfolioItem              from './items/PortfolioItem';
import SubredditCommentCountsItem from './items/SubredditCommentCountsItem';
import SubredditPostCountsItem    from './items/SubredditPostCountsItem';
import TokenPriceItem             from './items/TokenPriceItem';
import TotalMarketCapItem         from './items/TotalMarketCapItem';
import TVChartItem                from './items/TVChartItem';
import TVMarketOverviewItem       from './items/TVMarketOverviewItem';
import TwitterItem                from './items/TwitterItem';
import El                         from './El';
import FontAwesome                from 'react-fontawesome';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flex: '1',
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
  lockedElement: {
    opacity: '0.5',
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
    height: '19px',
    overflowY: 'hidden',
    ':hover': {
      cursor: 'move',
    },
  },
  lockedGrabBar: {
    cursor: 'default',
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
    overflow: 'hidden',
  },
});

class DashboardItem extends Component
{
  shouldComponentUpdate(nextProps, nextState)
  {
    return !isEqual(this.props.dashboardAction, nextProps.dashboardAction) ||
           !isEqual(this.props.dashboardData, nextProps.dashboardData) ||
           !isEqual(this.props.dashboardItem, nextProps.dashboardItem) ||
           !isEqual(this.props.dashboardState, nextProps.dashboardState) ||
           !isEqual(this.props.nightMode, nextProps.nightMode) ||
           !isEqual(this.props.user, nextProps.user);
  }

  renderItem(dashboardItem)
  {
    const {
      dashboardAction,
      dashboardData,
      dashboardState,
      nightMode,
      user,

      changeDashboardItemState,
    } = this.props;

    const identifier = dashboardItem.identifier;
    const [identifierKey, identifierValue] = parseIdentifier(identifier);

    switch (identifierKey)
    {
      case CC_CHART:
        return (
          <CCChartItem
            dashboardData={dashboardData}
            nightMode={nightMode}
            value={identifierValue}
          />
        );
      case PERCENT_DOMINANCE_ITEM:
        return (
          <PercentDominanceItem
            changeDashboardItemState={changeDashboardItemState}
            dashboardData={dashboardData}
            dashboardState={dashboardState}
            identifier={identifier}
            nightMode={nightMode}
          />
        );
      case PORTFOLIO_ITEM:
        return (
          <PortfolioItem
            dashboardData={dashboardData}
            nightMode={nightMode}
            user={user}
          />
        );
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
      case TWITTER_ITEM:
        return (
          <TwitterItem
            dashboardAction={dashboardAction}
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
      nightMode,

      changeModalState,
      changeSidebarMode,
      removeFromLayout,
      updateLayoutItem,
    } = this.props;

    const {
      id,
      identifier,
    } = dashboardItem;
    const staticActive = dashboardItem.static;

    const identifierKey = parseIdentiferKey(identifier);
    const title = convertIdentifierToTitle(identifier);

    const onClickEdit = (event) => changeSidebarMode('edit', id);
    const onClickLock = (event) => updateLayoutItem(id, !staticActive);
    const onClickOpen = (event) => changeModalState(identifier);
    const onClickRemove = (event) => removeFromLayout(id);

    return (
      <div
        className={css(styles.container)}
        key={id}
      >
        <div className={css(styles.grabBar, nightMode && styles.nightBar, staticActive && styles.lockedGrabBar)}>
          <div className={css(styles.section, styles.leftSection, staticActive && styles.lockedGrabBar)}>
            <El
              style={styles.widgetTitle}
              nightMode={nightMode}
              type={'h5'}
            >
              {title}
            </El>
          </div>
          <div className={css(styles.rightAlignSmall, staticActive && styles.lockedGrabBar)}>
            {
              identifierKey === TV_CANDLE_CHART && (
                <button
                  className={css(styles.closeButton, nightMode && styles.darkCloseButton)}
                  onClick={onClickOpen}
                  title="Open this widget in full screen."
                >
                  <FontAwesome name='arrows-alt' style={{'fontSize':'13px'}}/>
                </button>
              )
            }
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
        </div>
      </div>
    );
  }
}

export default DashboardItem;
