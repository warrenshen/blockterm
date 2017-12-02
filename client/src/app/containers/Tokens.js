// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tokens }             from '../views';
import gql                    from 'graphql-tag';
import { graphql }            from 'react-apollo';


/* -----------------------------------------
  GraphQL - Apollo client
 ------------------------------------------*/

const TokensQuery = gql`
 query {
    allTokens {
      id
      shortName
      longName
    }
  }
`;

const TokensWithQuery = graphql(
  TokensQuery,
)(Tokens);


/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
  return {
    nightMode: state.globals.nightMode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TokensWithQuery);
