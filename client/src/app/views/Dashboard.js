// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import gql                    from 'graphql-tag';
import { graphql }            from 'react-apollo';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Responsive, WidthProvider } from 'react-grid-layout';
import DashboardItem from '../components/DashboardItem';
import Sidebar from '../components/Sidebar';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const updateDashboardItems = gql`
  mutation ($layout: String!) {
    updateDashboardItems(layout: $layout) {
      dashboardItems {
        id
      }
    }
  }
`;

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#000',
  },
  gridContainer: {
    backgroundColor: '#e3e3e3',
    height: '100vh',
    //width: '80vw',
  },
});

class Dashboard extends PureComponent {

  onLayoutChange(layout, layouts) {
    const {
      updateDashboardItems,
    } = this.props;

    const layoutString = JSON.stringify(layout);
    updateDashboardItems(layoutString);
  }

  renderItem(dashboardItem)
  {
    const {
      changeDashboardItemPlotRange,
      dashboard,
      data,
      nightMode,
    } = this.props;

    return (
      <div
        className={css(styles.item)}
        key={dashboardItem.id}
      >
        {
          data[dashboardItem.identifier.replace(/-/g, '')] && (
            <DashboardItem
              changeDashboardItemPlotRange={changeDashboardItemPlotRange}
              dashboardItem={dashboardItem}
              data={data[dashboardItem.identifier.replace(/-/g, '')]}
              nightMode={nightMode}
              storeState={dashboard[dashboardItem.id]}
            />
          )
        }
      </div>
    );
  }

  render()
  {
    const {
      dashboard,
      data,
      user,
    } = this.props;
    console.log(dashboard);

    const layout = user.dashboardItems.map((dashboardItem) => ({
      i: dashboardItem.id,
      w: dashboardItem.w,
      h: dashboardItem.h,
      x: dashboardItem.x,
      y: dashboardItem.y,
      minW: 1,
      maxW: 4,
    }));

    if (data.loading)
    {
      return <div>Loading...</div>;
    }
    else
    {
      return (
        <ResponsiveReactGridLayout
          className={css(styles.gridContainer)}
          cols={{ lg: 6, md: 6, sm: 6, xs: 6, xxs: 6 }}
          layouts={{ lg: layout }}
          rowHeight={200}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }
        >
          {
            user.dashboardItems.map((dashboardItem) => this.renderItem(dashboardItem))
          }
        </ResponsiveReactGridLayout>
      );
    }
  }
}

const DashboardWithMutation = graphql(
  updateDashboardItems,
  {
    props: ({ mutate, ownProps }) => ({
      updateDashboardItems(layout) {
        // ownProps.setMutationLoading();

        return mutate({ variables: { layout } })
          .then(
            (response) => {
              // ownProps.onUserLoggedIn(loginUser.token, loginUser.user);
              // ownProps.unsetMutationLoading();
              return Promise.resolve();
            }
          )
          .catch(
            (error)=> {
              // ownProps.onUserLogError(error);
              // ownProps.unsetMutationLoading();
              return Promise.reject();
            }
          );
      }
    })
  }
)(Dashboard);

export default DashboardWithMutation;
