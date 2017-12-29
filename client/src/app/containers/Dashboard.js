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

          postCounts(timeRange: "${extras.plotRange}") {
            count
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
  // else if (identifier.indexOf('TOKEN-PRICE') === 0)
  // {
  //   return `
  //     ${identifier.replace(/-/g, '')}: tokenById(id: "${id}") {
  //       id

  //       markets {
  //         name
  //         lastPrice

  //         marketTickers {
  //           id
  //           value
  //           timestamp
  //         }
  //       }
  //     }
  //   `;
  // }
};

function queryBuilder(dashboardItems, dashboardStates)
{
  const queries = dashboardItems.map(
    (dashboardItem) => f(dashboardItem.identifier, dashboardStates[dashboardItem.identifier])
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
  class Wrapped extends PureComponent {

    constructor(props) {
      super(props);
      this.wrapped = null;
    }

    componentWillReceiveProps(nextProps)
    {
      if (this.wrapped === null ||
          this.props.selectedTab !== nextProps.selectedTab ||
          this.props.dashboardPages[this.props.selectedTab].length !== nextProps.dashboardPages[nextProps.selectedTab].length ||
          !isEqual(this.props.dashboardPagesStates, nextProps.dashboardPagesStates))
      {
        const {
          dashboardPages,
          dashboardPagesStates,
          selectedTab,
        } = nextProps;

        const dashboardItems = dashboardPages[selectedTab];
        const dashboardStates = dashboardPagesStates[selectedTab];

        if (dashboardItems)
        {
          const { query, config } = queryBuilder(dashboardItems, dashboardStates);
          this.wrapped = graphql(query, config)(ComponentToWrap);
        }
      }
    }

    componentWillUnmount()
    {
      // TODO: is this necessary?
      this.wrapped = null;
    }

    addToLayout(identifier)
    {
      const {
        createDashboardItem,
        createDashboardItemLocal,
        dashboardPages,
        data,
        selectedTab,
      } = this.props;

      const dashboardItems = dashboardPages[selectedTab];
      const arr = computeDashboardFreeValues(dashboardItems);

      if (data.user)
      {
        // createDashboardItem(
        //   identifier,
        //   3,
        //   3,
        //   0,
        //   arr[0],
        // );
      }
      else
      {
        createDashboardItemLocal({
          id: arr[1],
          identifier: identifier,
          w: 3,
          h: 3,
          x: 0,
          y: arr[0],
        });
      }
    }

    removeFromLayout(id)
    {
      const {
        data,
        destroyDashboardItem,
        destroyDashboardItemLocal,
      } = this.props;

      if (data.user)
      {
        // destroyDashboardItem(id);
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

      const dashboardItems = dashboardPages[selectedTab];

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
          // updateDashboardItems(Object.values(newDashboardItemsMap));
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

    render() {
      const {
        changeDashboardItemPlotRange,
        changeDashboardPageState,
        changeKeySelectValue,
        changeScrollActive,
        changeSelectedTab,
        changeValueSelectValue,
        dashboardAction,
        dashboardData,
        dashboardPages,
        dashboardPagesStates,
        data,
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

      const Wrapped = this.wrapped;

      return (
        <div className={css(styles.container)}>
          <Dashboard
            addToLayout={(identifier) => this.addToLayout(identifier)}
            changeDashboardItemPlotRange={changeDashboardItemPlotRange}
            changeDashboardPageState={changeDashboardPageState}
            changeKeySelectValue={changeKeySelectValue}
            changeScrollActive={changeScrollActive}
            changeSelectedTab={changeSelectedTab}
            changeValueSelectValue={changeValueSelectValue}
            dashboardAction={dashboardAction}
            dashboardData={dashboardData}
            dashboardPages={dashboardPages}
            dashboardPagesStates={dashboardPagesStates}
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
          <div className={css(styles.hidden)}>
            {this.wrapped && <Wrapped />}
          </div>
        </div>
      );
    }
  }

  return Wrapped;
}

export default wrapDynamicGraphQL(WrappedComponent);
