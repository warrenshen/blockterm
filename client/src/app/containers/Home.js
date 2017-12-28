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
import * as globalsActions     from '../redux/modules/globals';

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
          console.log(error);
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
            user: mutationResult.data.destroyDashboardItem,
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
    updateDashboardItems(dashboardItems) {
      return mutate({
        updateQueries: {
          DashboardItemsQuery: (prev, { mutationResult }) => ({
            user: mutationResult.data.updateDashboardItems,
          }),
        },
        variables: { dashboardItemsString: JSON.stringify(dashboardItems) },
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
    apollo: state.apollo,
    dashboardAction: state.dashboard.dashboardAction,
    dashboardData: state.dashboard.dashboardData,
    dashboardPages: state.dashboard.dashboardPages,
    dashboardPagesStates: state.dashboard.dashboardPagesStates,
    keySelectValue: state.dashboard.keySelectValue,
    nightMode: state.globals.nightMode,
    scrollActive: state.dashboard.scrollActive,
    selectedTab: state.dashboard.selectedTab,
    sidebarActive: state.globals.sidebarActive,
    valueSelectValue: state.dashboard.valueSelectValue,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      // fetchDashboardPages:
      changeDashboardItemPlotRange: dashboardActions.changeDashboardItemPlotRange,
      changeDashboardPageState: dashboardActions.changeDashboardPageState,
      changeKeySelectValue: dashboardActions.changeKeySelectValue,
      changeScrollActive: dashboardActions.changeScrollActive,
      changeSelectedTab: dashboardActions.changeSelectedTab,
      changeValueSelectValue: dashboardActions.changeValueSelectValue,
      createDashboardItemLocal: dashboardActions.createDashboardItemLocal,
      destroyDashboardItemLocal: dashboardActions.destroyDashboardItemLocal,
      logDashboardActionStart: dashboardActions.logDashboardActionStart,
      logDashboardActionStop: dashboardActions.logDashboardActionStop,
      saveDashboardItemsLocal: dashboardActions.saveDashboardItemsLocal,
      toggleSidebar: globalsActions.toggleSidebar,
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
