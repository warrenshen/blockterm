// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { SubredditsCompare }  from '../views';
import gql                    from 'graphql-tag';
import { graphql }            from 'react-apollo';
import * as subredditsActions from '../redux/modules/subreddits';
import * as plotsActions      from '../redux/modules/plots';

/* -----------------------------------------
  GraphQL - Apollo client
 ------------------------------------------*/

const query = gql`
  query (
    $ids: [ID]!,
    $commentCountsTimeRange: String,
    $postCountsTimeRange: String,
    $activeUserCountsTimeRange: String,
  ) {
    allSubreddits {
      id
      displayName
      imageUrl
    }

    subredditsByIds(ids: $ids) {
      id
      displayName
      imageUrl

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
    }
  }
`;

const SubredditsCompareContainer = graphql(
  query,
  {
    options: ({
      match,
      activeUserCountPlotRange,
      commentCountPlotRange,
      postCountPlotRange,
      subredditIds,
    }) => {
      return {
        variables: {
          ids: subredditIds,
          activeUserCountPlotRange: activeUserCountPlotRange,
          commentCountsTimeRange: commentCountPlotRange,
          postCountsTimeRange: postCountPlotRange,
        },
      };
    },
  }
)(SubredditsCompare);

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
  return {
    activeUserCountPlotRange: state.plots.activeUserCountPlotRange,
    commentCountPlotRange: state.plots.commentCountPlotRange,
    postCountPlotRange: state.plots.postCountPlotRange,
    nightMode: state.globals.nightMode,
    subredditIds: state.subreddits.subredditIds,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addSubredditId: subredditsActions.addSubredditId,
      changeActiveUserCountPlotRange: plotsActions.changeActiveUserCountPlotRange,
      changeCommentCountPlotRange: plotsActions.changeCommentCountPlotRange,
      changePostCountPlotRange: plotsActions.changePostCountPlotRange,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubredditsCompareContainer);
