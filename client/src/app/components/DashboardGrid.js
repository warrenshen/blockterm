// @flow weak

import React, {
  Component,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Responsive, WidthProvider } from 'react-grid-layout';
import DashboardItem from '../components/DashboardItem';
import { isIdentifierValid } from '../constants/items.js'
import {
  computeDashboardFreeValues,
} from '../constants/items';
import * as STYLES from '../constants/styles';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    minHeight: '100%',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    border: `1px solid ${STYLES.BORDERLIGHT}`,
    borderBottom: `2px solid ${STYLES.BORDERLIGHT}`,
  },
  gridContainer: {
    display: 'flex',
    flex: '1',
    backgroundColor: '#ececec',
    minHeight: '100vh',
  },
  nightMode: {
    backgroundColor: '#000 !important',
    border: `1px solid ${STYLES.BORDERDARK}`,
    borderBottom: `2px solid ${STYLES.BORDERDARK}`,
  },
  gridNightContainer: {
    backgroundColor: STYLES.SOFTGRAY,
  },
  sidebar: {
    width: '256px',
    backgroundColor:'#fff',
    borderLeft: '1px solid #666',
    height: '100%', //might be overzealous
  },
  nightSidebar: {
    backgroundColor:STYLES.LIGHTNIGHT,
  },
  bolded: {
    fontWeight: '700',
    textTransform: 'uppercase',
    fontSize: '12px',
    letterSpacing: '2px',
  },
  select: {
    borderBottom: '1px solid #666 !important',
  },
  button: {
    width:'100%',
  },
  placeholder: {
    width: '100%',
    height: '256px',
  },
});

class DashboardGrid extends Component {

  shouldComponentUpdate(nextProps, nextState)
  {
    return this.props !== nextProps;
  }

  renderItem(dashboardItem)
  {
    const {
      changeDashboardItemPlotRange,
      destroyDashboardItem,
      data,
      nightMode,
      removeFromLayout,
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
          data={data[identifier]}
          destroyDashboardItem={destroyDashboardItem}
          nightMode={nightMode}
          removeFromLayout={removeFromLayout}
        />
      </div>
    );
  }

  render()
  {
    const {
      dashboardItems,
      nightMode,
      saveLayout,
    } = this.props;

    const validItems = dashboardItems.filter(
      (dashboardItem) => isIdentifierValid(dashboardItem.identifier)
    );

    const arr = computeDashboardFreeValues(dashboardItems);

    return (
      <ResponsiveReactGridLayout
        className={css(styles.gridContainer, nightMode && styles.gridNightContainer)}
        cols={{ lg: 8, md: 8, sm: 4, xs: 4, xxs: 2 }}
        compactType={null}
        rowHeight={128}
        onLayoutChange={(layout, layouts) => saveLayout(layout)}
      >
        {
          dashboardItems.map(
            (dashboardItem) => this.renderItem(dashboardItem))
        }
        <div
          className={css(styles.item, nightMode && styles.nightMode)}
          data-grid={{ i: 'ADD_DASHBOARD_ITEM_ELEMENT', w: 1, h: 1, x: 0, y: arr[0] }}
          key={'ADD_DASHBOARD_ITEM_ELEMENT'}
        >
          +
        </div>
      </ResponsiveReactGridLayout>
    );
  }
}

export default DashboardGrid;
