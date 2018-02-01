// @flow weak

import React, {
  Component,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { isEqual }         from 'underscore';
import { Responsive, WidthProvider } from 'react-grid-layout';
import FontAwesome                from 'react-fontawesome';
import DashboardItem from '../components/DashboardItem';
import { isIdentifierValid } from '../constants/items.js';
import * as STYLES from '../constants/styles';
import El from '../components/El';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const styles = StyleSheet.create({
  container: {
    flex: '1',
    display: 'flex',
    width: '100%',
    backgroundColor: '#ececec',
  },
  emptyContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '48px 0px',
    backgroundColor: '#ececec',
  },
  nightContainer: {
    backgroundColor: STYLES.SOFTGRAY,
  },
  dashboardItem: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    border: `1px solid ${STYLES.BORDERLIGHT}`,
    overflow: 'hidden',
  },
  nightMode: {
    backgroundColor: '#000 !important',
    border: `1px solid ${STYLES.BORDERDARK}`,
  },
  button: {
    width:'100%',
  },
  placeholder: {
    width: '100%',
    height: '256px',
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
  noWidgets: {
    letterSpacing: '1px',
    fontWeight: '500',
  },
});

class DashboardGrid extends Component
{
  shouldComponentUpdate(nextProps, nextState)
  {
    return !isEqual(this.props.alerts, nextProps.alerts) ||
           !isEqual(this.props.dashboardAction, nextProps.dashboardAction) ||
           !isEqual(this.props.dashboardData, nextProps.dashboardData) ||
           !isEqual(this.props.dashboardItems, nextProps.dashboardItems) ||
           !isEqual(this.props.dashboardItemStates, nextProps.dashboardItemStates) ||
           !isEqual(this.props.isPageLoaded, nextProps.isPageLoaded) ||
           !isEqual(this.props.nightMode, nextProps.nightMode) ||
           !isEqual(this.props.user, nextProps.user);
  }

  renderItem(dashboardItem)
  {
    const {
      alerts,
      dashboardAction,
      dashboardData,
      dashboardItemStates,
      isPageLoaded,
      nightMode,
      user,

      changeDashboardItemState,
      changeModalState,
      changeSidebarMode,
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
        {
          isPageLoaded && (
            <DashboardItem
              alerts={alerts}
              dashboardAction={dashboardAction}
              dashboardData={dashboardData ? dashboardData[identifier] : null}
              dashboardItem={dashboardItem}
              dashboardState={dashboardItemStates[identifier]}
              nightMode={nightMode}
              user={user}

              changeDashboardItemState={changeDashboardItemState}
              changeModalState={changeModalState}
              changeSidebarMode={changeSidebarMode}
              destroyDashboardItem={destroyDashboardItem}
              removeFromLayout={removeFromLayout}
              updateLayoutItem={updateLayoutItem}
            />
          )
        }
        <FontAwesome
          className={css(styles.floatingResizeButton, nightMode && styles.nightResizeButton, dashboardItem.static && styles.lockedResize)}
          name='caret-up'
          style={{'transform':'rotate(135deg)'}}
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

    if (validItems.length > 0)
    {
      return (
        <ResponsiveReactGridLayout
          className={css(styles.container, nightMode && styles.nightContainer)}
          cols={{ lg: 9, md: 9, sm: 9, xs: 9, xxs: 1 }}
          compactType={'vertical'}
          layouts={layouts}
          onDragStart={logDashboardActionStart}
          onDragStop={logDashboardActionStop}
          onResizeStart={logDashboardActionStart}
          onResizeStop={logDashboardActionStop}
          onLayoutChange={(layout, layouts) => saveLayout(layout)}
          rowHeight={64}
          margin={[5, 5]}
        >
          {
            dashboardItems.map(
              (dashboardItem) => this.renderItem(dashboardItem)
            )
          }
        </ResponsiveReactGridLayout>
      );
    }
    else
    {
      return (
        <div className={css(styles.emptyContainer, nightMode && styles.nightContainer)}>
          <El
            style={styles.noWidgets}
            nightMode={nightMode}
            type={'span'}
          >
            No widgets here. Use the action bar below to add some!
          </El>
        </div>
      );
    }
  }
}

export default DashboardGrid;
