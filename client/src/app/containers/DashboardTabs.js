// @flow weak

import { connect }             from 'react-redux';
import { bindActionCreators }  from 'redux';
import { compose, graphql }    from 'react-apollo';
import {
  DestroyDashboardItemMutation,
  DestroyDashboardItemMutationOptions,
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
    dashboardAction: state.dashboard.dashboardAction,
    dashboardData: state.dashboard.dashboardData,
    dashboardItemStates: state.dashboard.dashboardItemStates,
    dashboardPages: state.dashboard.dashboardPages,
    nightMode: state.globals.nightMode,
    selectedTab: state.dashboard.selectedTab,
    user: state.dashboard.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      changeDashboardItemState: dashboardActions.changeDashboardItemState,
      changeSelectedTab: dashboardActions.changeSelectedTab,
      destroyDashboardItemLocal: dashboardActions.destroyDashboardItemLocal,
      logDashboardActionStart: dashboardActions.logDashboardActionStart,
      logDashboardActionStop: dashboardActions.logDashboardActionStop,
      saveDashboardItemsLocal: dashboardActions.saveDashboardItemsLocal,
      toggleDashboardItemStatic: dashboardActions.toggleDashboardItemStatic,
      toggleSidebar: globalsActions.toggleSidebar,
    },
    dispatch
  );
};

export default compose(
  graphql(DestroyDashboardItemMutation, DestroyDashboardItemMutationOptions),
  graphql(UpdateDashboardItemsMutation, UpdateDashboardItemsMutationOptions),
  connect(mapStateToProps, mapDispatchToProps)
)(DashboardTabs);
