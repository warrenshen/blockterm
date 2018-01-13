// @flow weak

import { connect }             from 'react-redux';
import { bindActionCreators }  from 'redux';
import { compose, graphql }    from 'react-apollo';
import {
  CreateDashboardItemMutation,
  CreateDashboardItemMutationOptions,
  UpdateDashboardItemMutation,
  UpdateDashboardItemMutationOptions,
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
    scrollActive: state.globals.scrollActive,
    selectedTab: state.dashboard.selectedTab,
    sidebarDashboardItemId: state.dashboard.sidebarDashboardItemId,
    sidebarMode: state.dashboard.sidebarMode,
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
      () => dispatch(success({ position: 'tl', title: 'Success!' })),
      () => dispatch(success({ position: 'tl', title: 'Failure.' })),
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      changeKeySelectValue: dashboardActions.changeKeySelectValue,
      changeScrollActive: globalsActions.changeScrollActive,
      changeSidebarMode: dashboardActions.changeSidebarMode,
      createDashboardItemLocal: createDashboardItemLocalWithNotification,
      changeValueSelectValue: dashboardActions.changeValueSelectValue,
      updateDashboardItemLocal: dashboardActions.updateDashboardItemLocal,
    },
    dispatch
  );
};

export default compose(
  graphql(DashboardPagesQuery),
  graphql(CreateDashboardItemMutation, CreateDashboardItemMutationOptions),
  graphql(UpdateDashboardItemMutation, UpdateDashboardItemMutationOptions),
  connect(mapStateToProps, mapDispatchToProps)
)(Dashboard);
