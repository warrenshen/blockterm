// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import gql                    from 'graphql-tag';
import { compose, graphql }   from 'react-apollo';
import NavigationBar          from '../../components/navigation/NavigationBar';
import * as globalsActions    from '../../redux/modules/globals';

/* -----------------------------------------
  GraphQL - Apollo client
 ------------------------------------------*/

const userQuery = gql`
  query {
    user {
      email
    }
  }
`;

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
      toggleNightMode: globalsActions.toggleNightMode,
    },
    dispatch
  );
};

export default compose(
  graphql(userQuery),
  connect(mapStateToProps, mapDispatchToProps)
)(NavigationBar);
