// @flow weak

import React, {
  Component,
}                                 from 'react';
import PropTypes                  from 'prop-types';
import { StyleSheet, css }        from 'aphrodite';
import { isEqual }                from 'underscore';
import FontAwesome                from 'react-fontawesome';
import * as STYLES                from '../constants/styles';
import {
  ALERTS_ITEM,
  CC_CHART,
  GT_CHART_ITEM,
  PERCENT_DOMINANCE_ITEM,
  PORTFOLIO_ITEM,
  PORTFOLIO_HISTORY_ITEM,
  SUBREDDIT_COMMENT_COUNTS,
  SUBREDDIT_POST_COUNTS,
  TOTAL_MARKET_CAP,
  TV_CANDLE_CHART,
  TV_MARKET_OVERVIEW,
  TWITTER_ITEM,
  NEWS_ITEM,
  convertIdentifierToTitle,
  parseIdentifier,
  parseIdentiferKey,
}                                 from '../constants/items';
import AlertsItem                 from './items/AlertsItem';
import CCChartItem                from './items/CCChartItem';
import GTChartItem                from './items/GTChartItem';
import NewsItem                from './items/NewsItem';
import PercentDominanceItem       from './items/PercentDominanceItem';
import PortfolioItem              from './items/PortfolioItem';
import PortfolioHistoryItem       from './items/PortfolioHistoryItem';
import SubredditCommentCountsItem from './items/SubredditCommentCountsItem';
import SubredditPostCountsItem    from './items/SubredditPostCountsItem';
import TotalMarketCapItem         from './items/TotalMarketCapItem';
import TVChartItem                from './items/TVChartItem';
import TVMarketOverviewItem       from './items/TVMarketOverviewItem';
import TwitterItem                from './items/TwitterItem';
import El                         from './El';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flex: '1',
  },
  actionButton: {
    color: '#000',
    height: '100%',
    borderLeft: `1px solid ${STYLES.BORDERLIGHT}`,
    padding: '1px 4px',
    lineHeight: '14px',
    width:'20px',
  },
  darkActionButton: {
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
    fontSize: '12px',
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
    return !isEqual(this.props.alerts, nextProps.alerts) ||
           !isEqual(this.props.currency, nextProps.currency) ||
           !isEqual(this.props.dashboardAction, nextProps.dashboardAction) ||
           !isEqual(this.props.dashboardData, nextProps.dashboardData) ||
           !isEqual(this.props.dashboardItem, nextProps.dashboardItem) ||
           !isEqual(this.props.dashboardState, nextProps.dashboardState) ||
           !isEqual(this.props.nightMode, nextProps.nightMode) ||
           !isEqual(this.props.user, nextProps.user);
  }

  renderItem(dashboardItem)
  {
    const {
      alerts,
      currency,
      dashboardAction,
      dashboardData,
      dashboardState,
      nightMode,
      user,

      changeDashboardItemState,
      changeModalState,
    } = this.props;

    const identifier = dashboardItem.identifier;
    const [identifierKey, identifierValue] = parseIdentifier(identifier);

    switch (identifierKey)
    {
      case ALERTS_ITEM:
        return (
          <AlertsItem
            alerts={alerts}
            nightMode={nightMode}
          />
        );
      case CC_CHART:
        return (
          <CCChartItem
            dashboardData={dashboardData}
            nightMode={nightMode}
            value={identifierValue}
          />
        );
      case GT_CHART_ITEM:
        return (
          <GTChartItem
            dashboardAction={dashboardAction}
            dashboardData={dashboardData}
            dashboardState={dashboardState}
            identifier={identifier}
            nightMode={nightMode}
            value={identifierValue}

            changeDashboardItemState={changeDashboardItemState}
          />
        );
      case NEWS_ITEM:
        return (
          <NewsItem
            dashboardAction={dashboardAction}
            nightMode={nightMode}
            value={identifierValue}
          />
        );
      case PERCENT_DOMINANCE_ITEM:
        return (
          <PercentDominanceItem
            dashboardData={dashboardData}
            dashboardState={dashboardState}
            identifier={identifier}
            nightMode={nightMode}

            changeDashboardItemState={changeDashboardItemState}
          />
        );
      case PORTFOLIO_ITEM:
        return (
          <PortfolioItem
            currency={currency}
            dashboardData={dashboardData}
            nightMode={nightMode}
            user={user}
            value={identifierValue}
          />
        );
      case PORTFOLIO_HISTORY_ITEM:
        return (
          <PortfolioHistoryItem
            dashboardData={dashboardData}
            dashboardState={dashboardState}
            identifier={identifier}
            nightMode={nightMode}
            user={user}

            changeDashboardItemState={changeDashboardItemState}
          />
        );
      case SUBREDDIT_COMMENT_COUNTS:
        return (
          <SubredditCommentCountsItem
            dashboardData={dashboardData}
            dashboardState={dashboardState}
            identifier={identifier}
            specific={identifierValue}
            nightMode={nightMode}

            changeDashboardItemState={changeDashboardItemState}
          />
        );
      case SUBREDDIT_POST_COUNTS:
        return (
          <SubredditPostCountsItem
            dashboardData={dashboardData}
            dashboardState={dashboardState}
            identifier={identifier}
            specific={identifierValue}
            nightMode={nightMode}

            changeDashboardItemState={changeDashboardItemState}
          />
        );
      case TOTAL_MARKET_CAP:
        return (
          <TotalMarketCapItem
            currency={currency}
            dashboardData={dashboardData}
            dashboardState={dashboardState}
            identifier={identifier}
            nightMode={nightMode}

            changeDashboardItemState={changeDashboardItemState}
          />
        );
      case TV_CANDLE_CHART:
        return (
          <TVChartItem
            alerts={alerts}
            dashboardAction={dashboardAction}
            nightMode={nightMode}
            identifier={identifier}
            value={identifierValue}

            changeModalState={changeModalState}
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
                  className={css(styles.actionButton, nightMode && styles.darkActionButton)}
                  onClick={onClickOpen}
                  title="Open this widget in full screen"
                >
                  <FontAwesome name='search-plus' style={{'fontSize':'13px'}}/>
                </button>
              )
            }
            {
              identifierKey === TV_CANDLE_CHART && (
                <button
                  className={css(styles.actionButton, nightMode && styles.darkActionButton)}
                  onClick={onClickOpen}
                  title="Open the alerts management panel for this chart"
                >
                  <FontAwesome name='bullhorn' style={{'fontSize':'13px'}}/>
                </button>
              )
            }
            <button
              className={css(styles.actionButton, nightMode && styles.darkActionButton, staticActive && styles.lockedElement)}
              onClick={onClickEdit}
              title="Swap this widget out for another"
            >
              <FontAwesome name='pencil' style={{'fontSize':'13px'}}/>
            </button>
            <button
              title="Drag and drop to move widget around"
              className={css(styles.actionButton, nightMode && styles.darkActionButton, staticActive && styles.lockedElement)}
              >
              <FontAwesome name='arrows' style={{'fontSize':'13px'}}/>
            </button>
            <button
              className={css(styles.actionButton, nightMode && styles.darkActionButton)}
              onClick={onClickLock}
              title="Lock and unlock element position and sizing"
            >
              <FontAwesome name={staticActive ? 'lock' : 'unlock'} style={{'fontSize':'13px'}}/>
            </button>
            <button
              title="Remove this widget"
              className={css(styles.actionButton, nightMode && styles.darkActionButton)}
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
