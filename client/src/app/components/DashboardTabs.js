// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import {
  Tab,
  TabList,
  TabPanel,
  Tabs,
}                          from 'react-tabs';
import DashboardGrid       from '../components/DashboardGrid';
import * as STYLES         from '../constants/styles';

const styles = StyleSheet.create({
  container: {
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
});

class DashboardTabs extends PureComponent {
  render()
  {
    const {
      changeSelectedTab,
      dashboard,
      dashboardAction,
      dashboardItems,
      data,
      logDashboardActionStart,
      logDashboardActionStop,
      nightMode,
      removeFromLayout,
      saveLayout,
      selectedTab,
      toggleSidebar,
    } = this.props;

    return (
      <div className={css(styles.container, nightMode && styles.nightContainer)}>
        <Tabs
          onSelect={(tabIndex) => changeSelectedTab(tabIndex)}
          selectedIndex={selectedTab}
        >
          <TabList>
            <Tab>
              <h2>Tab 1</h2>
            </Tab>
            <Tab>
              <h2>Tab 2</h2>
            </Tab>
          </TabList>
          <TabPanel>
            <DashboardGrid
              dashboard={dashboard}
              dashboardAction={dashboardAction}
              dashboardItems={dashboardItems}
              data={data}
              logDashboardActionStart={logDashboardActionStart}
              logDashboardActionStop={logDashboardActionStop}
              nightMode={nightMode}
              toggleSidebar={toggleSidebar}
              removeFromLayout={removeFromLayout}
              saveLayout={saveLayout}
            />
            <div
              className={css(styles.placeholder, nightMode && styles.nightContainer)}
            >
              <div
                className={css(styles.item, styles.addItem, styles.addToButton, nightMode && styles.nightMode)}
              >
                <button
                  className={css(styles.button, nightMode && styles.darkAddButton)}
                  onClick={(event) => toggleSidebar()} >
                  Add Widget [+]
                </button>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div
              className={css(styles.placeholder, nightMode && styles.gridNightContainer)}
            >
              <div
                className={css(styles.item, styles.addItem, styles.addToButton, nightMode && styles.nightMode)}
              >
                <button
                  className={css(styles.button, nightMode && styles.darkAddButton)}
                  onClick={(event) => toggleSidebar()} >
                  Add Widget [+]
                </button>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default DashboardTabs;
