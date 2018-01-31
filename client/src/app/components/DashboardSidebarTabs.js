// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import FontAwesome         from 'react-fontawesome';
import * as DEFAULTS       from '../constants/styles';
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
    borderBottom: `1px solid ${DEFAULTS.BORDERLIGHT}`
  },
  headerNight: {
    borderBottom: `1px solid ${DEFAULTS.BORDERDARK}`
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
    fontWeight: '500',
    width: '100%',
  },
  buttons: {
    display: 'flex',
  },
  input: {
    fontWeight: '500',
  },
});

class DashboardSidebarTabs extends PureComponent
{
  static propTypes = {
    dashboardPages: PropTypes.array.isRequired,
    nightMode: PropTypes.bool.isRequired,

    updateDashboardPages: PropTypes.func.isRequired,
  };

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

  renderDashboardPage(dashboardPage, nightMode)
  {
    const {
      changeDashboardPageName,
      removeDashboardPage,
    } = this.props;

    const {
      id,
      dashboardItems,
      name,
    } = dashboardPage;

    const onChange = (event) => changeDashboardPageName(id, event.target.value);
    const onClickRemove = (event) => removeDashboardPage(id);

    return (
      <tr key={id}>
        <td>
          <input
            className={css(styles.input)}
            onChange={onChange}
            value={name}
          />
        </td>
        <td>
          <El
            style={DEFAULTS.styles.subtitle}
            nightMode={nightMode}
            type={'span'}
          >
            {dashboardItems.length}
          </El>
        </td>
        <td>
          <button
            className={css(styles.closeButton)}
            onClick={onClickRemove}
          >
            <FontAwesome name='remove' />
          </button>
        </td>
      </tr>
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
          <El
            nightMode={nightMode}
            type={'span'}
          >
            LOGIN or JOIN to add/edit tabs
          </El>
        </div>
      );
    }
    else
    {
      return (
        <div
          className={css(styles.container, nightMode && styles.containerNightMode)}
        >
          <table className={css(styles.list)}>
            <tbody>
              <tr className={css(styles.header, nightMode && styles.headerNight)}>
                <td>
                  <El
                    style={DEFAULTS.styles.subtitle}
                    nightMode={nightMode}
                    type={'span'}
                  >
                    Tab name
                  </El>
                </td>
                <td>
                  <El
                    style={DEFAULTS.styles.subtitle}
                    nightMode={nightMode}
                    type={'span'}
                  >
                    # widgets
                  </El>
                </td>
              </tr>
              {
                dashboardPages.map(
                  (dashboardPage) => this.renderDashboardPage(dashboardPage, nightMode)
                )
              }
            </tbody>
          </table>
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
