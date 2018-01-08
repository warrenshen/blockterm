// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, graphql }   from 'react-apollo';
import {
  TokenUsersQuery,
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
    nightMode: state.globals.nightMode,
    tokenUsers: state.portfolio.tokenUsers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      changeTokenUserAmount: portfolioActions.changeTokenUserAmount,
    },
    dispatch
  );
};

export default compose(
  graphql(TokenUsersQuery),
  graphql(UpdateTokenUsersMutation, UpdateTokenUsersMutationOptions),
  connect(mapStateToProps, mapDispatchToProps),
)(Portfolio);
