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

const dashboardItemsQuery = gql`
 query dashboardItemsQuery {
    dashboardItems {
      id
      identifier
      w
      h
      x
      y
    }
  }
`;

const updateDashboardItemsMutation = gql`
  mutation updateDashboardItemsMutation($layout: String!) {
    updateDashboardItems(layout: $layout) {
      dashboardItems {
        id
        identifier
      }
    }
  }
`;
const updateDashboardItemsMutationOptions = {
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

const destroyDashboardItemMutation = gql`
  mutation destroyDashboardItemMutation($id: ID!) {
    destroyDashboardItem(id: $id) {
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
const destroyDashboardItemMutationOptions = {
  props: ({ mutate, ownProps }) => ({
    destroyDashboardItem(id) {

      return mutate({
        variables: { id },
        updateQueries: {
          dashboardItemsQuery: (prev, { mutationResult }) => ({
            dashboardItems: mutationResult.data.destroyDashboardItem.dashboardItems,
          }),
        }
      })
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
  graphql(dashboardItemsQuery),
  graphql(updateDashboardItemsMutation, updateDashboardItemsMutationOptions),
  graphql(destroyDashboardItemMutation, destroyDashboardItemMutationOptions),
  connect(mapStateToProps, mapDispatchToProps)
)(Dashboard);
