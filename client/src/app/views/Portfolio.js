// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { withRouter }      from 'react-router-dom'
import Select              from 'react-select';
import numeral             from 'numeral';
import El                  from '../components/El';
import DonutChartWithSelect from '../components/DonutChartWithSelect'

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
  addRow: {
    display: 'flex',
  },
  select: {
    width: '128px',
  },
});

const emptyDonut = {
  labels: [
    'N/A',
  ],
  datasets: [{
    data: [1],
    backgroundColor: [
      '#ccc',
    ],
  }]
};

class Portfolio extends PureComponent
{
  componentWillReceiveProps(nextProps)
  {
    if (!nextProps.data.loading && nextProps.data.user === null)
    {
      nextProps.history.push('/');
    }
  }

  calculateDistribution(tokenUsers) {
    //console.log(tokenUsers);
    if (tokenUsers.length <= 0) return emptyDonut;

    var total = tokenUsers.reduce((elem, accum) => accum + (elem.amount * elem.token.priceUSD));
    var distribution = tokenUsers.map((elem) => (elem.amount * elem.token.priceUSD)/total);
    
    return ({
      labels: [
        'Red',
        'Green',
        'Yellow'
      ],
      datasets: [{
        data: [1, 1, 1],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ]
      }],
    });
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

    const onChange = (event) => changeTokenUserAmount(id, event.target.value);
    const onClickRemove = (event) => removeTokenUser(id);

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
        <td className={css(styles.element)}>
          <button
            onClick={onClickRemove}
          >
            x
          </button>
        </td>
      </tr>
    );
  }

  renderTokenUsers()
  {
    const {
      changeActive,
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
        {this.renderAdd()}
        <button
          disabled={!changeActive}
          onClick={(event) => this.savePortfolio()}
        >
          Save
        </button>
      </div>
    );
  }

  renderAdd()
  {
    const {
      data,
      nightMode,

      addTokenUser,
    } = this.props;

    if (data.tokensAll)
    {
      const selectOptions = data.tokensAll.map((token) => ({
        label: token.shortName,
        value: token,
      }));
      return (
        <div className={css(styles.addRow)}>
          <Select
            className={css(styles.select)}
            clearable={false}
            options={selectOptions}
            searchable={true}
            onChange={(option) => addTokenUser(option.value)}
          />
        </div>
      );
    }
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
          <DonutChartWithSelect
            title="Portfolio Distribution"
            nightMode={nightMode}
            data={this.calculateDistribution(tokenUsers)}
          />
        </div>
        {this.renderTokenUsers()}
      </div>
    );
  }
}

export default Portfolio;
