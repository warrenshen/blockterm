// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, graphql }   from 'react-apollo';
import {
  TokenUsersQuery,
}                             from '../queries';
import Portfolio              from '../views/Portfolio';

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
  return {
    nightMode: state.globals.nightMode,
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
  graphql(TokenUsersQuery),
  connect(mapStateToProps, mapDispatchToProps),
)(Portfolio);
