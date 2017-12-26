// @flow weak

import React, { PureComponent }   from 'react';
import { connect }                from 'react-redux';
import { bindActionCreators }     from 'redux';
import gql                        from 'graphql-tag';
import { Dashboard }              from '../views';
import { graphql }                from 'react-apollo';

import {
  SUBREDDIT_POST_COUNTS,
  computeDashboardFreeValues,
  parseIdentifer,
}                                 from '../constants/items';
import {
  DASHBOARD_COOKIE,
  getItem,
  setItem,
}                                 from '../services/cookie';

function f(identifier)
{
  const arr = parseIdentifer(identifier);
  const identifierKey = arr[0];
  const identifierValue = arr[1];

  if (identifierKey === SUBREDDIT_POST_COUNTS)
  {
    return `
      ${identifier}: subredditByName(name: "${identifierValue}") {
        id
        displayName

        postCounts {
          id
          count
          timestamp
        }
      }
    `;
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
  else
  {
    console.log('Missing query!!!!!');
  }
};

function queryBuilder(dashboardItems)
{
  const queries = dashboardItems.map(
    (dashboardItem) => f(dashboardItem.identifier)
  );

  const query = `query {
    ${queries.join('')}
  }`;

  return {
    query: gql`${query}`,
    config: {},
  };
}

function wrapDynamicGraphQL(ComponentToWrap)
{
  class Wrapped extends PureComponent {

    constructor(props) {
      super(props);
      this.wrapped = null;
    }

    componentWillReceiveProps(nextProps)
    {
      if (this.props.dashboardItems !== nextProps.dashboardItems)
      {
        const {
          dashboardItems,
        } = nextProps;

        const { query, config } = queryBuilder(dashboardItems);
        this.wrapped = graphql(query, config)(ComponentToWrap);
        this.dashboardItems = dashboardItems;
      }
    }

    addToLayout(identifier)
    {
      const {
        createDashboardItem,
        createDashboardItemLocal,
        dashboardItems,
        data,
      } = this.props;

      const arr = computeDashboardFreeValues(dashboardItems);

      if (data.user)
      {
        createDashboardItem(
          identifier,
          3,
          3,
          0,
          arr[0],
        );
      }
      else
      {
        console.log(identifier);
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
        destroyDashboardItem,
        dashboardItems,
        data,
      } = this.props;

      if (data.user)
      {
        destroyDashboardItem(id);
      }
      else
      {
        const newDashboardItems = dashboardItems.filter((item) => item.id != id);
        // TODO
        // setItem(DASHBOARD_COOKIE, Object.values(newLayoutMap));
      }
    }

    saveLayout(layout)
    {
      const {
        data,
        dashboardItems,
        saveDashboardItemsLocal,
        updateDashboardItems,
      } = this.props;

      var layoutChanged = false;
      const newDashboardItemsMap = {};
      layout.forEach((item) => {
        if (item.i !== 'ADD_DASHBOARD_ITEM_ELEMENT')
        {
          newDashboardItemsMap[item.i] = {
            id: item.i,
            w: item.w,
            h: item.h,
            x: item.x,
            y: item.y,
          };
        }
      });
      dashboardItems.forEach((item) => {
        const matchItem = newDashboardItemsMap[item.id];
        layoutChanged = layoutChanged || item.w != matchItem.w;
        layoutChanged = layoutChanged || item.h != matchItem.h;
        layoutChanged = layoutChanged || item.x != matchItem.x;
        layoutChanged = layoutChanged || item.y != matchItem.y;
      });

      if (layoutChanged)
      {
        if (data.user)
        {
          updateDashboardItems(JSON.stringify(layout));
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
      if (this.wrapped === null)
      {
        console.log('wrapped is NULLLLLL');
        return null;
      }
      else
      {
        const {
          changeDashboardItemPlotRange,
          changeKeySelectValue,
          changeValueSelectValue,
          dashboard,
          dashboardItems,
          data,
          keySelectValue,
          nightMode,
          sidebarActive,
          valueSelectValue,
        } = this.props;

        const Wrapped = this.wrapped;

        return (
          <Wrapped
            addToLayout={(identifier) => this.addToLayout(identifier)}
            changeDashboardItemPlotRange={changeDashboardItemPlotRange}
            changeKeySelectValue={changeKeySelectValue}
            changeValueSelectValue={changeValueSelectValue}
            dashboard={dashboard}
            dashboardItems={dashboardItems}
            keySelectValue={keySelectValue}
            nightMode={nightMode}
            sidebarActive={sidebarActive}
            removeFromLayout={(id) => this.removeFromLayout(id)}
            saveLayout={(layout) => this.saveLayout(layout)}
            valueSelectValue={valueSelectValue}
          />
        );
      }
    }
  }

  return Wrapped;
}

export default wrapDynamicGraphQL(Dashboard);
