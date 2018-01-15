// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, graphql }    from 'react-apollo';
import {
  UsersByPageQuery,
  UsersByPageQueryOptions,
}                             from '../queries';
import AdminPortfolios        from '../views/AdminPortfolios';

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
  graphql(UsersByPageQuery, UsersByPageQueryOptions),
  connect(mapStateToProps, mapDispatchToProps),
)(AdminPortfolios);
