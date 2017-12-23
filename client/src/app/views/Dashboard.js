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
import * as STYLES from '../constants/styles';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    border: '1px solid #bbb',
    borderBottom: '2px solid #bbb',
  },
  gridContainer: {
    backgroundColor: '#e3e3e3',
    height: '100vh',
  },
  nightMode: {
    backgroundColor: '#000 !important',
    border: '1px solid #444',
    borderBottom: '2px solid #444',
  },
  gridNightContainer: {
    backgroundColor: STYLES.SOFTGRAY,
  }
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
      destroyDashboardItem,
      dashboard,
      data,
      nightMode,
    } = this.props;

    return (
      <div
        className={css(styles.item, nightMode && styles.nightMode)}
        key={dashboardItem.id}
      >
        {
          data[dashboardItem.identifier.replace(/-/g, '')] && (
            <DashboardItem
              changeDashboardItemPlotRange={changeDashboardItemPlotRange}
              dashboardItem={dashboardItem}
              data={data[dashboardItem.identifier.replace(/-/g, '')]}
              destroyDashboardItem={destroyDashboardItem}
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
      dashboardItems,
      data,
      nightMode,
    } = this.props;

    const layout = dashboardItems.map((dashboardItem) => ({
      i: dashboardItem.id,
      w: dashboardItem.w,
      h: dashboardItem.h,
      x: dashboardItem.x,
      y: dashboardItem.y,
      minW: 1,
      maxW: 8,
    }));

    if (data.loading)
    {
      return <div>Loading...</div>;
    }
    else
    {
      return (
        <ResponsiveReactGridLayout
          className={css(styles.gridContainer, nightMode && styles.gridNightContainer)}
          cols={{ lg: 8, md: 8, sm: 4, xs: 4, xxs: 2 }}
          layouts={{ lg: layout }}
          rowHeight={200}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }
        >
          {
            dashboardItems.map((dashboardItem) => this.renderItem(dashboardItem))
          }
        </ResponsiveReactGridLayout>
      );
    }
  }
}

export default Dashboard;
