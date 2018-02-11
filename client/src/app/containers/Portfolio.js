// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, graphql }   from 'react-apollo';
import {
  error as createNotificationError,
  success as createNotificationSuccess,
}                             from 'react-notification-system-redux';
import {
  PortfolioTickersQuery,
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
    addTokenExchangeId: state.portfolio.addTokenExchangeId,
    addTokenId: state.portfolio.addTokenId,
    currency: state.globals.currency,
    changeActive: state.portfolio.changeActive,
    nightMode: state.globals.nightMode,
    portfolioHistoryPlotRange: state.portfolio.portfolioHistoryPlotRange,
    tokenExchangesAll: state.portfolio.tokenExchangesAll,
    tokensAll: state.portfolio.tokensAll,
    tokenUsers: state.portfolio.tokenUsers,
    user: state.globals.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addTokenUser: portfolioActions.addTokenUser,
      changeAddTokenExchangeId: portfolioActions.changeAddTokenExchangeId,
      changeAddTokenId: portfolioActions.changeAddTokenId,
      changePortfolioHistoryPlotRange: portfolioActions.changePortfolioHistoryPlotRange,
      changeTokenUserAmount: portfolioActions.changeTokenUserAmount,
      createNotificationError: createNotificationError,
      createNotificationSuccess: createNotificationSuccess,
      removeTokenUser: portfolioActions.removeTokenUser,
    },
    dispatch
  );
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(TokenUsersQuery),
  graphql(TokensAllQuery),
  graphql(PortfolioTickersQuery),
  graphql(UpdateTokenUsersMutation, UpdateTokenUsersMutationOptions),
)(Portfolio);
