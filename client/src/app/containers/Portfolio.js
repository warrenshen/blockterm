// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, graphql }   from 'react-apollo';
import {
  error as createNotificationError,
  success as createNotificationSuccess,
}                             from 'react-notification-system-redux';
import {
  TokenUsersQuery,
  TokensAllQuery,
  UpdateTokenUsersMutation,
  UpdateTokenUsersMutationOptions,
}                             from '../queries';
import * as portfolioActions  from '../redux/modules/portfolio';
import Portfolio              from '../views/Portfolio';

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
  return {
    currency: state.globals.currency,
    changeActive: state.portfolio.changeActive,
    nightMode: state.globals.nightMode,
    tokenUsers: state.portfolio.tokenUsers,
    user: state.globals.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addTokenUser: portfolioActions.addTokenUser,
      changeTokenUserAmount: portfolioActions.changeTokenUserAmount,
      createNotificationError: createNotificationError,
      createNotificationSuccess: createNotificationSuccess,
      removeTokenUser: portfolioActions.removeTokenUser,
    },
    dispatch
  );
};

export default compose(
  graphql(TokenUsersQuery),
  graphql(TokensAllQuery),
  graphql(UpdateTokenUsersMutation, UpdateTokenUsersMutationOptions),
  connect(mapStateToProps, mapDispatchToProps),
)(Portfolio);
