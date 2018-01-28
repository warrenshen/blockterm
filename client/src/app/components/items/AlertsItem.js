// @flow weak

import React, {
  Component,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { isEqual }         from 'underscore';
import {
  parseAlertIdentifier,
}                          from '../../constants/alerts';
import * as STYLES         from '../../constants/styles';
import El                  from '../../components/El';

const styles = StyleSheet.create({
  container: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '5px 5px',
  },
});

class AlertsItem extends Component
{
  shouldComponentUpdate(nextProps, nextState)
  {
    return !isEqual(this.props.alerts, nextProps.alerts) ||
           !isEqual(this.props.nightMode, nextProps.nightMode);
  }

  renderHeader()
  {
    const {
      nightMode,
    } = this.props;

    return (
      <tr className={css(styles.row)}>
        <td className={css(styles.element, nightMode && styles.darkElement, styles.condensed)}>
          <El
            style={styles.semibolded}
            nightMode={nightMode}
            type={'span'}
          >
            Token
          </El>
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement, styles.condensed)}>
          <El
            style={styles.semibolded}
            nightMode={nightMode}
            type={'span'}
          >
            Amount Held
          </El>
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement, styles.condensed)}>
          <El
            style={styles.semibolded}
            nightMode={nightMode}
            type={'span'}
          >
            Price USD
          </El>
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement, styles.condensed)}>
          <El
            style={styles.semibolded}
            nightMode={nightMode}
            type={'span'}
          >
            Change (24h)
          </El>
        </td>
      </tr>
    );
  }

  renderAlert(alert)
  {
    const {
      nightMode,
    } = this.props;

    const {
      id,
      identifier,
    } = alert;

    const [market, price, condition] = parseAlertIdentifier(alert.identifier);

    return (
      <tr className={css(styles.row)} key={id}>
        <td className={css(styles.element, nightMode && styles.darkElement)}>
          <El
            nightMode={nightMode}
            type={'span'}
            style={styles.semibolded}
            nightModeStyle={styles.white}
          >
            {market}
          </El>
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement)}>
          <El
            nightMode={nightMode}
            type={'span'}
            style={styles.semibolded}
            nightModeStyle={styles.white}
          >
            {price}
          </El>
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement)}>
          <El
            nightMode={nightMode}
            type={'span'}
            nightModeStyle={styles.white}
          >
            {condition}
          </El>
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement)}>
          <El
            nightMode={nightMode}
            type={'span'}
            nightModeStyle={styles.white}
          >
            {identifier}
          </El>
        </td>
      </tr>
    );
  }

  render()
  {
    const {
      alerts,
      nightMode,
    } = this.props;

    return (
      <div className={css(styles.container)}>
        <div className={css(styles.section, styles.flexItem, styles.overflowScroll, nightMode && styles.nightOverflowScroll)}>
          <table className={css(styles.table)}>
            <tbody>
              {this.renderHeader()}
              {alerts.map((alert) => this.renderAlert(alert))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default AlertsItem;
