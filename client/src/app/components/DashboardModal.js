// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import Select              from 'react-select';
import FontAwesome         from 'react-fontawesome';
import moment              from 'moment';
import * as DEFAULTS       from '../constants/styles';
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
import AccountPerks        from '../components/AccountPerks';
import DashboardItemLarge  from '../components/DashboardItemLarge';
import El                  from '../components/El';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    position: 'fixed',
    top: '65px',
    left: '0px',
    zIndex: '3',
    width: '100%',
    height: '100%',
    paddingBottom: '96px',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  containerNightMode: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
  rightSection: {
    display: 'flex',
    flexDirection: 'column',
    width: '432px',
    borderLeft: '1px solid #999',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottom: `1px solid ${DEFAULTS.BORDERLIGHT}`,
  },
  sectionHeaderNight: {
    backgroundColor: '#000',
    borderBottom: `1px solid ${DEFAULTS.BORDERDARK}`,
  },
  sectionBody: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderBottom: `1px solid ${DEFAULTS.BORDERLIGHT}`,
  },
  sectionBodyNight: {
    backgroundColor: '#000',
    borderBottom: `1px solid ${DEFAULTS.BORDERDARK}`,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  alertsSection: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'scroll',
  },
  alerts: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
  },
  alert: {
    flexDirection: 'column',
    padding: '5px 10px',
    borderBottom: `1px solid ${DEFAULTS.BORDERLIGHT}`,
  },
  alertNight: {
    borderBottom: `1px solid ${DEFAULTS.BORDERDARK}`,
  },
  alertRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  select: {
    marginBottom: '-1px',
  },
  subtitle: {
    padding: '6px',
  },
  inputField: {
    fontWeight: '500',
    letterSpacing: '2px !important',
  },
  padded: {
    padding: '10px 10px',
  },
  expiresText: {
    fontSize: '10px',
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
    this.scrollable = null;
    this.handleEscape = (event) => {
      if (event.key === 'Escape')
      {
        event.preventDefault();
        props.changeModalState(null);
      }
    };
    this.handleWheelWindow = (event) => {
      event.preventDefault();
    };
  }

  componentDidMount()
  {
    window.addEventListener('keyup', this.handleEscape);
    window.addEventListener('wheel', this.handleWheelWindow);
  }

  componentWillUnmount()
  {
    window.removeEventListener('keyup', this.handleEscape);
    window.removeEventListener('wheel', this.handleWheelWindow);
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

    const isSubmitDisabled = !conditionValue || !expiresValue || !priceValue;

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

    if (!isIdentifierExchangeSupported(identifier))
    {
      return (
        <El
          style={styles.padded}
          nightMode={nightMode}
          type={'h5'}
        >
          Price alerts not supported for this exchange yet. Please try markets on Binance or Bittrex.
        </El>
      );
    }
    else if (user === null)
    {
      return (
        <AccountPerks 
          nightMode={nightMode}
        />
      );
    }
    else
    {
      return (
        <form className={css(styles.form)}>
          <input
            autoFocus={true}
            className={css(styles.inputField, nightMode && styles.fieldNight)}
            placeholder='Price'
            required='required'
            value={priceValue}
            onChange={onChangePrice}
          />
          <Select
            className={css(styles.select)}
            clearable={false}
            matchProp={'label'}
            options={ALERT_CONDITION_SELECT_OPTIONS}
            placeholder={'When'}
            value={conditionValue ? conditionValue.value : ''}
            onChange={onConditionChange}
          />
          <Select
            className={css(styles.select)}
            clearable={false}
            matchProp={'label'}
            options={ALERT_EXPIRES_IN_SELECT_OPTIONS}
            placeholder={'Expires in'}
            value={expiresValue ? expiresValue.value : ''}
            onChange={onExpiresInChange}
          />
          <button
            className={css(styles.bolded, DEFAULTS.styles.button, DEFAULTS.styles.emphasize)}
            disabled={isSubmitDisabled}
            type='submit'
            onClick={onClickSubmit}
          >
            Create web alert
          </button>
        </form>
      );
    }
  }

  renderAlert(alert)
  {
    const {
      nightMode,

      createNotificationError,
      createNotificationSuccess,
      updateAlert,
    } = this.props;

    const {
      id,
      identifier,
      expiresAt,
    } = alert;

    const [market, price, condition] = parseAlertIdentifier(identifier);
    const onClickRemove = (event) => {
      updateAlert(alert.id, 'canceled')
        .then((response) => createNotificationSuccess({ position: 'bc', title: 'Alert canceled.' }))
        .catch((error) => createNotificationError({ position: 'bc', title: 'Failure' }));
    };

    return (
      <li
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
            style={styles.expiresText}
            type={'span'}
          >
            {`Expires: ${moment(expiresAt, 'YYYY-M-D H:m:s Z').fromNow()}`}
          </El>
        </div>
        <div className={css(styles.alertRow)}>
          <El
            nightMode={nightMode}
            type={'h5'}
          >
            {`Alert when price ${condition} ${price}`}
          </El>
          <button
            className={css(styles.closeButton)}
            onClick={onClickRemove}
          >
            <FontAwesome name='remove' />
          </button>
        </div>
      </li>
    );
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
        <div
          className={css(styles.alertsSection)}
          ref={(el) => this.scrollable = el}
        >
          <div className={css(styles.sectionHeader, nightMode && styles.sectionHeaderNight)}>
            <El
              nightMode={nightMode}
              style={styles.subtitle}
              type={'h5'}
            >
              Active alerts
            </El>
            <El
              nightMode={nightMode}
              style={styles.subtitle}
              type={'span'}
            >
              {`${validAlerts.length} active`}
            </El>
          </div>
          <ul className={css(styles.alerts)}>
            {validAlerts.map((alert) => this.renderAlert(alert))}
          </ul>
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
      >
        <DashboardItemLarge
          nightMode={nightMode}
          value={identifierValue}
        />
        <div className={css(styles.rightSection)}>
          <div className={css(styles.sectionHeader, nightMode && styles.sectionHeaderNight)}>
            <El
              nightMode={nightMode}
              style={styles.subtitle}
              type={'h5'}
            >
              Create price alert
            </El>
            <button
              onClick={(event) => changeModalState(null)}
            >
              <FontAwesome name='search-minus' className={css(styles.icon)} />
            </button>
          </div>
          <div className={css(styles.sectionBody, nightMode && styles.sectionBodyNight)}>
            {this.renderForm()}
            {this.renderAlerts()}
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardModal;
