// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { Home }               from '../views';
import gql                    from 'graphql-tag';
import { graphql }            from 'react-apollo';


/* -----------------------------------------
  GraphQL - Apollo client
 ------------------------------------------*/

const query = gql`
 query {
    allSubreddits {
      id
      blob
      displayName
      name
      imageUrl
    }
  }
`;

const HomeContainer = graphql(query)(Home);

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
)(HomeContainer);