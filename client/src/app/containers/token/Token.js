// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import gql                    from 'graphql-tag';
import { compose, graphql }   from 'react-apollo';
import {
  CreateDashboardItemMutation,
}                             from '../../queries';
import { Token }              from '../../views'
import * as plotsActions      from '../../redux/modules/plots';

/* -----------------------------------------
  GraphQL - Apollo client
 ------------------------------------------*/

const query = gql`
 query ($shortName: String!,
        $mentionSubredditPlotRange: String,
        $mentionTotalPlotRange: String,
        $pricePlotRange: String) {
    tokenByShortName(shortName: $shortName) {
      id
      shortName
      longName
      imageUrl
      website

      markets {
        id
        name
        lastPrice

        marketTickers(timeRange: $pricePlotRange) {
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
    pricePlotRange,
  }) => {
    return {
      variables: {
        mentionSubredditPlotRange: mentionSubredditPlotRange,
        mentionTotalPlotRange: mentionTotalPlotRange,
        pricePlotRange: pricePlotRange,
        shortName: match.params.shortName,
      },
    };
  },
};

const mutationOptions = {
  props: ({ mutate, ownProps }) => ({
    createDashboardItem(identifier) {

      return mutate({
        variables: { identifier },
        updateQueries: {
          dashboardItemsQuery: (prev, { mutationResult }) => ({
            dashboardItems: mutationResult.data.createDashboardItem.dashboardItems,
          }),
        },
      })
      .then(
        (response) => {
          return Promise.resolve();
        }
      )
      .catch(
        (error)=> {
          return Promise.reject();
        }
      );
    }
  }),
};

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

export default compose(
  graphql(query, queryOptions),
  graphql(CreateDashboardItemMutation, mutationOptions),
  connect(mapStateToProps, mapDispatchToProps)
)(Token);
