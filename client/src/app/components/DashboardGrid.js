// @flow weak

import React, {
  Component,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Responsive, WidthProvider } from 'react-grid-layout';
import DashboardItem from '../components/DashboardItem';
import { isIdentifierValid } from '../constants/items.js'
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
  addItem: {
    fontWeight: '700',
  },
  closeButton: {
    color: '#000',
    borderLeft: `1px solid ${STYLES.BORDERLIGHT}`,
    padding: '0px 2px',
    lineHeight: '12px',
  },
  darkCloseButton: {
    backgroundColor: '#000',
    color: '#fff',
  },
  grabBar: {
    lineHeight: '4px',
    textAlign: 'right',
    width: '100%',
    borderBottom: `1px solid #666`,
    ':hover': {
      cursor: 'move',
    },
  },
  addToButton: {
    minHeight: '47px',
    height: '-webkit-fill-available',
    borderBottom: '1px solid #777',
    color: '#444 !important',
    letterSpacing: '1px !important',
    fontSize: '12px',
  },
  darkAddButton: {
    borderColor: '#555',
    backgroundColor: '#000',
    color: '#fff',
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
      data,
      destroyDashboardItem,
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
      minH: 2,
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
      logDashboardActionStart,
      logDashboardActionStop,
      nightMode,
      saveLayout,
    } = this.props;

    const validItems = dashboardItems.filter(
      (dashboardItem) => isIdentifierValid(dashboardItem.identifier)
    );

    return (
      <ResponsiveReactGridLayout
        className={css(styles.gridContainer, nightMode && styles.gridNightContainer)}
        cols={{ lg: 8, md: 8, sm: 4, xs: 4, xxs: 2 }}
        compactType={null}
        onDragStart={logDashboardActionStart}
        onDragStop={logDashboardActionStop}
        onResizeStart={logDashboardActionStart}
        onResizeStop={logDashboardActionStop}
        onLayoutChange={(layout, layouts) => saveLayout(layout)}
        rowHeight={64}
      >
        {
          dashboardItems.map(
            (dashboardItem) => this.renderItem(dashboardItem)
          )
        }
      </ResponsiveReactGridLayout>
    );
  }
}

export default DashboardGrid;
