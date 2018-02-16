// @flow weak

import React, {
  Component,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { isEqual }         from 'underscore';
import FontAwesome         from 'react-fontawesome';
import { Link }            from 'react-router-dom';
import {
  Tab,
  TabList,
  TabPanel,
  Tabs,
}                          from 'react-tabs';
import DashboardGrid       from '../components/DashboardGrid';
import * as STYLES         from '../constants/styles';
import MediaQuery          from 'react-responsive';

const styles = StyleSheet.create({
  container: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  nightContainer: {
    backgroundColor: STYLES.SOFTGRAY,
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    border: `1px solid ${STYLES.BORDERLIGHT}`,
    borderBottom: `1px solid ${STYLES.BORDERLIGHT}`,
  },
  nightMode: {
    backgroundColor: '#000 !important',
    border: `1px solid ${STYLES.BORDERDARK}`,
    borderBottom: `1px solid ${STYLES.BORDERDARK}`,
  },
  placeholder: {
    width: '100%',
    height: '64px',
    backgroundColor: STYLES.LIGHTBACKGROUNDGRAY,
  },
  addToButton: {
    letterSpacing: '1px !important',
    fontSize: '12px',
    margin: '10px',
    marginTop: '2px',
    borderColor: '#666',
  },
  darkAddButton: {
    borderColor: '#ccc',
    backgroundColor: '#000',
    color: '#fff',
  },
  bottomBar: {
    display: 'flex',
    position: 'fixed',
    bottom: '0px',
    left: '0px',
    width: '100%',
    height: '36px',
    zIndex: '4',
    borderTop: '1px solid #777',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  bottomBarNight: {
    borderTop: '1px solid #999',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  bottomBarSection: {
    display: 'flex',
    // marginTop: '-1px',
    overflowX: 'hidden',
  },
  bottomBarSectionMiddle: {
    flex: '1',
    overflowX: 'scroll',
    overflowY: 'hidden',
  },
  tabList: {
    display: 'flex',
    flexWrap: 'nowrap',
    marginTop: '-1px',
  },
  tab: {
    height: '100%',
    borderTop: '1px solid #999',
  },
  button: {
    height: '100%',
    padding: '0px 12px',
    backgroundColor: '#fff',
    borderRight: '1px solid #333',
    borderTop: '1px solid #999 !important',
    borderBottom: 'none !important',
    fontWeight: '500',
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    whiteSpace: 'nowrap',
    ':hover': {
      color: '#23527c',
    },
  },
  buttonHighlighted: {
    backgroundColor: STYLES.GOLD,
  },
  buttonBorderLeft: {
    borderLeft: '1px solid #333',
  },
});

class DashboardTabs extends Component {

  shouldComponentUpdate(nextProps, nextState)
  {
    return !isEqual(this.props.alerts, nextProps.alerts) ||
           !isEqual(this.props.currency, nextProps.currency) ||
           !isEqual(this.props.dashboardAction, nextProps.dashboardAction) ||
           !isEqual(this.props.dashboardData, nextProps.dashboardData) ||
           !isEqual(this.props.dashboardPages, nextProps.dashboardPages) ||
           !isEqual(this.props.dashboardItemStates, nextProps.dashboardItemStates) ||
           !isEqual(this.props.isPageLoaded, nextProps.isPageLoaded) ||
           !isEqual(this.props.nightMode, nextProps.nightMode) ||
           !isEqual(this.props.selectedTab, nextProps.selectedTab) ||
           !isEqual(this.props.user, nextProps.user);
  }

  removeFromLayout(id)
  {
    const {
      dashboardPages,
      selectedTab,
      user,

      destroyDashboardItem,
      destroyDashboardItemLocal,
    } = this.props;

    if (user)
    {
      destroyDashboardItem(
        dashboardPages[selectedTab].id,
        id,
      );
    }
    else
    {
      destroyDashboardItemLocal(id);
    }
  }

  saveLayout(layout)
  {
    const {
      dashboardPages,
      selectedTab,
      user,

      saveDashboardItemsLocal,
      updateDashboardItems,
    } = this.props;

    const dashboardItems = dashboardPages[selectedTab].dashboardItems;

    var layoutChanged = false;
    const newDashboardItemsMap = {};
    layout.forEach((dashboardItem) => {
      newDashboardItemsMap[dashboardItem.i] = {
        id: dashboardItem.i,
        w: dashboardItem.w,
        h: dashboardItem.h,
        x: dashboardItem.x,
        y: dashboardItem.y,
        static: dashboardItem.static,
      };
    });

    dashboardItems.forEach((dashboardItem) => {
      const matchItem = newDashboardItemsMap[dashboardItem.id];
      layoutChanged = layoutChanged || dashboardItem.w != matchItem.w;
      layoutChanged = layoutChanged || dashboardItem.h != matchItem.h;
      layoutChanged = layoutChanged || dashboardItem.x != matchItem.x;
      layoutChanged = layoutChanged || dashboardItem.y != matchItem.y;
      layoutChanged = layoutChanged || dashboardItem.static != matchItem.static;
    });

    if (layoutChanged)
    {
      if (user)
      {
        updateDashboardItems(
          dashboardPages[selectedTab].id,
          Object.values(newDashboardItemsMap),
        );
      }
      else
      {
        dashboardItems.map((item) => {
          newDashboardItemsMap[item.id].identifier = item.identifier;
        });
        saveDashboardItemsLocal(Object.values(newDashboardItemsMap));
      }
    }
  }

  updateLayoutItem(id, newStatic)
  {
    const {
      dashboardPages,
      selectedTab,
      user,

      updateDashboardItem,
      updateDashboardItemLocal,
    } = this.props;

    const dashboardPage = dashboardPages[selectedTab];

    if (user)
    {
      updateDashboardItem(
        dashboardPage.id,
        id,
        null,
        newStatic,
      );
    }
    else
    {
      updateDashboardItemLocal(id, null, newStatic);
    }
  }

  renderTabList(selectedTab)
  {
    const {
      dashboardPages,
      nightMode,

      changeSidebarMode,
    } = this.props;

    const onClickEdit = (event) => changeSidebarMode('edit-tabs');
    return (
      <div className={css(styles.bottomBar, nightMode && styles.bottomBarNight)}>
        <div className={css(styles.bottomBarSection)}>
          <button
            className={css(styles.closeButton, styles.button)}
            onClick={onClickEdit}
            title="Click to add/edit dashboard tabs"
          >
            <FontAwesome name='edit'/>
          </button>
        </div>
        <div className={css(styles.bottomBarSection, styles.bottomBarSectionMiddle)}>
          <TabList className={css(styles.tabList)}>
          {
            dashboardPages.map((dashboardPage, index) => (
              <Tab
                className={css(styles.tab, index === 0 && styles.buttonBorderLeft)}
                key={dashboardPage.index}
              >
                <button
                  className={css(styles.button, (dashboardPage.index == selectedTab) && styles.buttonHighlighted)}
                  title={`Switch to ${dashboardPage.name}`}
                >
                  {dashboardPage.name}
                </button>
              </Tab>
            ))
          }
          </TabList>
        </div>
        <MediaQuery query="(min-device-width: 480px)" component='div' className={css(styles.bottomBarSection)} style={{ 'marginRight': '58px' }}>
          <Link to={`/faq`}>
            <button
              title="Click to read FAQ and learn dashboard actions"
              className={css(styles.button, styles.buttonBorderLeft)}>
              Help [?]
            </button>
          </Link>
          <button
            title="Click to add widgets to dashboard"
            className={css(styles.button, styles.buttonHighlighted)}
            onClick={(event) => changeSidebarMode('add')} >
            Add Widget To Dashboard [+]
          </button>
        </MediaQuery>
        <MediaQuery query="(max-device-width: 479px)" component='div' className={css(styles.bottomBarSection)} style={{ 'marginRight': '58px' }}>
          <button
            title="Click to add widgets to dashboard"
            className={css(styles.button, styles.buttonHighlighted)}
            onClick={(event) => changeSidebarMode('add')} >
            Add Widgets
          </button>
        </MediaQuery>
      </div>
    );
  }

  renderTabPanels()
  {
    const {
      alerts,
      currency,
      dashboardAction,
      dashboardData,
      dashboardItemStates,
      dashboardPages,
      isPageLoaded,
      nightMode,
      user,

      changeDashboardItemState,
      changeModalState,
      changeSidebarMode,
      logDashboardActionStart,
      logDashboardActionStop,
    } = this.props;

    return dashboardPages.map((dashboardPage) => {
      const dashboardItems = dashboardPage.dashboardItems;
      return (
        <TabPanel key={dashboardPage.index}>
          <DashboardGrid
            alerts={alerts}
            currency={currency}
            dashboardAction={dashboardAction}
            dashboardData={dashboardData}
            dashboardItems={dashboardItems}
            dashboardItemStates={dashboardItemStates}
            isPageLoaded={isPageLoaded}
            nightMode={nightMode}
            user={user}

            changeDashboardItemState={changeDashboardItemState}
            changeModalState={changeModalState}
            changeSidebarMode={changeSidebarMode}
            logDashboardActionStart={logDashboardActionStart}
            logDashboardActionStop={logDashboardActionStop}
            removeFromLayout={(id) => this.removeFromLayout(id)}
            saveLayout={(layout) => this.saveLayout(layout)}
            updateLayoutItem={(id, staticActive) => this.updateLayoutItem(id, staticActive)}
          />
        </TabPanel>
      );
    });
  }

  render()
  {
    const {
      nightMode,
      selectedTab,

      changeSelectedTab,
    } = this.props;

    return (
      <div className={css(styles.container, nightMode && styles.nightContainer)}>
        <Tabs
          onSelect={(tabIndex) => changeSelectedTab(tabIndex)}
          selectedIndex={selectedTab}
        >
          {this.renderTabList(selectedTab)}
          {this.renderTabPanels()}
        </Tabs>
      </div>
    );
  }
}

export default DashboardTabs;
