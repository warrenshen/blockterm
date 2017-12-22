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

    const layout = user.dashboardItems.map((dashboardItem) => ({
      i: dashboardItem.id,
      w: dashboardItem.w,
      h: dashboardItem.h,
      x: dashboardItem.x,
      y: dashboardItem.y,
    }));

    if (data.loading)
    {
      return <div>Loading...</div>;
    }
    else
    {
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
            user.dashboardItems.map((dashboardItem) => this.renderItem(dashboardItem))
          }
        </ResponsiveReactGridLayout>
      );
    }
  }
}

export default Dashboard;
