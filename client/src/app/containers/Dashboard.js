// @flow weak

import React, { PureComponent }   from 'react';
import { connect }                from 'react-redux';
import { bindActionCreators }     from 'redux';
import gql                        from 'graphql-tag';
import { Dashboard }              from '../views';
import { graphql }                from 'react-apollo';

import {
  SUBREDDIT_COMMENT_COUNTS,
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

  switch (identifierKey)
  {
    case SUBREDDIT_COMMENT_COUNTS:
      return `
        ${identifier}: subredditByName(name: "${identifierValue}") {
          id
          displayName

          commentCounts {
            id
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

          postCounts {
            id
            count
            timestamp
          }
        }
      `;
    default:
      console.log('Missing query');
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

function queryBuilder(dashboardItems)
{
  const queries = dashboardItems.map(
    (dashboardItem) => f(dashboardItem.identifier)
  );
  const queriesWithPlaceholder = queries.concat([
    'placeholder'
  ]);
  const query = `query {
    ${queriesWithPlaceholder.join('')}
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
      if (this.wrapped === null ||
          (this.props.dashboardItems !== nextProps.dashboardItems &&
          this.props.dashboardItems.length !== nextProps.dashboardItems.length))
      {
        const {
          dashboardItems,
        } = nextProps;
        const { query, config } = queryBuilder(dashboardItems);
        this.wrapped = graphql(query, config)(ComponentToWrap);
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
        destroyDashboardItemLocal,
        dashboardItems,
        data,
      } = this.props;

      if (data.user)
      {
        destroyDashboardItem(id);
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
        dashboardItems,
        saveDashboardItemsLocal,
        updateDashboardItems,
      } = this.props;

      var layoutChanged = false;
      const newDashboardItemsMap = {};
      layout.forEach((dashboardItem) => {
        if (dashboardItem.i !== 'ADD_DASHBOARD_ITEM_ELEMENT')
        {
          newDashboardItemsMap[dashboardItem.i] = {
            id: dashboardItem.i,
            w: dashboardItem.w,
            h: dashboardItem.h,
            x: dashboardItem.x,
            y: dashboardItem.y,
          };
        }
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
          updateDashboardItems(Object.values(newDashboardItemsMap));
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
