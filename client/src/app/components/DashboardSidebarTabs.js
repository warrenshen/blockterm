// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import * as STYLES         from '../constants/styles';
import El                  from '../components/El';

const styles = StyleSheet.create({
  container: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
  },
  nightMode: {
  },
  header: {
    display: 'flex',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll',
  },
  blockButton: {
    borderRadius: '0px',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontWeight: '700',
    width: '100%',
  },
  buttons: {
    display: 'flex',
  },
});

class DashboardSidebarTabs extends PureComponent
{
  static propTypes = {
    dashboardPages: PropTypes.array.isRequired,
    nightMode: PropTypes.bool.isRequired,

    updateDashboardPages: PropTypes.func.isRequired,
  };

  renderDashboardPage(dashboardPage)
  {
    const {
      changeDashboardPageName,
    } = this.props;

    const {
      id,
      dashboardItems,
      name,
      nightMode,
    } = dashboardPage;

    const onChange = (event) => changeDashboardPageName(id, event.target.value);

    return (
      <div key={id}>
        <input
          className={css(styles.input)}
          onChange={onChange}
          value={name}
        />
        <El
          nightMode={nightMode}
          type={'span'}
        >
          {dashboardItems.length}
        </El>
      </div>
    );
  }

  saveDashboardPages()
  {
    const {
      dashboardPages,

      createNotificationError,
      createNotificationSuccess,
      updateDashboardPages,
    } = this.props;

    updateDashboardPages(dashboardPages)
    .then(
      () => createNotificationSuccess({ position: 'bc', title: 'Success!' }),
      () => createNotificationError({ position: 'bc', title: 'Failure.' }),
    );
  }

  render()
  {
    const {
      changeActive,
      dashboardPages,
      nightMode,
      user,

      addDashboardPage,
      updateDashboardPages,
    } = this.props;

    const onClickAdd = (event) => addDashboardPage();
    const onClickSave = (event) => this.saveDashboardPages();

    if (user === null)
    {
      return (
        <div
          className={css(styles.container, nightMode && styles.containerNightMode)}
        >
          LOGIN or JOIN to add/edit tabs
        </div>
      );
    }
    else
    {
      return (
        <div
          className={css(styles.container, nightMode && styles.containerNightMode)}
        >
          <div className={css(styles.list)}>
            <div className={css(styles.header)}>
              <El
                nightMode={nightMode}
                type={'span'}
              >
                Tab name
              </El>
              <El
                nightMode={nightMode}
                type={'span'}
              >
                # widgets
              </El>
            </div>
            {dashboardPages.map((dashboardPage) => this.renderDashboardPage(dashboardPage))}
          </div>
          <div className={css(styles.buttons, styles.blockButtonWrapper, nightMode && styles.darkBlockButtonWrapper, !changeActive && styles.disabled)}>
            <button
              className={css(styles.blockButton, nightMode && styles.darkBlockButton)}
              onClick={onClickAdd}
            >
              Add tab
            </button>
            <button
              className={css(styles.blockButton, nightMode && styles.darkBlockButton)}
              onClick={onClickSave}
            >
              Save changes
            </button>
          </div>
        </div>
      );
    }
  }
}

export default DashboardSidebarTabs;
