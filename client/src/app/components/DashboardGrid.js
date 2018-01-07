// @flow weak

import React, {
  Component,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { isEqual }         from 'underscore';
import { Responsive, WidthProvider } from 'react-grid-layout';
import DashboardItem from '../components/DashboardItem';
import { isIdentifierValid } from '../constants/items.js'
import * as STYLES from '../constants/styles';
import FontAwesome                from 'react-fontawesome';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    minHeight: '100%',
  },
  dashboardItem: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    border: `1px solid ${STYLES.BORDERLIGHT}`,
    borderBottom: `2px solid ${STYLES.BORDERLIGHT}`,
    overflow: 'hidden',
  },
  gridContainer: {
    display: 'flex',
    flex: '1',
    backgroundColor: '#ececec',
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
    backgroundColor: STYLES.LIGHTNIGHT,
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
  floatingResizeButton: {
    position: 'absolute',
    bottom:'-2px',
    right:'0px',
    zIndex:'1',
    color: '#333',
    pointerEvents: 'none',
  },
  nightResizeButton: {
    color: '#fff',
  },
  lockedResize: {
    opacity: '0.4',
    pointerEvents: 'none',
  },
});

class DashboardGrid extends Component {

  shouldComponentUpdate(nextProps, nextState)
  {
    return !isEqual(this.props.dashboardAction, nextProps.dashboardAction) ||
           !isEqual(this.props.dashboardData, nextProps.dashboardData) ||
           !isEqual(this.props.dashboardItems, nextProps.dashboardItems) ||
           !isEqual(this.props.dashboardStates, nextProps.dashboardStates) ||
           !isEqual(this.props.nightMode, nextProps.nightMode);
  }

  renderItem(dashboardItem)
  {
    const {
      dashboardAction,
      dashboardData,
      dashboardItemStates,
      nightMode,

      changeDashboardItemState,
      destroyDashboardItem,
      removeFromLayout,
      updateLayoutItem,
    } = this.props;

    const {
      id,
      identifier,
    } = dashboardItem;

    return (
      <div
        className={css(styles.dashboardItem, nightMode && styles.nightMode)}
        key={id}
      >
        <DashboardItem
          changeDashboardItemState={changeDashboardItemState}
          dashboardAction={dashboardAction}
          dashboardData={dashboardData ? dashboardData[identifier] : null}
          dashboardItem={dashboardItem}
          dashboardState={dashboardItemStates[identifier]}
          destroyDashboardItem={destroyDashboardItem}
          nightMode={nightMode}
          removeFromLayout={removeFromLayout}
          staticActive={dashboardItem.static}
          updateLayoutItem={updateLayoutItem}
        />
        <FontAwesome name='caret-up' className={css(styles.floatingResizeButton, nightMode && styles.nightResizeButton, dashboardItem.static && styles.lockedResize)} style={{'transform':'rotate(135deg)'}} />
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

    const configs = validItems.map((dashboardItem) => ({
      i: dashboardItem.id,
      w: dashboardItem.w,
      h: dashboardItem.h,
      x: dashboardItem.x,
      y: dashboardItem.y,
      minW: 2,
      maxW: 9,
      minH: 2,
      // `static` is a reserved word so can't assign it to variable above.
      static: dashboardItem.static,
    }));
    const layouts = {
      lg: configs,
      md: configs,
      sm: configs,
      xs: configs,
      xxs: configs,
    };

    return (
      <ResponsiveReactGridLayout
        className={css(styles.gridContainer, nightMode && styles.gridNightContainer)}
        cols={{ lg: 9, md: 9, sm: 9, xs: 9, xxs: 1 }}
        compactType={'vertical'}
        layouts={layouts}
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
