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
    tokensByPage {
      id
      shortName
      longName
      imageUrl
      priceUSD
      priceBTC
      volumeUSD24h
      marketCapUSD
      availableSupply
      totalSupply
      maxSupply
      percentChange1h
      percentChange24h
      percentChange7d
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
