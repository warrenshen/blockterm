// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, graphql }   from 'react-apollo';
import {
  error as createNotificationError,
  success as createNotificationSuccess,
}                             from 'react-notification-system-redux';
import {
  CreateExchangeKeyMutation,
  CreateExchangeKeyMutationOptions,
}                             from '../queries';
import ApiKeys                from '../views/ApiKeys';
import * as balancesActions   from '../redux/modules/balances';

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => ({
  apiKey: state.balances.apiKey,
  exchange: state.balances.exchange,
  exchangeKeys: state.balances.exchangeKeys,
  nightMode: state.globals.nightMode,
  secretKey: state.balances.secretKey,
  user: state.globals.user,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      changeApiKey: balancesActions.changeApiKey,
      changeExchange: balancesActions.changeExchange,
      changeSecretKey: balancesActions.changeSecretKey,
      createNotificationError: createNotificationError,
      createNotificationSuccess: createNotificationSuccess,
    },
    dispatch
  );
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(CreateExchangeKeyMutation, CreateExchangeKeyMutationOptions),
)(ApiKeys);
