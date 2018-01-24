// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import Select              from 'react-select';
import FontAwesome         from 'react-fontawesome';
import * as STYLES         from '../constants/styles';
import {
  ALERT_EXPIRES_IN_SELECT_OPTIONS,
}                          from '../constants/alerts';
import DashboardItemLarge  from '../components/DashboardItemLarge';
import El                  from '../components/El';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    position: 'fixed',
    top: '0px',
    left: '0px',
    zIndex: '3',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(79, 79, 79, 0.95)',
  },
  overlaySide: {
    display: 'flex',
    flexDirection: 'column',
    width: '256px',
  },
  overlaySideHeader: {
    display: 'flex',
  },
  alerts: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
});

class DashboardModal extends PureComponent
{
  renderAlerts()
  {
    const {
      nightMode,
      user,
    } = this.props;

    const onClickSubmit = (event) => {
      event.preventDefault();
      console.log('submit');
    };
    const onSelectChange = (option) => {
      console.log(option);
    };

    return (
      <div>
        {
          user !== null ? [
            <form
              className={css(styles.form)}
              key={'form'}
            >
              <El
                nightMode={nightMode}
                type={'h3'}
              >
                Create price alert
              </El>
              <input
                autoFocus={true}
                className={css(styles.inputField, nightMode && styles.fieldNight)}
                placeholder='Price'
                required='required'
                value={''}
                // onChange={(event) => changeEmail(event.target.value)}
              />
              <Select
                options={ALERT_EXPIRES_IN_SELECT_OPTIONS}
                onChange={onSelectChange}
              />
              <button
                className={css(styles.bolded, styles.submitButton)}
                type='submit'
                onClick={onClickSubmit}
              >
                Create alert
              </button>
            </form>,
            <div
              className={css(styles.alerts)}
              key={'alerts'}
            >
              {user.alerts.map((alert) => (
                <div>
                  Alert
                </div>
              ))}
            </div>
          ] : (
            <El
              nightMode={nightMode}
              type={'h5'}
            >
              LOGIN or JOIN to use alerts
            </El>
          )
        }
      </div>
    );
  }

  render()
  {
    const {
      nightMode,
      user,

      changeModalState,
    } = this.props;

    return (
      <div className={css(styles.container)}>
        <DashboardItemLarge
          nightMode={nightMode}
        />
        <div className={css(styles.overlaySide)}>
          <div className={css(styles.overlaySideHeader)}>
            <button
              onClick={(event) => changeModalState(null)}
            >
              <FontAwesome name='close' className={css(styles.icon)} />
            </button>
          </div>
          {this.renderAlerts()}
        </div>
      </div>
    );
  }
}

export default DashboardModal;

