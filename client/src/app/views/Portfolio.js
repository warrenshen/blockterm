// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { withRouter }      from 'react-router-dom'
import El                  from '../components/El';
import DonutChartWithSelect from '../components/DonutChartWithSelect'
import numeral             from 'numeral';
import * as STYLES from '../constants/styles';

const styles = StyleSheet.create({
  wrapper: {
    width: '100vw',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: STYLES.LIGHTBACKGROUNDGRAY,
  },
  nightMode: {
    backgroundColor: STYLES.LIGHTNIGHT,
  },
  body: {
    display: 'flex',
    borderTop: `1px solid ${STYLES.BORDERLIGHT}`,
    flex: '1',
    boxSizing: 'content-box',
    backgroundColor: '#fff',
    flexDirection: 'column',
    padding: '0px 12px'
  },
  bodyNightMode: {
    backgroundColor: '#000',
    borderTop: `1px solid ${STYLES.BORDERDARK}`,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    display: 'table',
    //backgroundColor: STYLES.SOFTGRAY,
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
    flex: '1',
  },
  chartElement: {
    marginBottom: '24px',
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
});

class Portfolio extends PureComponent
{
  componentWillReceiveProps(nextProps)
  {
    if (!nextProps.data.loading && nextProps.data.user === null)
    {
      nextProps.history.push('/');
    }
  }

  savePortfolio()
  {
    const {
      tokenUsers,

      updateTokenUsers,
    } = this.props;

    updateTokenUsers(tokenUsers);
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

    const onChange = (event) => changeTokenUserAmount(id, event.target.value);

    return (
      <tr className={css(styles.row)} key={tokenUser.id}>
        <td className={css(styles.element)}>
          <El
            nightMode={nightMode}
            type={'span'}
            style={styles.semibolded}
          >
            {shortName}
          </El>
        </td>
        <td className={css(styles.element, styles.flexTwo)}>
          <input
            onChange={onChange}
            value={amount}
          />
        </td>
        <td className={css(styles.element, styles.flexTwo)}>
          <El
            nightMode={nightMode}
            type={'span'}
          >
            {numeral(priceUSD).format('$0,0.00')}
          </El>
        </td>
        <td className={css(styles.element, styles.flexTwo)}>
          <El
            nightMode={nightMode}
            type={'span'}
            style={(percentChange24h < 0) ? styles.redDelta : styles.greenDelta}
            nightModeStyle={(percentChange24h < 0) ? styles.redDelta : styles.greenDelta}
          >
            {numeral(percentChange24h).format('0,0.00')}%
          </El>
        </td>
        <td className={css(styles.element, styles.flexTwo)}>
          <El
            nightMode={nightMode}
            type={'span'}
          >
            {numeral(amount * priceUSD).format('$0,0.00')}
          </El>
        </td>
      </tr>
    );
  }

  renderTokenUsers()
  {
    const {
      nightMode,
      tokenUsers,
    } = this.props;

    return (
      <div className={css(styles.body, nightMode && styles.bodyNightMode)}>
        <table className={css(styles.table)}>
          <tbody>
            {this.renderHeader()}
            {tokenUsers.map((tokenUser) => this.renderTokenUser(tokenUser))}
          </tbody>
        </table>
        <button onClick={(event) => this.savePortfolio()}>
          Save
        </button>
      </div>
    );
  }

  render()
  {
    const {
      nightMode,
      tokenUsers,
    } = this.props;

    return (
      <div className={css(styles.wrapper, nightMode && styles.nightMode)}>
        <div className={css(styles.chartElement)}>
          <DonutChartWithSelect title="Portfolio Distribution" nightMode={nightMode} />
        </div>
        {this.renderTokenUsers()}
      </div>
    );
  }
}

export default Portfolio;
