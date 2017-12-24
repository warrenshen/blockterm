// @flow weak

import { connect }             from 'react-redux';
import { bindActionCreators }  from 'redux';
import { compose, graphql }    from 'react-apollo';
import {
  DestroyDashboardItemMutation,
  UpdateDashboardItemsMutation,
}                              from '../queries';
import { DashboardItemsQuery } from '../queries';
import * as dashboardActions   from '../redux/modules/dashboard';
import Dashboard               from './Dashboard';


/* -----------------------------------------
  GraphQL - Apollo client
 ------------------------------------------*/

const updateDashboardItemsMutationOptions = {
  props: ({ mutate, ownProps }) => ({
    updateDashboardItems(layout) {

      return mutate({
        updateQueries: {
          DashboardItemsQuery: (prev, { mutationResult }) => ({
            user: mutationResult.data.updateDashboardItems,
          }),
        },
        variables: { layout },
      })
      .then(
        (response) => {
          return Promise.resolve();
        }
      )
      .catch(
        (error) => {
          return Promise.reject();
        }
      );
    }
  }),
};

const destroyDashboardItemMutationOptions = {
  props: ({ mutate, ownProps }) => ({
    destroyDashboardItem(id) {

      return mutate({
        variables: { id },
        updateQueries: {
          DashboardItemsQuery: (prev, { mutationResult }) => ({
            user: mutationResult.data.updateDashboardItems,
          }),
        },
      })
      .then(
        (response) => {
          return Promise.resolve();
        }
      )
      .catch(
        (error) => {
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
  graphql(DashboardItemsQuery),
  graphql(UpdateDashboardItemsMutation, updateDashboardItemsMutationOptions),
  graphql(DestroyDashboardItemMutation, destroyDashboardItemMutationOptions),
  connect(mapStateToProps, mapDispatchToProps)
)(Dashboard);
