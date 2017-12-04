// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { SubredditsCompare }  from '../views';
import gql                    from 'graphql-tag';
import { graphql }            from 'react-apollo';

/* -----------------------------------------
  GraphQL - Apollo client
 ------------------------------------------*/

const query = gql`
  query ($ids: [ID]!) {
    subredditsByIds(ids: $ids) {
      id
      displayName

      postCounts {
        id
        count
        timestamp
      }
    }
  }
`;

const SubredditsCompareContainer = graphql(
  query,
  {
    options: ({ match, ids }) => {
      return { variables: { ids: [1, 2] } };
    },
  }
)(SubredditsCompare);

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
)(SubredditsCompareContainer);
