// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import Select              from 'react-select';
import FontAwesome         from 'react-fontawesome';
import moment              from 'moment';
import * as STYLES         from '../constants/styles';
import {
  ALERT_CONDITION_SELECT_OPTIONS,
  ALERT_EXPIRES_IN_SELECT_OPTIONS,
  filterAlertsByItemIdentifier,
  isIdentifierExchangeSupported,
}                          from '../constants/alerts';
import {
  parseIdentifier,
  parseItemIdentifierValue,
}                          from '../constants/items';
import {
  generateAlertIdentifier,
  parseAlertIdentifier,
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
  rightSection: {
    display: 'flex',
    flexDirection: 'column',
    width: '256px',
  },
  sectionHeader: {
    display: 'flex',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  alerts: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
  },
  alert: {
    display: 'flex',
    flexDirection: 'column',
  },
  alertRow: {
    display: 'flex',
    justifyContent: 'space-between',
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
      nightMode,
    } = this.props;

    const {
      id,
      identifier,
      expiresAt,
    } = alert;

    const [market, price, condition] = parseAlertIdentifier(identifier);

    return (
      <div
        className={css(styles.alert)}
        key={id}
      >
        <div className={css(styles.alertRow)}>
          <El
            nightMode={nightMode}
            type={'h5'}
          >
            {market}
          </El>
          <El
            nightMode={nightMode}
            type={'h5'}
          >
            {moment(expiresAt, 'YYYY-M-D H:m:s Z').fromNow()}
          </El>
        </div>
        <div className={css(styles.alertRow)}>
          <El
            nightMode={nightMode}
            type={'h5'}
          >
            {price}
          </El>
          <El
            nightMode={nightMode}
            type={'h5'}
          >
            {condition}
          </El>
        </div>
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
      createNotificationError,
      createNotificationSuccess,
    } = this.props;

    const identifierValue = parseItemIdentifierValue(this.props.identifier);
    const identifier = generateAlertIdentifier(
      identifierValue,
      priceValue,
      conditionValue.value,
    );

    createAlert(identifier, expiresValue.value)
      .then((response) => createNotificationSuccess({ position: 'bc', title: 'Alert created.' }))
      .catch((error) => createNotificationError({ position: 'bc', title: 'Failure.' }));
  }

  renderForm()
  {
    const {
      alerts,
      conditionValue,
      expiresValue,
      identifier,
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

      if (typeof Notification === 'undefined')
      {
        alert('Please us a modern version of Chrome, Firefox, Opera or Safari.');
        return;
      }

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

    // return (
    //   <div>
    //     <El
    //       nightMode={nightMode}
    //       type={'h5'}
    //     >
    //       Price alerts coming soon.
    //     </El>
    //   </div>
    // );
    //

    if (!isIdentifierExchangeSupported(identifier))
    {
      return (
        <El
          nightMode={nightMode}
          type={'h5'}
        >
          {`Price alerts not supported for this exchange yet`}
        </El>
      );
    }
    else if (user === null)
    {
      return (
        <El
          nightMode={nightMode}
          type={'h5'}
        >
          LOGIN or JOIN to use alerts
        </El>
      );
    }
    else
    {
      return (
        <div>
          <form className={css(styles.form)}>
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
          </form>
        </div>
      );
    }
  }

  renderAlerts()
  {
    const {
      alerts,
      identifier,
      nightMode,
      user,
    } = this.props;
    const validAlerts = filterAlertsByItemIdentifier(alerts, identifier);

    if (user !== null)
    {
      return (
        <div className={css(styles.alerts)}>
          {validAlerts.map((alert) => this.renderAlert(alert))}
        </div>
      );
    }
  }

  render()
  {
    const {
      identifier,
      nightMode,

      changeModalState,
    } = this.props;

    const [identifierKey, identifierValue] = parseIdentifier(identifier);

    return (
      <div
        className={css(styles.container, nightMode && styles.containerNightMode)}
        ref={(el) => this.container = el}
      >
        <DashboardItemLarge
          nightMode={nightMode}
          value={identifierValue}
        />
        <div className={css(styles.rightSection)}>
          <div className={css(styles.sectionHeader)}>
            <button
              onClick={(event) => changeModalState(null)}
            >
              <FontAwesome name='close' className={css(styles.icon)} />
            </button>
          </div>
          {this.renderForm()}
          {this.renderAlerts()}
        </div>
      </div>
    );
  }
}

export default DashboardModal;
