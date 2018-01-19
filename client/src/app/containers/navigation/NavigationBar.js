// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, graphql }   from 'react-apollo';
import { UserQuery }          from '../../queries';
import NavigationBar          from '../../components/navigation/NavigationBar';
import * as globalsActions    from '../../redux/modules/globals';
import {
  info as createNotificationInfo,
} from 'react-notification-system-redux';

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
  return {
    isPageLoaded: state.globals.isPageLoaded,
    nightMode: state.globals.nightMode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      createNotificationInfo: createNotificationInfo,
      toggleNightMode: globalsActions.toggleNightMode,
    },
    dispatch
  );
};

export default compose(
  graphql(UserQuery),
  connect(mapStateToProps, mapDispatchToProps)
)(NavigationBar);
