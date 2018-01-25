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
  constructor(props)
  {
    super(props);
    this.container = null;
    this.handleEscape = (event) => {
      if (event.key === 'Escape')
      {
        event.preventDefault();
        props.changeModalState(null);
      }
    };
  }

  componentDidMount()
  {
    this.container.addEventListener('keyup', this.handleEscape);
  }

  componentWillUnmount()
  {
    this.container.removeEventListener('keyup', this.handleEscape);
  }

  renderAlert(alert)
  {
    const {
      id,
      identifier,
      expiresAt,
    } = alert;

    return (
      <div key={id}>
        {identifier}
      </div>
    );
  }

  renderAlerts()
  {
    const {
      alerts,
      expiresValue,
      priceValue,
      nightMode,
      user,

      changeExpiresValue,
      changePriceValue,
      createAlert,
    } = this.props;

    const onClickSubmit = (event) => {
      event.preventDefault();
      const identifier = 'BITSTAMP:ETHBTC';
      createAlert(identifier, priceValue);
    };
    const onChangePrice = (event) => changePriceValue(event.target.value);
    const onSelectChange = (option) => changeExpiresValue(option);

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
                value={priceValue}
                onChange={onChangePrice}
              />
              <Select
                clearable={true}
                matchProp={'label'}
                options={ALERT_EXPIRES_IN_SELECT_OPTIONS}
                value={expiresValue ? expiresValue.value : ''}
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
              {alerts.map((alert) => this.renderAlert(alert))}
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
      <div
        className={css(styles.container)}
        ref={(el) => this.container = el}
      >
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

