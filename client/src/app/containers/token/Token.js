// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { Token }              from '../../views'
import gql                    from 'graphql-tag';
import { graphql }            from 'react-apollo';

/* -----------------------------------------
  GraphQL - Apollo client
 ------------------------------------------*/

const TokenQuery = gql`
 query ($id: ID!) {
    tokenById(id: $id) {
      id
      shortName
      longName
      imageUrl
      website

      subreddits {
        id
        displayName
      }
    }
  }
`;

const TokenWithQuery = graphql(
  TokenQuery,
  {
    options: ({ match }) => {
      return {
        variables: {
          id: match.params.id,
        },
      };
    }
  }
)(Token);

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
)(TokenWithQuery);
