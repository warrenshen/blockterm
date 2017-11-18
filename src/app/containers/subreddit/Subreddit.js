// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { Subreddit }          from '../../views';
import gql                    from 'graphql-tag';
import { graphql }            from 'react-apollo';
import * as plotsActions      from '../../redux/modules/plots';
import { ONE_MONTH } from '../../constants/plots';

/* -----------------------------------------
  GraphQL - Apollo client
 ------------------------------------------*/

const SubredditQuery = gql`
 query ($id: ID!, $postCountsTimeRange: String) {
    subredditById(id: $id) {
      id
      blob
      description
      displayName
      name
      startDate

      postCounts(timeRange: $postCountsTimeRange) {
        id
        count
        timestamp
      }
    }
  }
`;

const SubredditWithQuery = graphql(
  SubredditQuery,
  {
    options: ({ match, postCountPlotRange }) => {
      return {
        variables: {
          id: match.params.id,
          postCountsTimeRange: postCountPlotRange,
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
    postCountPlotRange: state.plots.postCountPlotRange,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      changePostCountPlotRange: plotsActions.changePostCountPlotRange,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubredditWithQuery);
