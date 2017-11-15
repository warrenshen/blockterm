// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { Subreddit }          from '../../views';
import gql                    from 'graphql-tag';
import { graphql }            from 'react-apollo';


/* -----------------------------------------
  GraphQL - Apollo client
 ------------------------------------------*/

const SubredditQuery = gql`
 query ($id: ID!) {
    subredditById(id: $id) {
      id
      name
      startDate

      postCounts {
        id
        count
        when
      }
    }
  }
`;

const SubredditWithQuery = graphql(
  SubredditQuery,
  {
    options: ({ match }) => {
      return {
        variables: {
          id: match.params.id
        }
      }
    }
  }
)(Subreddit);


/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
  return {
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
)(SubredditWithQuery);
