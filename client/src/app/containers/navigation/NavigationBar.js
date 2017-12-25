// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, graphql }   from 'react-apollo';
import { UserQuery }          from '../../queries';
import NavigationBar          from '../../components/navigation/NavigationBar';
import * as globalsActions    from '../../redux/modules/globals';

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
  return {
    nightMode: state.globals.nightMode,
    sidebarActive: state.globals.sidebarActive,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      toggleNightMode: globalsActions.toggleNightMode,
      toggleSidebar: globalsActions.toggleSidebar,
    },
    dispatch
  );
};

export default compose(
  graphql(UserQuery),
  connect(mapStateToProps, mapDispatchToProps)
)(NavigationBar);
