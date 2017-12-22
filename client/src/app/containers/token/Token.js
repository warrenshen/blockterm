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
        $pricePlotRange: String,
        $mentionSubredditPlotRange: String,
        $mentionTotalPlotRange: String) {
    tokenById(id: $id) {
      id
      shortName
      longName
      imageUrl
      website

      markets {
        name
        lastPrice

        marketTickers(timeRange: $pricePlotRange) {
          id
          value
          timestamp
        }
      }

      mentionTotalCounts(timeRange: $mentionTotalPlotRange) {
        count
        timestamp
      }

      subreddits {
        id
        displayName
        imageUrl
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
      pricePlotRange,
    }) => {
      return {
        variables: {
          id: match.params.id,
          mentionSubredditPlotRange: mentionSubredditPlotRange,
          mentionTotalPlotRange: mentionTotalPlotRange,
          pricePlotRange: pricePlotRange,
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
    pricePlotRange: state.plots.pricePlotRange,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
  {
    changeMentionSubredditPlotRange: plotsActions.changeMentionSubredditPlotRange,
    changeMentionTotalPlotRange: plotsActions.changeMentionTotalPlotRange,
    changePricePlotRange: plotsActions.changePricePlotRange,
  },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TokenWithQuery);
