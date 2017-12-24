// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { Subreddit }          from '../../views';
import gql                    from 'graphql-tag';
import { graphql }            from 'react-apollo';
import * as plotsActions      from '../../redux/modules/plots';

/* -----------------------------------------
  GraphQL - Apollo client
 ------------------------------------------*/

const SubredditQuery = gql`
  query ($id: ID!,
         $activeUserCountsTimeRange: String,
         $postCountsTimeRange: String,
         $commentCountsTimeRange: String) {
    subredditById(id: $id) {
      id
      description
      displayName
      name
      activeUserCount
      commentCount
      postCount
      subscriberCount
      startDate
      earliestActiveUserCountDate
      earliestCommentCountDate
      earliestPostCountDate
      updatedAt

      activeUserCounts(timeRange: $activeUserCountsTimeRange) {
        id
        count
        timestamp
      }

      commentCounts(timeRange: $commentCountsTimeRange) {
        id
        count
        timestamp
      }

      postCounts(timeRange: $postCountsTimeRange) {
        id
        count
        timestamp
      }

      subscriberCounts {
        id
        count
        timestamp
      }

      tokens {
        id
        shortName
        longName
        imageUrl
        website
      }
    }
  }
`;

const SubredditWithQuery = graphql(
  SubredditQuery,
  {
    options: ({
      match,
      activeUserCountPlotRange,
      commentCountPlotRange,
      postCountPlotRange,
      }) => {
      return {
        variables: {
          id: match.params.id,
          activeUserCountsTimeRange: activeUserCountPlotRange,
          commentCountsTimeRange: commentCountPlotRange,
          postCountsTimeRange: postCountPlotRange,
        },
      };
    },
  }
)(Subreddit);


/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
  return {
    activeUserCountPlotRange: state.plots.activeUserCountPlotRange,
    commentCountPlotRange: state.plots.commentCountPlotRange,
    postCountPlotRange: state.plots.postCountPlotRange,
    subscriberCountPlotRange: state.plots.subscriberCountPlotRange,
    nightMode: state.globals.nightMode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      changeActiveUserCountPlotRange: plotsActions.changeActiveUserCountPlotRange,
      changeCommentCountPlotRange: plotsActions.changeCommentCountPlotRange,
      changePostCountPlotRange: plotsActions.changePostCountPlotRange,
      changeSubscriberCountPlotRange: plotsActions.changeSubscriberCountPlotRange,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubredditWithQuery);
