// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, graphql }   from 'react-apollo';
import { UserQuery }          from '../../queries';
import NavigationBar          from '../../components/navigation/NavigationBar';
import * as globalsActions    from '../../redux/modules/globals';
import {
  clearItem,
  getItem,
  setItem,
} from '../../services/cookie';
import {
  PROJECT_VERSION,
  PATCH_NOTES,
} from '../../constants/items';
import {
  error as createNotificationError,
  success as createNotificationSuccess,
} from 'react-notification-system-redux';

const LAST_SEEN = 'LAST_SEEN_VERSION';

/* -----------------------------------------
  Redux
 ------------------------------------------*/
function showLatestUpdates() {
  const seenVersion = getItem(LAST_SEEN);
  console.log(seenVersion);
  if (seenVersion != PROJECT_VERSION) {
    //setItem(LAST_SEEN, PROJECT_VERSION);
    createNotificationSuccess({ position: 'bc', title: 'Welcome back!'});
  }
}

const mapStateToProps = (state) => {
  return {
    isPageLoaded: state.globals.isPageLoaded,
    nightMode: state.globals.nightMode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      showLatestUpdates: showLatestUpdates,
      toggleNightMode: globalsActions.toggleNightMode,
    },
    dispatch
  );
};

export default compose(
  graphql(UserQuery),
  connect(mapStateToProps, mapDispatchToProps)
)(NavigationBar);
