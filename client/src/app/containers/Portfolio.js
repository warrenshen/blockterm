// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, graphql }   from 'react-apollo';
import {
  TokenUsersQuery,
  TokensAllQuery,
  UpdateTokenUsersMutation,
  UpdateTokenUsersMutationOptions,
}                             from '../queries';
import Portfolio              from '../views/Portfolio';
import * as portfolioActions  from '../redux/modules/portfolio';

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
  return {
    changeActive: state.portfolio.changeActive,
    nightMode: state.globals.nightMode,
    tokenUsers: state.portfolio.tokenUsers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addTokenUser: portfolioActions.addTokenUser,
      changeTokenUserAmount: portfolioActions.changeTokenUserAmount,
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
