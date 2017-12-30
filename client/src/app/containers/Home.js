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
import {
  success as createNotificationSuccess,
} from 'react-notification-system-redux';

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
  return {
    dashboardItemStates: state.dashboard.dashboardItemStates,
    dashboardPages: state.dashboard.dashboardPages,
    keySelectValue: state.dashboard.keySelectValue,
    nightMode: state.globals.nightMode,
    scrollActive: state.dashboard.scrollActive,
    selectedTab: state.dashboard.selectedTab,
    sidebarActive: state.globals.sidebarActive,
    user: state.dashboard.user,
    valueSelectValue: state.dashboard.valueSelectValue,
  };
};

function createDashboardItemLocalWithNotification(newDashboardItem)
{
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      if (dispatch(dashboardActions.createDashboardItemLocal(newDashboardItem)))
      {
        resolve();
      }
    })
    .then(
      () => dispatch(createNotificationSuccess({ position: 'br', title: 'Success!' })),
      () => dispatch(createNotificationSuccess({ position: 'br', title: 'Failure.' })),
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      changeKeySelectValue: dashboardActions.changeKeySelectValue,
      changeScrollActive: dashboardActions.changeScrollActive,
      createDashboardItemLocal: createDashboardItemLocalWithNotification,
      changeValueSelectValue: dashboardActions.changeValueSelectValue,
      toggleSidebar: globalsActions.toggleSidebar,
    },
    dispatch
  );
};

export default compose(
  graphql(DashboardPagesQuery),
  graphql(CreateDashboardItemMutation, CreateDashboardItemMutationOptions),
  connect(mapStateToProps, mapDispatchToProps)
)(Dashboard);
