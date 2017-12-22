// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import gql                    from 'graphql-tag';
import { graphql }            from 'react-apollo';
import Dashboard          from './Dashboard';
import * as dashboardActions      from '../redux/modules/dashboard';


/* -----------------------------------------
  GraphQL - Apollo client
 ------------------------------------------*/

const query = gql`
 query {
    user {
      dashboardItems {
        id
        identifier
        w
        h
        x
        y
      }
    }
  }
`;

const HomeContainer = graphql(query)(Dashboard);

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
    nightMode: state.globals.nightMode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      changeDashboardItemPlotRange: dashboardActions.changeDashboardItemPlotRange,
      registerDashboardItem: dashboardActions.registerDashboardItem,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
