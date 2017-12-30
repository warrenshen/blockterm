// @flow weak

import { connect }             from 'react-redux';
import { bindActionCreators }  from 'redux';
import { compose, graphql }    from 'react-apollo';
import {
  CreateDashboardItemMutation,
  CreateDashboardItemMutationOptions,
  DestroyDashboardItemMutation,
  DestroyDashboardItemMutationOptions,
  UpdateDashboardItemsMutation,
  UpdateDashboardItemsMutationOptions,
}                              from '../queries';
import { DashboardPagesQuery } from '../queries';
import Dashboard               from './Dashboard';
import * as dashboardActions   from '../redux/modules/dashboard';
import * as globalsActions     from '../redux/modules/globals';

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
  return {
    apollo: state.apollo,
    dashboardAction: state.dashboard.dashboardAction,
    dashboardData: state.dashboard.dashboardData,
    dashboardItemStates: state.dashboard.dashboardItemStates,
    dashboardPages: state.dashboard.dashboardPages,
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
      changeDashboardItemState: dashboardActions.changeDashboardItemState,
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
  graphql(DashboardPagesQuery),
  graphql(CreateDashboardItemMutation, CreateDashboardItemMutationOptions),
  graphql(DestroyDashboardItemMutation, DestroyDashboardItemMutationOptions),
  graphql(UpdateDashboardItemsMutation, UpdateDashboardItemsMutationOptions),
  connect(mapStateToProps, mapDispatchToProps)
)(Dashboard);
