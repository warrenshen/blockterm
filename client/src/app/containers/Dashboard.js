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
  SUBREDDIT_COMMENT_COUNTS,
  SUBREDDIT_POST_COUNTS,
  TOTAL_MARKET_CAP,
  TV_CANDLE_CHART,
  TV_MARKET_OVERVIEW,
  computeDashboardFreeValues,
  parseIdentifer,
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
          earliestMarketTickerDate

          marketTickers(timeRange: "${extras.plotRange}") {
            value
            timestamp
          }
        }
      `;
    case TV_CANDLE_CHART:
    case TV_MARKET_OVERVIEW:
      return null;
    default:
      if (process.env.NODE_ENV == 'dev')
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
  const queriesWithPlaceholder = queries.concat([
    'placeholder'
  ]);
  const query = `query DynamicDashboardQuery {
    ${queriesWithPlaceholder.join('')}
  }`;

  return {
    query: gql`${query}`,
    config: {},
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
      this.wrapped = graphql(query, config)(ComponentToWrap);
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
      createDashboardItem,
      createDashboardItemLocal,
      dashboardPages,
      data,
      selectedTab,
    } = this.props;

    const dashboardItems = dashboardPages[selectedTab].dashboardItems;
    const arr = computeDashboardFreeValues(dashboardItems);

    const w = 3;
    const h = 4;
    const x = 0;
    const y = arr[0];

    if (data.user)
    {
      createDashboardItem(
        dashboardPages[selectedTab].id,
        identifier,
        w,
        h,
        x,
        y,
      );
    }
    else
    {
      createDashboardItemLocal({
        id: arr[1],
        identifier: identifier,
        w: w,
        h: h,
        x: x,
        y: y,
      });
    }
  }

  removeFromLayout(id)
  {
    const {
      dashboardPages,
      data,
      destroyDashboardItem,
      destroyDashboardItemLocal,
      selectedTab,
    } = this.props;

    if (data.user)
    {
      destroyDashboardItem(
        dashboardPages[selectedTab].id,
        id,
      );
    }
    else
    {
      destroyDashboardItemLocal(id);
    }
  }

  saveLayout(layout)
  {
    const {
      data,
      dashboardPages,
      saveDashboardItemsLocal,
      selectedTab,
      updateDashboardItems,
    } = this.props;

    const dashboardItems = dashboardPages[selectedTab].dashboardItems;

    var layoutChanged = false;
    const newDashboardItemsMap = {};
    layout.forEach((dashboardItem) => {
      newDashboardItemsMap[dashboardItem.i] = {
        id: dashboardItem.i,
        w: dashboardItem.w,
        h: dashboardItem.h,
        x: dashboardItem.x,
        y: dashboardItem.y,
      };
    });

    dashboardItems.forEach((dashboardItem) => {
      const matchItem = newDashboardItemsMap[dashboardItem.id];
      layoutChanged = layoutChanged || dashboardItem.w != matchItem.w;
      layoutChanged = layoutChanged || dashboardItem.h != matchItem.h;
      layoutChanged = layoutChanged || dashboardItem.x != matchItem.x;
      layoutChanged = layoutChanged || dashboardItem.y != matchItem.y;
    });

    if (layoutChanged)
    {
      if (data.user)
      {
        updateDashboardItems(
          dashboardPages[selectedTab].id,
          Object.values(newDashboardItemsMap),
        );
      }
      else
      {
        dashboardItems.map((item) => {
          newDashboardItemsMap[item.id].identifier = item.identifier;
        });
        saveDashboardItemsLocal(Object.values(newDashboardItemsMap));
      }
    }
  }

  render()
  {
    const {
      changeDashboardItemState,
      changeKeySelectValue,
      changeScrollActive,
      changeSelectedTab,
      changeValueSelectValue,
      dashboardAction,
      dashboardData,
      dashboardItemStates,
      dashboardPages,
      keySelectValue,
      logDashboardActionStart,
      logDashboardActionStop,
      nightMode,
      toggleSidebar,
      scrollActive,
      selectedTab,
      sidebarActive,
      valueSelectValue,
    } = this.props;

    return (
      <div className={css(styles.container)}>
        <DataProvider
          {...this.props}
        />
        <Dashboard
          addToLayout={(identifier) => this.addToLayout(identifier)}
          changeDashboardItemState={changeDashboardItemState}
          changeKeySelectValue={changeKeySelectValue}
          changeScrollActive={changeScrollActive}
          changeSelectedTab={changeSelectedTab}
          changeValueSelectValue={changeValueSelectValue}
          dashboardAction={dashboardAction}
          dashboardData={dashboardData}
          dashboardItemStates={dashboardItemStates}
          dashboardPages={dashboardPages}
          keySelectValue={keySelectValue}
          nightMode={nightMode}
          toggleSidebar={toggleSidebar}
          logDashboardActionStart={logDashboardActionStart}
          logDashboardActionStop={logDashboardActionStop}
          removeFromLayout={(id) => this.removeFromLayout(id)}
          saveLayout={(layout) => this.saveLayout(layout)}
          selectedTab={selectedTab}
          scrollActive={scrollActive}
          sidebarActive={sidebarActive}
          valueSelectValue={valueSelectValue}
        />
      </div>
    );
  }
}

export default Container;
