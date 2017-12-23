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
    border: '1px solid #aaa',
    borderBottom: '2px solid #aaa',
  },
  gridContainer: {
    backgroundColor: '#ececec',
    minHeight: '100vh',
  },
  nightMode: {
    backgroundColor: '#000 !important',
    border: '1px solid #555',
    borderBottom: '2px solid #555',
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

    const {
      id,
      identifier,
      w,
      h,
      x,
      y,
    } = dashboardItem;

    const layout = {
      i: id,
      w: w,
      h: h,
      x: x,
      y: y,
      minW: 1,
      maxW: 8,
    };

    return (
      <div
        className={css(styles.item, nightMode && styles.nightMode)}
        data-grid={layout}
        key={id}
      >
        <DashboardItem
          changeDashboardItemPlotRange={changeDashboardItemPlotRange}
          dashboardItem={dashboardItem}
          data={data[identifier.replace(/-/g, '')]}
          destroyDashboardItem={destroyDashboardItem}
          nightMode={nightMode}
          storeState={dashboard[id]}
        />
      </div>
    );
  }

  render()
  {
    const {
      dashboardItems,
      data,
      nightMode,
    } = this.props;

    if (data.loading)
    {
      return <div>Loading...</div>;
    }
    else
    {
      const itemsWithData = dashboardItems.filter(
        (dashboardItem) => data[dashboardItem.identifier.replace(/-/g, '')] !== undefined
      );

      return (
        <ResponsiveReactGridLayout
          className={css(styles.gridContainer, nightMode && styles.gridNightContainer)}
          cols={{ lg: 8, md: 8, sm: 4, xs: 4, xxs: 2 }}
          rowHeight={200}
          onLayoutChange={(layout, layouts) => this.onLayoutChange(layout, layouts)}
        >
          {
            itemsWithData.map((dashboardItem) => this.renderItem(dashboardItem))
          }
        </ResponsiveReactGridLayout>
      );
    }
  }
}

export default Dashboard;
