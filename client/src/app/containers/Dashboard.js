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

function queryBuilder(props)
{
  const queries = props.data.user.dashboardItems.map(
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
      const {
        registerDashboardItem,
      } = this.props;

      if (nextProps.data.user)
      {
        if (!this.registered)
        {
          this.registered = true;
          nextProps.data.user.dashboardItems.map(
            (dashboardItem) => registerDashboardItem(dashboardItem)
          );

          const { query, config } = queryBuilder(nextProps);
          this.wrapped = graphql(query, config)(ComponentToWrap);
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
          nightMode,
          updateDashboardItems,
        } = this.props;

        const { user } = data;
        const Wrapped = this.wrapped;

        return (
          <Wrapped
            changeDashboardItemPlotRange={changeDashboardItemPlotRange}
            dashboard={dashboard}
            nightMode={nightMode}
            updateDashboardItems={updateDashboardItems}
            user={user}
          />
        );
      }
    }
  }

  return Wrapped;
}

export default wrapDynamicGraphQL(Dashboard);
