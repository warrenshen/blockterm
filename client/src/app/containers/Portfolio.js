// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, graphql }   from 'react-apollo';
import {
  TokenUsersQuery,
  TokenUsersQueryOptions,
  TokensAllQuery,
  UpdateTokenUsersMutation,
  UpdateTokenUsersMutationOptions,
}                             from '../queries';
import Portfolio              from '../views/Portfolio';
import * as portfolioActions  from '../redux/modules/portfolio';
import {
  error as createNotificationError,
  success as createNotificationSuccess,
} from 'react-notification-system-redux';

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
  return {
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
      createNotificationError: createNotificationError,
      createNotificationSuccess: createNotificationSuccess,
      changeTokenUserAmount: portfolioActions.changeTokenUserAmount,
      removeTokenUser: portfolioActions.removeTokenUser,
    },
    dispatch
  );
};

export default compose(
  graphql(TokenUsersQuery, TokenUsersQueryOptions),
  graphql(TokensAllQuery),
  graphql(UpdateTokenUsersMutation, UpdateTokenUsersMutationOptions),
  connect(mapStateToProps, mapDispatchToProps),
)(Portfolio);
