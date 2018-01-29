// @flow weak

import { connect }             from 'react-redux';
import { bindActionCreators }  from 'redux';
import { compose, graphql }    from 'react-apollo';
import {
  error as createNotificationError,
  success as createNotificationSuccess,
}                             from 'react-notification-system-redux';
import {
  UpdateDashboardPagesMutation,
  UpdateDashboardPagesMutationOptions,
}                              from '../queries';
import * as dashboardPagesActions   from '../redux/modules/dashboardPages';
import DashboardSidebarTabs    from '../components/DashboardSidebarTabs';

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
  return {
    changeActive: state.dashboardPages.changeActive,
    dashboardPages: state.dashboardPages.dashboardPages,
    nightMode: state.globals.nightMode,
    user: state.globals.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addDashboardPage: dashboardPagesActions.addDashboardPage,
      changeDashboardPageName: dashboardPagesActions.changeDashboardPageName,
      createNotificationError: createNotificationError,
      createNotificationSuccess: createNotificationSuccess,
      removeDashboardPage: dashboardPagesActions.removeDashboardPage,
    },
    dispatch
  );
};

export default compose(
  graphql(UpdateDashboardPagesMutation, UpdateDashboardPagesMutationOptions),
  connect(mapStateToProps, mapDispatchToProps)
)(DashboardSidebarTabs);
