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
  query ($activeUserCountsTimeRange: String,
         $commentCountsTimeRange: String,
         $name: String!,
         $postCountsTimeRange: String,
         $subscriberCountsTimeRange: String) {
    subredditByName(name: $name) {
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
        count
        timestamp
      }

      commentCounts(timeRange: $commentCountsTimeRange) {
        count
        timestamp
      }

      postCounts(timeRange: $postCountsTimeRange) {
        count
        timestamp
      }

      subscriberCounts(timeRange: $subscriberCountsTimeRange) {
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
          activeUserCountsTimeRange: activeUserCountPlotRange,
          commentCountsTimeRange: commentCountPlotRange,
          postCountsTimeRange: postCountPlotRange,
          name: match.params.name,
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
