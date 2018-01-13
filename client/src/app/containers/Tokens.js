// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, graphql }   from 'react-apollo';
import {
  TokensByPageQuery,
  TokensByPageQueryOptions,
}                             from '../queries';
import { Tokens }             from '../views';

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
  return {
    nightMode: state.globals.nightMode,
  };
};

export default compose(
  graphql(TokensByPageQuery, TokensByPageQueryOptions),
  connect(mapStateToProps),
)(Tokens);
