// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
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

class DashboardGrid extends PureComponent
{
  renderItem(dashboardItem)
  {
    const {
      alerts,
      currency,
      dashboardAction,
      dashboardData,
      dashboardItemStates,
      isPageLoaded,
      nightMode,
      portfolioSortBy,
      user,

      changeDashboardItemState,
      changeModalState,
      changePortfolioDashboardSortBy,
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
              currency={currency}
              dashboardAction={dashboardAction}
              dashboardData={dashboardData ? dashboardData[identifier] : null}
              dashboardItem={dashboardItem}
              dashboardState={dashboardItemStates[identifier]}
              nightMode={nightMode}
              portfolioSortBy={portfolioSortBy}
              user={user}

              changeDashboardItemState={changeDashboardItemState}
              changeModalState={changeModalState}
              changePortfolioDashboardSortBy={changePortfolioDashboardSortBy}
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
      maxW: 12,
      minH: 3,
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
          cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 1 }}
          compactType={'vertical'}
          layouts={layouts}
          onDragStart={logDashboardActionStart}
          onDragStop={logDashboardActionStop}
          onResizeStart={logDashboardActionStart}
          onResizeStop={logDashboardActionStop}
          onLayoutChange={(layout, layouts) => saveLayout(layout)}
          rowHeight={64}
          margin={[6, 6]}
          containerPadding={[10, 8]}
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
