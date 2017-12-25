// @flow weak

import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import gql                    from 'graphql-tag';
import { Dashboard }          from '../views';
import { graphql }            from 'react-apollo';

import {
  DEFAULT_ITEM_OBJECTS,
  SUBREDDIT_POST_COUNTS,
  parseIdentifer,
}                             from '../constants/items';
import {
  DASHBOARD_COOKIE,
  getItem,
  setItem,
}                             from '../services/cookie';

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
  class Wrapped extends Component {

    constructor(props) {
      super(props);
      this.wrapped = null;
      this.registered = false;
    }

    componentWillReceiveProps(nextProps)
    {
      // console.log(this.props);
      // console.log(nextProps);
      const {
        registerDashboardItem,
      } = this.props;

      var dashboardItems;

      if (nextProps.data.user)
      {
        dashboardItems = nextProps.data.user.dashboardItems;
      }
      else
      {
        const localDashboard = getItem(DASHBOARD_COOKIE);
        if (localDashboard)
        {
          dashboardItems = localDashboard;
        }
        else
        {
          setItem(DASHBOARD_COOKIE, DEFAULT_ITEM_OBJECTS);
          dashboardItems = DEFAULT_ITEM_OBJECTS;
        }
      }

      if (!this.registered)
      {
        this.registered = true;
        dashboardItems.map(
          (dashboardItem) => registerDashboardItem(dashboardItem)
        );

        const { query, config } = queryBuilder(dashboardItems);
        this.wrapped = graphql(query, config)(ComponentToWrap);
        this.dashboardItems = dashboardItems;
      }
    }

    saveLayout(layout)
    {
      const {
        data,
        updateDashboardItems,
      } = this.props;

      var layoutChanged = false;
      const newLayoutMap = {};
      layout.map((item) => {
        newLayoutMap[item.i] = {
          id: item.i,
          w: item.w,
          h: item.h,
          x: item.x,
          y: item.y,
        };
      });
      this.dashboardItems.map((item) => {
        const matchItem = newLayoutMap[item.id];
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
          this.dashboardItems.map((item) => {
            newLayoutMap[item.id].identifier = item.identifier;
          });

          setItem(DASHBOARD_COOKIE, Object.values(newLayoutMap));
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
          data,
          createDashboardItem,
          destroyDashboardItem,
          keySelectValue,
          nightMode,
          sidebarActive,
          valueSelectValue,
        } = this.props;

        const Wrapped = this.wrapped;

        return (
          <Wrapped
            changeDashboardItemPlotRange={changeDashboardItemPlotRange}
            changeKeySelectValue={changeKeySelectValue}
            changeValueSelectValue={changeValueSelectValue}
            createDashboardItem={createDashboardItem}
            dashboard={dashboard}
            dashboardItems={this.dashboardItems}
            destroyDashboardItem={destroyDashboardItem}
            keySelectValue={keySelectValue}
            nightMode={nightMode}
            sidebarActive={sidebarActive}
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
