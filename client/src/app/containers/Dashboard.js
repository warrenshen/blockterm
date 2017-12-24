// @flow weak

import React, { Component } from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dashboard }          from '../views';
import gql                    from 'graphql-tag';
import { parse }              from 'graphql';
import { graphql }            from 'react-apollo';

function f(identifier)
{
  const id = identifier.substring(identifier.lastIndexOf('-') + 1);

  if (identifier.indexOf('SUBREDDIT-POSTS') === 0)
  {
    return `
      ${identifier.replace(/-/g, '')}: subredditById(id: "${id}") {
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
  else if (identifier.indexOf('TOKEN-PRICE') === 0)
  {
    return `
      ${identifier.replace(/-/g, '')}: tokenById(id: "${id}") {
        id

        markets {
          name
          lastPrice

          marketTickers {
            id
            value
            timestamp
          }
        }
      }
    `;
  }
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
      console.log(this.props);
      console.log(nextProps);
      const {
        registerDashboardItem,
      } = this.props;

      if (nextProps.data.user && nextProps.data.user.dashboardItems)
      {
        if (!this.registered)
        {
          const dashboardItems = nextProps.data.user.dashboardItems;
          this.registered = true;
          dashboardItems.map(
            (dashboardItem) => registerDashboardItem(dashboardItem)
          );

          const { query, config } = queryBuilder(dashboardItems);
          this.wrapped = graphql(query, config)(ComponentToWrap);
          this.dashboardItems = dashboardItems;
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
          dashboard,
          data,
          destroyDashboardItem,
          nightMode,
          updateDashboardItems,
        } = this.props;

        const Wrapped = this.wrapped;

        return (
          <Wrapped
            changeDashboardItemPlotRange={changeDashboardItemPlotRange}
            dashboard={dashboard}
            dashboardItems={this.dashboardItems}
            destroyDashboardItem={destroyDashboardItem}
            nightMode={nightMode}
            updateDashboardItems={updateDashboardItems}
          />
        );
      }
    }
  }

  return Wrapped;
}

export default wrapDynamicGraphQL(Dashboard);
