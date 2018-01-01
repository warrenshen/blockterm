// @flow weak

import React, {
  Component,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { isEqual }         from 'underscore';
import {
  Tab,
  TabList,
  TabPanel,
  Tabs,
}                          from 'react-tabs';
import DashboardGrid       from '../components/DashboardGrid';
import * as STYLES         from '../constants/styles';
import FontAwesome         from 'react-fontawesome';

const styles = StyleSheet.create({
  container: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  nightContainer: {
    paddingTop: '4px',
    backgroundColor: STYLES.SOFTGRAY,
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    border: `1px solid ${STYLES.BORDERLIGHT}`,
    borderBottom: `2px solid ${STYLES.BORDERLIGHT}`,
  },
  nightMode: {
    backgroundColor: '#000 !important',
    border: `1px solid ${STYLES.BORDERDARK}`,
    borderBottom: `2px solid ${STYLES.BORDERDARK}`,
  },
  button: {
    width:'100%',
    fontWeight: '500',
    letterSpacing: '1px',
    fontSize: '12px',
    textTransform: 'uppercase',
  },
  placeholder: {
    width: '100%',
    height: '128px',
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
  tabBar: {
    position: 'fixed',
    bottom: '0px',
    zIndex: '1',
    //backgroundColor: 'white',
    //border: '1px solid #666',
    borderBottom: '0px',
    display: 'flex',
    flexDirection: 'row',
  },
  tab: {
    fontWeight: '500',
    borderColor: '#333',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  chosenTab: {
    backgroundColor: STYLES.GOLD,
  },
  tabText: {
    //nothing yet
  },
});

class DashboardTabs extends Component {

  shouldComponentUpdate(nextProps, nextState)
  {
    return !isEqual(this.props.dashboardAction, nextProps.dashboardAction) ||
           !isEqual(this.props.dashboardData, nextProps.dashboardData) ||
           !isEqual(this.props.dashboardPages, nextProps.dashboardPages) ||
           !isEqual(this.props.dashboardItemStates, nextProps.dashboardItemStates) ||
           !isEqual(this.props.nightMode, nextProps.nightMode) ||
           !isEqual(this.props.selectedTab, nextProps.selectedTab);
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

      toggleDashboardItemStatic,
      updateDashboardItem,
    } = this.props;

    const dashboardPage = dashboardPages[selectedTab];

    if (user)
    {
      updateDashboardItem(
        dashboardPage.id,
        id,
        newStatic,
      );
    }
    else
    {
      toggleDashboardItemStatic(id, newStatic);
    }
  }

  // <button className={css(styles.tab)}>
  //   <FontAwesome title="Reset to preset" name='rotate-left'/>
  // </button>
  renderTabList(selectedTab)
  {
    const {
      dashboardPages,
    } = this.props;

    return (
      <div className={css(styles.tabBar)}>
        <TabList>
        {
          dashboardPages.map((dashboardPage) => (
            <Tab key={dashboardPage.index}>
              <button
                className={css(styles.tab, (dashboardPage.index == selectedTab) && styles.chosenTab)}
                title={`Go to ${dashboardPage.name}`}
              >
                {dashboardPage.name}
              </button>
            </Tab>
          ))
        }
        </TabList>
      </div>
    );
  }

  renderTabPanels()
  {
    const {
      dashboardAction,
      dashboardData,
      dashboardItemStates,
      dashboardPages,
      nightMode,

      changeDashboardItemState,
      logDashboardActionStart,
      logDashboardActionStop,
      toggleSidebar,
    } = this.props;

    return dashboardPages.map((dashboardPage) => {
      const dashboardItems = dashboardPage.dashboardItems;
      return (
        <TabPanel key={dashboardPage.index}>
          <DashboardGrid
            dashboardAction={dashboardAction}
            dashboardData={dashboardData}
            dashboardItems={dashboardItems}
            dashboardItemStates={dashboardItemStates}
            nightMode={nightMode}

            changeDashboardItemState={changeDashboardItemState}
            logDashboardActionStart={logDashboardActionStart}
            logDashboardActionStop={logDashboardActionStop}
            removeFromLayout={(id) => this.removeFromLayout(id)}
            saveLayout={(layout) => this.saveLayout(layout)}
            toggleSidebar={toggleSidebar}
            updateLayoutItem={(id, staticActive) => this.updateLayoutItem(id, staticActive)}
          />
          <div
            className={css(styles.placeholder, nightMode && styles.nightContainer)}
          >
            <div
              className={css(styles.item, styles.addItem, styles.addToButton, nightMode && styles.nightMode)}
            >
              <button
                title="Press to open up sidebar and add widgets to dashboard"
                className={css(styles.button, nightMode && styles.darkAddButton)}
                onClick={(event) => toggleSidebar()} >
                Add Widget [+]
              </button>
            </div>
          </div>
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
