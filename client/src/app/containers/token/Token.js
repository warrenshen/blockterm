// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import gql                    from 'graphql-tag';
import { compose, graphql }   from 'react-apollo';
import { Token }              from '../../views'
import * as globalsActions    from '../../redux/modules/globals';
import * as plotsActions      from '../../redux/modules/plots';
import * as tokenActions      from '../../redux/modules/token';

/* -----------------------------------------
  GraphQL - Apollo client
 ------------------------------------------*/

const query = gql`
  query (
    $identifier: String!,
    $mentionSubredditPlotRange: String,
    $mentionTotalPlotRange: String,
  ) {
    token: tokenByIdentifier(identifier: $identifier) {
      id
      shortName
      longName
      imageUrl
      website
      priceUSD
      priceBTC
      volumeUSD24h
      volumeBTC24h
      marketCapUSD
      marketCapBTC
      availableSupply
      totalSupply
      maxSupply
      percentChange1h
      percentChange24h
      percentChange7d

      mentionTotalCounts(timeRange: $mentionTotalPlotRange) {
        count
        timestamp
      }

      subreddits {
        id
        displayName
        name
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
const queryOptions = {
  options: ({
    match,
    mentionSubredditPlotRange,
    mentionTotalPlotRange,
  }) => {
    return {
      variables: {
        identifier: match.params.identifier,
        mentionSubredditPlotRange: mentionSubredditPlotRange,
        mentionTotalPlotRange: mentionTotalPlotRange,
      },
    };
  },
};

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
  return {
    currency: state.globals.currency,
    mentionSubredditPlotRange: state.plots.mentionSubredditPlotRange,
    mentionTotalPlotRange: state.plots.mentionTotalPlotRange,
    nightMode: state.globals.nightMode,
    pricePlotRange: state.plots.pricePlotRange,
    scrollActive: state.globals.scrollActive,
    selectedTicker: state.token.selectedTicker,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
  {
    changeMentionSubredditPlotRange: plotsActions.changeMentionSubredditPlotRange,
    changeMentionTotalPlotRange: plotsActions.changeMentionTotalPlotRange,
    changePricePlotRange: plotsActions.changePricePlotRange,
    changeScrollActive: globalsActions.changeScrollActive,
    changeSelectedTicker: tokenActions.changeSelectedTicker,
  },
    dispatch
  );
};

export default compose(
  graphql(query, queryOptions),
  connect(mapStateToProps, mapDispatchToProps)
)(Token);
