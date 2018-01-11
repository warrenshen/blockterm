// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, graphql }   from 'react-apollo';
import { UserQuery }          from '../queries';
import Footer          from '../components/Footer';
import * as globalsActions    from '../redux/modules/globals';

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
      toggleNightMode: globalsActions.toggleNightMode,
    },
    dispatch
  );
};

export default compose(
  graphql(UserQuery),
  connect(mapStateToProps, mapDispatchToProps)
)(Footer);
