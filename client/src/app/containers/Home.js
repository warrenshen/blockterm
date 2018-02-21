// @flow weak

import { connect }             from 'react-redux';
import { bindActionCreators }  from 'redux';
import { compose, graphql }    from 'react-apollo';
import {
  error as createNotificationError,
  success as createNotificationSuccess,
}                              from 'react-notification-system-redux';
import {
  DashboardPagesQuery,
  DashboardPagesQueryOptions,
  CreateDashboardItemMutation,
  CreateDashboardItemMutationOptions,
  UpdateDashboardItemMutation,
  UpdateDashboardItemMutationOptions,
}                              from '../queries';
import * as dashboardActions   from '../redux/modules/dashboard';
import * as exchangesActions   from '../redux/modules/exchanges';
import * as globalsActions     from '../redux/modules/globals';
import Dashboard               from './Dashboard';

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
  return {
    dashboardItemStates: state.dashboard.dashboardItemStates,
    dashboardPages: state.dashboard.dashboardPages,
    keySelectValue: state.dashboard.keySelectValue,
    modalIdentifier: state.dashboard.modalIdentifier,
    nightMode: state.globals.nightMode,
    scrollActive: state.globals.scrollActive,
    selectedTab: state.dashboard.selectedTab,
    sidebarDashboardItemId: state.dashboard.sidebarDashboardItemId,
    sidebarMode: state.dashboard.sidebarMode,
    user: state.globals.user,
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
      else
      {
        reject();
      }
    })
      .then(() => dispatch(createNotificationSuccess({ position: 'bc', title: 'Success!' })))
      .catch(() => dispatch(createNotificationError({ position: 'bc', title: 'Failure.' })));
  }
}

function updateDashboardItemLocalWithNotification(dashboardItemId, newIdentifier, staticActive)
{
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      if (dispatch(dashboardActions.updateDashboardItemLocal(dashboardItemId, newIdentifier, staticActive)))
      {
        resolve();
      }
      else
      {
        reject();
      }
    })
      .then(() => dispatch(createNotificationSuccess({ position: 'bc', title: 'Success!' })))
      .catch(() => dispatch(createNotificationError({ position: 'bc', title: 'Failure.' })));
  }
}

function changeKeySelectValue(option)
{
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      if (dispatch(dashboardActions.changeKeySelectValue(option)))
      {
        resolve();
      }
      else
      {
        reject();
      }
    });
  }
}

function changeValueSelectValue(option)
{
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      if (dispatch(dashboardActions.changeValueSelectValue(option)))
      {
        resolve();
      }
      else
      {
        reject();
      }
    });
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      changeKeySelectValue: changeKeySelectValue,
      changeModalState: dashboardActions.changeModalState,
      changeScrollActive: globalsActions.changeScrollActive,
      changeSidebarMode: dashboardActions.changeSidebarMode,
      createDashboardItemLocal: createDashboardItemLocalWithNotification,
      createNotificationError: createNotificationError,
      createNotificationSuccess: createNotificationSuccess,
      changeValueSelectValue: changeValueSelectValue,
      updateDashboardItemLocal: updateDashboardItemLocalWithNotification,
      updateExchangeTicker: exchangesActions.updateExchangeTicker,
    },
    dispatch
  );
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(DashboardPagesQuery, DashboardPagesQueryOptions),
  graphql(CreateDashboardItemMutation, CreateDashboardItemMutationOptions),
  graphql(UpdateDashboardItemMutation, UpdateDashboardItemMutationOptions)
)(Dashboard);
