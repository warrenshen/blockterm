// @flow weak

import React, {
  Component,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { isEqual }         from 'underscore';
import numeral             from 'numeral';
import {
  calculatePortfolioTotalValue,
  calculatePortfolioDonutData,
}                               from '../../helpers/portfolio';
import DonutChartWithSelect from '../../components/DonutChartWithSelect'
import El                  from '../../components/El';
import * as STYLES from '../../constants/styles';

const styles = StyleSheet.create({
  container: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  nightMode: {
    backgroundColor: STYLES.LIGHTNIGHT,
  },
  table: {
    display: 'table',
    width: '100%',
    borderCollapse: 'collapse',
  },
  row: {
    width: '100%',
    display: 'flex',
  },
  flexTwo: {
    flex: '2',
  },
  element: {
    padding: '12px',
    borderBottom: `1px solid #ccc`,
    lineHeight: '38px',
    flex: '1',
  },
  semibolded: {
    fontWeight: '500',
  },
  redDelta: {
    color: `${STYLES.TICKER_RED} !important`,
    fontWeight: '500',
  },
  greenDelta: {
    color: `${STYLES.TICKER_GREEN} !important`,
    fontWeight: '500',
  },
  flexItem: {
    flex: '1',
  },
});

class PortfolioItem extends Component
{
  shouldComponentUpdate(nextProps, nextState)
  {
    return !isEqual(this.props.dashboardData, nextProps.dashboardData) ||
           !isEqual(this.props.nightMode, nextProps.nightMode);
  }

  renderHeader()
  {
    const {
      nightMode,
    } = this.props;

    return (
      <tr className={css(styles.row)}>
        <td className={css(styles.element)}>
          <El
            style={styles.semibolded}
            nightMode={nightMode}
            type={'span'}
          >
            Token
          </El>
        </td>
        <td className={css(styles.element, styles.flexTwo)}>
          <El
            style={styles.semibolded}
            nightMode={nightMode}
            type={'span'}
          >
            Amount Held
          </El>
        </td>
        <td className={css(styles.element, styles.flexTwo)}>
          <El
            style={styles.semibolded}
            nightMode={nightMode}
            type={'span'}
          >
            Price USD
          </El>
        </td>
        <td className={css(styles.element, styles.flexTwo)}>
          <El
            style={styles.semibolded}
            nightMode={nightMode}
            type={'span'}
          >
            Change (24h)
          </El>
        </td>
        <td className={css(styles.element, styles.flexTwo)}>
          <El
            style={styles.semibolded}
            nightMode={nightMode}
            type={'span'}
          >
            Value
          </El>
        </td>
      </tr>
    );
  }

  renderTokenUser(tokenUser)
  {
    const {
      nightMode,

      changeTokenUserAmount,
      removeTokenUser,
    } = this.props;

    const {
      id,
      amount,
      token,
    } = tokenUser;

    const {
      shortName,
      priceUSD,
      percentChange24h,
    } = token;

    return (
      <tr className={css(styles.row)} key={tokenUser.id}>
        <td className={css(styles.element)}>
          <El
            nightMode={nightMode}
            type={'h4'}
            style={styles.semibolded}
          >
            {shortName}
          </El>
        </td>
        <td className={css(styles.element, styles.flexTwo)}>
          <El
            nightMode={nightMode}
            type={'h4'}
            style={styles.semibolded}
          >
            {amount}
          </El>
        </td>
        <td className={css(styles.element, styles.flexTwo)}>
          <El
            nightMode={nightMode}
            type={'span'}
          >
            {priceUSD ? numeral(priceUSD).format('$0,0.00') : ''}
          </El>
        </td>
        <td className={css(styles.element, styles.flexTwo)}>
          <El
            nightMode={nightMode}
            type={'span'}
            style={(percentChange24h < 0) ? styles.redDelta : styles.greenDelta}
            nightModeStyle={(percentChange24h < 0) ? styles.redDelta : styles.greenDelta}
          >
            {percentChange24h ? `${numeral(percentChange24h).format('0,0.00')}%` : ''}
          </El>
        </td>
        <td className={css(styles.element, styles.flexTwo)}>
          <El
            nightMode={nightMode}
            type={'span'}
          >
            {priceUSD ? numeral(amount * priceUSD).format('$0,0.00') : ''}
          </El>
        </td>
      </tr>
    );
  }

  render()
  {
    const {
      dashboardData,
      nightMode,
    } = this.props;

    let tokenUsers;

    if (dashboardData)
    {
      tokenUsers = dashboardData.tokenUsers;
    }
    else
    {
      tokenUsers = [];
    }

    const data = calculatePortfolioDonutData(tokenUsers);
    const totalValue = numeral(calculatePortfolioTotalValue(tokenUsers)).format('$0,0.00');

    return (
      <div className={css(styles.container)}>
        <DonutChartWithSelect
          data={data}
          height={172}
          nightMode={nightMode}
        />
        <El
          nightMode={nightMode}
          type={'h3'}
        >
          Portfolio total value
        </El>
        <El
          nightMode={nightMode}
          type={'h3'}
        >
          {totalValue}
        </El>
        <table className={css(styles.table)}>
          <tbody>
            {this.renderHeader()}
            {tokenUsers.map((tokenUser) => this.renderTokenUser(tokenUser))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PortfolioItem;
