// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  info as createNotificationInfo,
}                             from 'react-notification-system-redux';
import NavigationBar          from '../../components/navigation/NavigationBar';
import * as globalsActions    from '../../redux/modules/globals';

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
  return {
    isPageLoaded: state.globals.isPageLoaded,
    nightMode: state.globals.nightMode,
    currency: state.globals.currency,
    user: state.globals.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      createNotificationInfo: createNotificationInfo,
      toggleNightMode: globalsActions.toggleNightMode,
      changeCurrency: globalsActions.changeCurrency,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
