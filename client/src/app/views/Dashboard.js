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
    backgroundColor: '#BB0000',
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
      data,
    } = this.props;
    const key = `subreddit${dashboardItem.identifier.substring(16)}`;

    return (
      <div
        className={css(styles.item)}
        key={dashboardItem.id}
      >
        <DashboardItem
          dashboardItem={dashboardItem}
          data={data[dashboardItem.identifier.replace(/-/g, '')]}
        />
      </div>
    );
  }

  render()
  {
    const {
      data2,
    } = this.props;

    if (!data2.user)
    {
      return null;
    }

    const layout = data2.user.dashboardItems.map((dashboardItem) => ({
      i: dashboardItem.id,
      w: dashboardItem.w,
      h: dashboardItem.h,
      x: dashboardItem.x,
      y: dashboardItem.y,
    }));

    return (
      <ResponsiveReactGridLayout
        className='layout'
        cols={{ lg: 4, md: 4, sm: 4, xs: 4, xxs: 2 }}
        layouts={{ lg: layout }}
        rowHeight={400}
        onLayoutChange={(layout, layouts) =>
          this.onLayoutChange(layout, layouts)
        }
      >
        {
          data2.user.dashboardItems.map((dashboardItem) => this.renderItem(dashboardItem))
        }
      </ResponsiveReactGridLayout>
    );
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
