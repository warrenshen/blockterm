// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import gql                    from 'graphql-tag';
import { compose, graphql }   from 'react-apollo';
import * as dashboardActions      from '../redux/modules/dashboard';
import Dashboard              from './Dashboard';


/* -----------------------------------------
  GraphQL - Apollo client
 ------------------------------------------*/

const query = gql`
 query {
    user {
      dashboardItems {
        id
        identifier
        w
        h
        x
        y
      }
    }
  }
`;

const mutation = gql`
  mutation ($layout: String!) {
    updateDashboardItems(layout: $layout) {
      dashboardItems {
        id
      }
    }
  }
`;
const mutationOptions = {
  props: ({ mutate, ownProps }) => ({
    updateDashboardItems(layout) {

      return mutate({ variables: { layout } })
        .then(
          (response) => {
            return Promise.resolve();
          }
        )
        .catch(
          (error)=> {
            return Promise.reject();
          }
        );
    }
  }),
};

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
    nightMode: state.globals.nightMode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      changeDashboardItemPlotRange: dashboardActions.changeDashboardItemPlotRange,
      registerDashboardItem: dashboardActions.registerDashboardItem,
    },
    dispatch
  );
};

export default compose(
  graphql(query),
  graphql(mutation, mutationOptions),
  connect(mapStateToProps, mapDispatchToProps)
)(Dashboard);
