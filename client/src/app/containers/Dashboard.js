// @flow weak

import React, { PureComponent }   from 'react';
import { StyleSheet, css }        from 'aphrodite';
import { connect }                from 'react-redux';
import { bindActionCreators }     from 'redux';
import gql                        from 'graphql-tag';
import {
  Dashboard,
  Wrapped as WrappedComponent,
}                                 from '../views';
import { graphql }                from 'react-apollo';
import { isEqual }                from 'underscore';

import {
  PERCENT_DOMINANCE_ITEM,
  PORTFOLIO_ITEM,
  SUBREDDIT_COMMENT_COUNTS,
  SUBREDDIT_POST_COUNTS,
  TOTAL_MARKET_CAP,
  TV_CANDLE_CHART,
  TV_MARKET_OVERVIEW,
  TWITTER_ITEM,
  computeDashboardFreeValues,
  parseIdentifer,
  parseIdentiferKey,
}                                 from '../constants/items';
import {
  DASHBOARD_COOKIE,
  getItem,
  setItem,
}                                 from '../services/cookie';

function f(identifier, extras)
{
  const arr = parseIdentifer(identifier);
  const identifierKey = arr[0];
  const identifierValue = arr[1];

  switch (identifierKey)
  {
    case PERCENT_DOMINANCE_ITEM:
      return `
        ${identifier}: marketsByName(names: "PERCENT_BITCOIN,PERCENT_ETHEREUM,PERCENT_ALTCOINS") {
          id
          name
          lastPrice
          earliestMarketTickerDate

          marketTickers(timeRange: "${extras.plotRange}") {
            value
            timestamp
          }
        }
      `;
    case PORTFOLIO_ITEM:
      return `
        ${identifier}: user {
          tokenUsers {
            id
            index
            amount

            token {
              id
              shortName
              imageUrl
              priceUSD
              priceBTC
              percentChange24h
            }
          }
        }
      `;
    case SUBREDDIT_COMMENT_COUNTS:
      return `
        ${identifier}: subredditByName(name: "${identifierValue}") {
          id
          displayName
          earliestCommentCountDate

          commentCounts(timeRange: "${extras.plotRange}") {
            count
            timestamp
          }
        }
      `;
    case SUBREDDIT_POST_COUNTS:
      return `
        ${identifier}: subredditByName(name: "${identifierValue}") {
          id
          displayName
          earliestPostCountDate

          postCounts(timeRange: "${extras.plotRange}") {
            count
            timestamp
          }
        }
      `;
    case TOTAL_MARKET_CAP:
      return `
        ${identifier}: marketByName(name: "TOTAL") {
          id
          name
          lastPrice
          earliestMarketTickerDate

          marketTickers(timeRange: "${extras.plotRange}") {
            value
            timestamp
          }
        }
      `;
    case TV_CANDLE_CHART:
    case TV_MARKET_OVERVIEW:
    case TWITTER_ITEM:
      return null;
    default:
      if (process.env.NODE_ENV === 'dev')
      {
        console.log('MISSING QUERY');
      }
      return null;
  }
};

function queryBuilder(dashboardItems, dashboardItemStates)
{
  const queries = dashboardItems.map(
    (dashboardItem) => f(dashboardItem.identifier, dashboardItemStates[dashboardItem.identifier])
  );
  if (queries.filter((query) => query !== null).length <= 0)
  {
    return {
      query: null,
      config: null,
    };
  }

  const query = `query DynamicDashboardQuery {
    ${queries.join('')}
  }`;

  return {
    query: gql`${query}`,
    config: {
      // options: { pollInterval: 180000 },
    },
  };
}

const styles = StyleSheet.create({
  container: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
  },
  hidden: {
    display: 'none',
  },
});

function wrapDynamicGraphQL(ComponentToWrap)
{
  class DynamicDashboardQueryHOC extends PureComponent {

    constructor(props) {
      super(props);
      this.wrapped = null;
    }

    componentWillMount()
    {
      const {
        dashboardItemStates,
        dashboardPages,
        selectedTab,
      } = this.props;

      if (dashboardPages.length <= 0)
      {
        return;
      }

      const dashboardItems = dashboardPages[selectedTab].dashboardItems;

      if (!dashboardItems || !dashboardItemStates)
      {
        return;
      }

      const { query, config } = queryBuilder(dashboardItems, dashboardItemStates);
      if (query === null)
      {
        this.wrapped = null;
      }
      else
      {
        this.wrapped = graphql(query, config)(ComponentToWrap);
      }
    }

    componentWillReceiveProps(nextProps)
    {
      const props = this.props;
      if (this.wrapped !== null &&
          props.selectedTab === nextProps.selectedTab &&
          isEqual(props.dashboardItemStates, nextProps.dashboardItemStates) &&
          isEqual(props.dashboardPages, nextProps.dashboardPages))
      {
        return;
      }

      const {
        dashboardItemStates,
        dashboardPages,
        selectedTab,
      } = nextProps;

      if (dashboardPages.length <= 0)
      {
        return;
      }

      const dashboardItems = dashboardPages[selectedTab].dashboardItems;

      if (!dashboardItems || !dashboardItemStates)
      {
        return;
      }

      const { query, config } = queryBuilder(dashboardItems, dashboardItemStates);
      if (query === null)
      {
        this.wrapped = null;
      }
      else
      {
        this.wrapped = graphql(query, config)(ComponentToWrap);
      }
    }

    render() {
      const W = this.wrapped;
      return (
        <div className={css(styles.hidden)}>
          {this.wrapped && <W />}
        </div>
      );
    }
  }

  return DynamicDashboardQueryHOC;
}

const DataProvider = wrapDynamicGraphQL(WrappedComponent);

class Container extends PureComponent
{
  addToLayout(identifier)
  {
    const {
      dashboardPages,
      selectedTab,
      user,

      createDashboardItem,
      createDashboardItemLocal,
      createNotificationError,
      createNotificationSuccess,
    } = this.props;

    let w = 3;
    let h = 4;

    if (parseIdentiferKey(identifier) === PORTFOLIO_ITEM ||
        parseIdentiferKey(identifier) === TV_MARKET_OVERVIEW)
    {
      w = 3;
      h = 9;
    }
    else if (parseIdentiferKey(identifier) === TWITTER_ITEM)
    {
      w = 2;
      h = 9;
    }

    const dashboardItems = dashboardPages[selectedTab].dashboardItems;
    const [x, y, newId] = computeDashboardFreeValues(dashboardItems, w, h);

    if (user)
    {
      createDashboardItem(
        dashboardPages[selectedTab].id,
        identifier,
        w,
        h,
        x,
        y,
      ).then(
        () => createNotificationSuccess({ position: 'bc', title: 'Success!' }),
        () => createNotificationError({ position: 'bc', title: 'Failure.' }),
      );;
    }
    else
    {
      createDashboardItemLocal({
        id: newId,
        identifier: identifier,
        w: w,
        h: h,
        x: x,
        y: y,
        static: false,
      });
    }
  }

  updateLayoutItem(newIdentifier)
  {
    const {
      dashboardPages,
      selectedTab,
      sidebarDashboardItemId,
      sidebarMode,
      user,

      createNotificationError,
      createNotificationSuccess,
      updateDashboardItem,
      updateDashboardItemLocal,
    } = this.props;

    const dashboardPage = dashboardPages[selectedTab];

    if (user)
    {
      updateDashboardItem(
        dashboardPage.id,
        sidebarDashboardItemId,
        newIdentifier,
        null,
      )
      .then(
        () => createNotificationSuccess({ position: 'bc', title: 'Success!' }),
        () => createNotificationError({ position: 'bc', title: 'Failure.' }),
      );
    }
    else
    {
      updateDashboardItemLocal(
        sidebarDashboardItemId,
        newIdentifier,
        null,
      );
    }
  }

  render()
  {
    const {
      keySelectValue,
      modalDashboardItemId,
      nightMode,
      scrollActive,
      sidebarDashboardItemId,
      sidebarMode,
      user,
      valueSelectValue,

      changeKeySelectValue,
      changeModalState,
      changeScrollActive,
      changeSidebarMode,
      changeValueSelectValue,
    } = this.props;

    return (
      <div className={css(styles.container)}>
        <DataProvider
          {...this.props}
        />
        <Dashboard
          keySelectValue={keySelectValue}
          modalDashboardItemId={modalDashboardItemId}
          nightMode={nightMode}
          scrollActive={scrollActive}
          sidebarMode={sidebarMode}
          user={user}
          valueSelectValue={valueSelectValue}

          addToLayout={(identifier) => this.addToLayout(identifier)}
          changeKeySelectValue={changeKeySelectValue}
          changeModalState={changeModalState}
          changeScrollActive={changeScrollActive}
          changeSidebarMode={changeSidebarMode}
          changeValueSelectValue={changeValueSelectValue}
          updateLayoutItem={(newIdentifier) => this.updateLayoutItem(newIdentifier)}
        />
      </div>
    );
  }
}

export default Container;
