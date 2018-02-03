// @flow weak

import { connect }             from 'react-redux';
import { bindActionCreators }  from 'redux';
import { compose, graphql }    from 'react-apollo';
import {
  DestroyDashboardItemMutation,
  DestroyDashboardItemMutationOptions,
  UpdateDashboardItemMutation,
  UpdateDashboardItemMutationOptions,
  UpdateDashboardItemsMutation,
  UpdateDashboardItemsMutationOptions,
}                              from '../queries';
import DashboardTabs           from '../components/DashboardTabs';
import * as dashboardActions   from '../redux/modules/dashboard';
import * as globalsActions     from '../redux/modules/globals';

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
  return {
    alerts: state.alerts.alerts,
    currency: state.globals.currency,
    dashboardAction: state.dashboard.dashboardAction,
    dashboardData: state.dashboard.dashboardData,
    dashboardItemStates: state.dashboard.dashboardItemStates,
    dashboardPages: state.dashboard.dashboardPages,
    isPageLoaded: state.globals.isPageLoaded,
    nightMode: state.globals.nightMode,
    selectedTab: state.dashboard.selectedTab,
    sidebarMode: state.dashboard.sidebarMode,
    user: state.globals.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      changeDashboardItemState: dashboardActions.changeDashboardItemState,
      changeModalState: dashboardActions.changeModalState,
      changeSelectedTab: dashboardActions.changeSelectedTab,
      changeSidebarMode: dashboardActions.changeSidebarMode,
      destroyDashboardItemLocal: dashboardActions.destroyDashboardItemLocal,
      logDashboardActionStart: dashboardActions.logDashboardActionStart,
      logDashboardActionStop: dashboardActions.logDashboardActionStop,
      saveDashboardItemsLocal: dashboardActions.saveDashboardItemsLocal,
      updateDashboardItemLocal: dashboardActions.updateDashboardItemLocal,
    },
    dispatch
  );
};

export default compose(
  graphql(DestroyDashboardItemMutation, DestroyDashboardItemMutationOptions),
  graphql(UpdateDashboardItemMutation, UpdateDashboardItemMutationOptions),
  graphql(UpdateDashboardItemsMutation, UpdateDashboardItemsMutationOptions),
  connect(mapStateToProps, mapDispatchToProps)
)(DashboardTabs);
