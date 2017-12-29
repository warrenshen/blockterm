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
  },
  darkAddButton: {
    borderColor: '#555',
    backgroundColor: '#000',
    color: '#fff',
  },
  tabBar: {
    position: 'fixed',
    bottom: '0px',
    zIndex: '1',
    backgroundColor: 'white',
    border: '1px solid #666',
    display: 'flex',
    flexDirection: 'row',
  },
  tab: {
    fontWeight: '500',
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
           !isEqual(this.props.dashboardPagesStates, nextProps.dashboardPagesStates) ||
           !isEqual(this.props.nightMode, nextProps.nightMode) ||
           !isEqual(this.props.selectedTab, nextProps.selectedTab);
  }

  renderTabList()
  {
    return (
      <div className={css(styles.tabBar)}>
        <TabList>
          <Tab className={css(styles.tab)}>
            <button title="Go to tab 1">
              Tab 1
            </button>
          </Tab>
          <Tab className={css(styles.tab)}>
            <button title="Go to tab 2">
              Tab 2
            </button>
          </Tab>
          <Tab className={css(styles.tab)}>
            <button title="Go to tab 3">
              Tab 3
            </button>
          </Tab>
          <Tab className={css(styles.tab)}>
            <button title="Go to tab 4">
              Tab 4
            </button>
          </Tab>
        </TabList>
        <button className={css(styles.tab)}>
          <FontAwesome title="Reset to preset" name='rotate-left'/>
        </button>
      </div>
    );
  }

  renderTabPanels()
  {
    const {
      changeDashboardPageState,
      dashboardAction,
      dashboardData,
      dashboardPages,
      dashboardPagesStates,
      logDashboardActionStart,
      logDashboardActionStop,
      nightMode,
      removeFromLayout,
      saveLayout,
      selectedTab,
      toggleSidebar,
    } = this.props;

    return Object.entries(dashboardPages).map((arr) => {
      const tabIndex = arr[0];
      const dashboardItems = arr[1];
      return (
        <TabPanel key={tabIndex}>
          <DashboardGrid
            changeDashboardPageState={changeDashboardPageState}
            dashboardAction={dashboardAction}
            dashboardData={dashboardData}
            dashboardItems={dashboardItems}
            dashboardStates={dashboardPagesStates[parseInt(tabIndex)]}
            logDashboardActionStart={logDashboardActionStart}
            logDashboardActionStop={logDashboardActionStop}
            nightMode={nightMode}
            removeFromLayout={removeFromLayout}
            saveLayout={saveLayout}
            toggleSidebar={toggleSidebar}
            useCSSTransforms={true}
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
      changeSelectedTab,
      nightMode,
      selectedTab,
    } = this.props;

    return (
      <div className={css(styles.container, nightMode && styles.nightContainer)}>
        <Tabs
          onSelect={(tabIndex) => changeSelectedTab(String(tabIndex))}
          selectedIndex={parseInt(selectedTab)}
        >
          {this.renderTabList()}
          {this.renderTabPanels()}
        </Tabs>
      </div>
    );
  }
}

export default DashboardTabs;
