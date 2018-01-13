// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, graphql }   from 'react-apollo';
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
      changeIsPageLoaded: globalsActions.changeIsPageLoaded,
      toggleNightMode: globalsActions.toggleNightMode,
    },
    dispatch
  );
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Footer);
