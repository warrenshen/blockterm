// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, graphql }    from 'react-apollo';
import {
  UsersByPageWithDashboardPagesQuery,
  UsersByPageQueryWithDashboardPagesOptions,
}                             from '../queries';
import AdminDashboards        from '../views/AdminDashboards';

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
  return {
    nightMode: state.globals.nightMode,
    user: state.globals.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
    },
    dispatch
  );
};

export default compose(
  graphql(
    UsersByPageWithDashboardPagesQuery,
    UsersByPageQueryWithDashboardPagesOptions,
  ),
  connect(mapStateToProps, mapDispatchToProps),
)(AdminDashboards);
