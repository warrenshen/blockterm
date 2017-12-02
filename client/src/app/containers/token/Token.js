// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { Token }              from '../../views'
import gql                    from 'graphql-tag';
import { graphql }            from 'react-apollo';
import * as plotsActions      from '../../redux/modules/plots';

/* -----------------------------------------
  GraphQL - Apollo client
 ------------------------------------------*/

const TokenQuery = gql`
 query ($id: ID!,
        $mentionSubredditPlotRange: String,
        $mentionTotalPlotRange: String) {
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

      subredditMentions(timeRange: $mentionSubredditPlotRange) {
        subreddit {
          id
          displayName
        }

        mentionTotalCounts {
          count
          timestamp
        }
      }

      mentionTotalCounts(timeRange: $mentionTotalPlotRange) {
        count
        timestamp
      }
    }
  }
`;

const TokenWithQuery = graphql(
  TokenQuery,
  {
    options: ({
      match,
      mentionSubredditPlotRange,
      mentionTotalPlotRange,
    }) => {
      return {
        variables: {
          id: match.params.id,
          mentionSubredditPlotRange: mentionSubredditPlotRange,
          mentionTotalPlotRange: mentionTotalPlotRange,
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
    mentionSubredditPlotRange: state.plots.mentionSubredditPlotRange,
    mentionTotalPlotRange: state.plots.mentionTotalPlotRange,
    nightMode: state.globals.nightMode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
  {
    changeMentionSubredditPlotRange: plotsActions.changeMentionSubredditPlotRange,
    changeMentionTotalPlotRange: plotsActions.changeMentionTotalPlotRange,
  },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TokenWithQuery);
