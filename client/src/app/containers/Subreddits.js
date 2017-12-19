// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { Subreddits }         from '../views';
import gql                    from 'graphql-tag';
import { graphql }            from 'react-apollo';


/* -----------------------------------------
  GraphQL - Apollo client
 ------------------------------------------*/

const query = gql`
 query {
    allSubreddits {
      id
      displayName
      name
      imageUrl
      activeUserCount
      commentCount
      postCount
      subscriberCount

      commentCounts(timeRange: "ONE_WEEK") {
        id
        count
        timestamp
      }
    }
  }
`;

const SubredditsContainer = graphql(query)(Subreddits);

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
)(SubredditsContainer);
