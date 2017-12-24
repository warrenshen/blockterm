// @flow weak

import { connect }             from 'react-redux';
import { bindActionCreators }  from 'redux';
import { compose, graphql }    from 'react-apollo';
import {
  CreateDashboardItemMutation,
  DestroyDashboardItemMutation,
  UpdateDashboardItemsMutation,
}                              from '../queries';
import { DashboardItemsQuery } from '../queries';
import * as dashboardActions   from '../redux/modules/dashboard';
import Dashboard               from './Dashboard';


/* -----------------------------------------
  GraphQL - Apollo client
 ------------------------------------------*/
const createDashboardItemMutationOptions = {
  props: ({ mutate, ownProps }) => ({
    createDashboardItem(identifier, w, h, x, y) {
      return mutate({
        updateQueries: {
          DashboardItemsQuery: (prev, { mutationResult }) => ({
            user: mutationResult.data.createDashboardItem,
          }),
        },
        variables: {
          identifier,
          w,
          h,
          x,
          y
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

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
    keySelectValue: state.dashboard.keySelectValue,
    nightMode: state.globals.nightMode,
    valueSelectValue: state.dashboard.valueSelectValue,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      changeDashboardItemPlotRange: dashboardActions.changeDashboardItemPlotRange,
      changeKeySelectValue: dashboardActions.changeKeySelectValue,
      changeValueSelectValue: dashboardActions.changeValueSelectValue,
      registerDashboardItem: dashboardActions.registerDashboardItem,
    },
    dispatch
  );
};

export default compose(
  graphql(DashboardItemsQuery),
  graphql(CreateDashboardItemMutation, createDashboardItemMutationOptions),
  graphql(DestroyDashboardItemMutation, destroyDashboardItemMutationOptions),
  graphql(UpdateDashboardItemsMutation, updateDashboardItemsMutationOptions),
  connect(mapStateToProps, mapDispatchToProps)
)(Dashboard);
