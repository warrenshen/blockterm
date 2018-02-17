// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Link }            from 'react-router-dom';
import {
  Tab,
  TabList,
  TabPanel,
  Tabs,
}                          from 'react-tabs';
import { Responsive, WidthProvider } from 'react-grid-layout';
import * as STYLES         from '../constants/styles';
import {
  convertIdentifierToTitle,
  isIdentifierValid,
} from '../constants/items.js';
import El from '../components/El';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const styles = StyleSheet.create({
  wrapper: {
    flex: '1',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
  row: {
    width: '100%',
    display: 'flex',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  flexElement: {
    flex:'1',
  },
  container: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
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
  grid: {
    fex: '1',
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: '#fff',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  darkGrid: {
    backgroundColor: '#000',
  },
  element: {
    display: 'flex',
    flexDirection: 'column',
    width: '33.3%',
    height: '512px',
    overflowY: 'auto',
    border: `1px solid ${STYLES.BORDERLIGHT}`,
  },
  elementHeader: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    width: '100%',
    border: '1px solid #000',
    color: '#000',
    borderRadius: '1px',
    padding: '4px 12px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    border: '1px solid #111',
    borderRadius: '1px',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: '1px',
    backgroundColor: '#fff',
  },
  nightModeButton: {
    color: '#fff',
    border: '1px solid #fff',
    backgroundColor: '#000',
  },
  tabBar: {
    position: 'fixed',
    bottom: '0px',
    left: '0px',
    zIndex: '2',
    borderBottom: '0px',
    display: 'flex',
    flexDirection: 'row',
    //boxShadow: '0px -1px 0px rgba(128, 128, 128, 0.5)',
  },
  tab: {
    fontWeight: '700',
    borderColor: '#333',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    backgroundColor: '#fff',
    paddingLeft: '12px',
    paddingRight: '12px',
    borderTop: '0px',
    borderBottom: '0px',
    ':hover': {
      color: '#23527c',
    },
  },
});

class AdminDashboards extends PureComponent
{
  static propTypes = {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,
    // actions:
    // etc:
    nightMode: PropTypes.bool.isRequired,
  };

  componentWillReceiveProps(nextProps)
  {
    if (nextProps.data.error)
    {
      nextProps.history.push('/');
    }
  }

  renderTabList(selectedTab, dashboardPages)
  {
    const {
      nightMode,
    } = this.props;

    return (
      <div className={css(styles.tabBar)}>
        <TabList>
        {
          dashboardPages.map((dashboardPage) => (
            <Tab key={dashboardPage.index}>
              <button
                className={css(styles.tab, nightMode && styles.darkTab, (dashboardPage.index == selectedTab) && styles.chosenTab)}
                title={`Switch to ${dashboardPage.name}`}
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

  renderItem(dashboardItem)
  {
    const {
      nightMode,
    } = this.props;

    const {
      id,
      identifier,
    } = dashboardItem;

    const title = convertIdentifierToTitle(identifier);

    return (
      <div
        className={css(styles.dashboardItem, nightMode && styles.nightMode)}
        key={id}
      >
        <El
          style={styles.widgetTitle}
          nightMode={nightMode}
          type={'h5'}
        >
          {title}
        </El>
      </div>
    );
  }

  renderTabPanels(dashboardPages)
  {
    const {
      nightMode,
    } = this.props;

    return dashboardPages.map((dashboardPage) => {
      const dashboardItems = dashboardPage.dashboardItems;

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
        static: true,
      }));
      const layouts = {
        lg: configs,
        md: configs,
        sm: configs,
        xs: configs,
        xxs: configs,
      };

      return (
        <TabPanel key={dashboardPage.index}>
          <ResponsiveReactGridLayout
            className={css(styles.container, nightMode && styles.nightContainer)}
            cols={{ lg: 9, md: 9, sm: 9, xs: 9, xxs: 1 }}
            compactType={'vertical'}
            layouts={layouts}
            rowHeight={64}
          >
            {
              dashboardItems.map(
                (dashboardItem) => this.renderItem(dashboardItem)
              )
            }
          </ResponsiveReactGridLayout>
        </TabPanel>
      );
    });
  }

  renderUsers(users)
  {
    const {
      nightMode,
    } = this.props;

    if (users.length !== 1)
    {
      return <div>Expected one user</div>;
    }
    else
    {
      const user = users[0];
      const {
        id,
        email,
        dashboardPages,
        lastActiveAt,
      } = user;

      const selectedTab = 0;

      return (
        <div className={css(styles.container, nightMode && styles.nightContainer)}>
          <div className={css(styles.elementHeader)}>
            <El
              nightMode={nightMode}
              type={'span'}
            >
              {`ID: ${id}`}
            </El>
            <El
              nightMode={nightMode}
              type={'span'}
            >
              {`Last active at: ${lastActiveAt}`}
            </El>
            <El
              nightMode={nightMode}
              type={'span'}
            >
              {`Email: ${email.substring(0, 4)}**`}
            </El>
          </div>
          <Tabs
            onSelect={(tabIndex) => changeSelectedTab(tabIndex)}
            selectedIndex={selectedTab}
          >
            {this.renderTabList(selectedTab, dashboardPages)}
            {this.renderTabPanels(dashboardPages)}
          </Tabs>
        </div>
      );
    }
  }

  render()
  {
    const {
      data,
      nightMode,
      match,
    } = this.props;
    const page = match.params.page ? parseInt(match.params.page) : 1;

    return (
      <div className={css(styles.wrapper)}>
        <div className={css(styles.row)} style={{'marginTop':'10px',}}>
          <Link to={`/admin/dashboards/${page - 1}`} className={css(styles.flexElement)}>
            <El
              nightMode={nightMode}
              type={'span'}
              style={styles.button}
              nightModeStyle={styles.nightModeButton}
            >
              Previous
            </El>
          </Link>
          <Link to={`/admin/dashboards/${page + 1}`} className={css(styles.flexElement)}>
            <El
              nightMode={nightMode}
              type={'span'}
              style={styles.button}
              nightModeStyle={styles.nightModeButton}
            >
              Next
            </El>
          </Link>
        </div>
        {
          data.users &&
          this.renderUsers(data.users)
        }
      </div>
    );
  }
}

export default AdminDashboards;
