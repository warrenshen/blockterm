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
  const subredditName = identifier.substring(16);
  return `
    ${identifier.replace(/-/g, '')}: subredditByName(name: "${subredditName}") {
      id
      displayName
      postCounts {
        id
        count
        timestamp
      }
    }
  `;
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
    }

    componentWillReceiveProps(nextProps)
    {
      if (nextProps.data.user)
      {
        const { query, config } = queryBuilder(nextProps);
        this.wrapped = graphql(query, config)(ComponentToWrap);
      }
    }

    render() {
      if (this.wrapped === null)
      {
        return null;
      }
      else
      {
        const Wrapped = this.wrapped;
        return <Wrapped data2={this.props.data} />;
      }
    }
  }

  return Wrapped;
}

export default wrapDynamicGraphQL(Dashboard);
