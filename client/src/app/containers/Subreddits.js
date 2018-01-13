// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, graphql }   from 'react-apollo';
import {
  SubredditsAllQuery,
  SubredditsAllQueryOptions,
}                             from '../queries';
import { Subreddits }         from '../views';

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
  return {
    nightMode: state.globals.nightMode,
  };
};

export default compose(
  graphql(SubredditsAllQuery, SubredditsAllQueryOptions),
  connect(mapStateToProps),
)(Subreddits);
