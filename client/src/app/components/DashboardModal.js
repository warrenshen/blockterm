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
  ALERT_CONDITION_SELECT_OPTIONS,
  ALERT_EXPIRES_IN_SELECT_OPTIONS,
}                          from '../constants/alerts';
import {
  parseIdentifer,
}                          from '../constants/items';
import {
  generateAlertIdentifier,
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
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
  },
  containerNightMode: {
    backgroundColor: 'rgba(23, 23, 23, 0.98)',
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
  static propTypes = {
    alerts: PropTypes.array.isRequired,
    conditionValue: PropTypes.object,
    expiresValue: PropTypes.object,
    priceValue: PropTypes.string.isRequired,
    nightMode: PropTypes.bool.isRequired,
    user: PropTypes.object,

    changeConditionValue: PropTypes.func.isRequired,
    changeExpiresValue: PropTypes.func.isRequired,
    changePriceValue: PropTypes.func.isRequired,
    createAlert: PropTypes.func.isRequired,
  };

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

  createAlert()
  {
    const {
      conditionValue,
      expiresValue,
      priceValue,

      createAlert,
    } = this.props;

    const [identifierKey, identifierValue] = parseIdentifer(this.props.identifier);
    const identifier = generateAlertIdentifier(
      identifierValue,
      priceValue,
      conditionValue.value,
    );

    createAlert(identifier, expiresValue.value);
  }

  renderAlerts()
  {
    const {
      alerts,
      conditionValue,
      expiresValue,
      priceValue,
      nightMode,
      user,

      changeConditionValue,
      changeExpiresValue,
      changePriceValue,
      createNotificationError,
    } = this.props;

    const onClickSubmit = (event) => {
      event.preventDefault();

      if (Notification.permission === 'default' || Notification.permission === 'denied')
      {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted')
          {
            this.createAlert();
          }
          else
          {
            createNotificationError('Alert not created.');
          }
        });
      }
      else
      {
        this.createAlert();
      }
    };

    const onChangePrice = (event) => changePriceValue(event.target.value);
    const onConditionChange = (option) => changeConditionValue(option);
    const onExpiresInChange = (option) => changeExpiresValue(option);

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
                clearable={false}
                matchProp={'label'}
                options={ALERT_CONDITION_SELECT_OPTIONS}
                value={conditionValue ? conditionValue.value : ''}
                onChange={onConditionChange}
              />
              <Select
                clearable={false}
                matchProp={'label'}
                options={ALERT_EXPIRES_IN_SELECT_OPTIONS}
                value={expiresValue ? expiresValue.value : ''}
                onChange={onExpiresInChange}
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
      identifier,
      nightMode,

      changeModalState,
    } = this.props;

    const [identifierKey, identifierValue] = parseIdentifer(identifier);

    return (
      <div
        className={css(styles.container, nightMode && styles.containerNightMode)}
        ref={(el) => this.container = el}
      >
        <DashboardItemLarge
          nightMode={nightMode}
          value={identifierValue}
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

