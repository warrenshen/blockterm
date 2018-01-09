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

import FontAwesome                from 'react-fontawesome';
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
    lineHeight: '38px',
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
    marginLeft: '-1px',
    marginBottom: '1px',
  },
  select: {
    width: '128px',
  },
  flexItem: {
    flex: '1',
  },
  padded: {
    padding: '16px 16px'
  },
  block: {
    display: 'block',
  },
  block_h1: {
    display: 'block',
    lineHeight: '36px',
  },
  heroTable: {
    backgroundColor: '#000',
    padding: '10px 10px',
    border: `1px solid ${STYLES.BORDERLIGHT}`,
    display: 'flex',
    flexDirection: 'row',
    flex: '1',
  },
  column: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
  },
  closeButton: {
    height: '100%',
    //position: 'absolute',
    //right: '0px',
  },
  blockButton: {
    borderRadius: '0px',
    backgroundColor: '#fff',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontWeight: '700',
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

function calculateTotalValue(tokenUsers) {
  return tokenUsers.reduce((accum, elem) => accum + (elem.amount * elem.token.priceUSD), 0);
}

function  calculateDistribution(tokenUsers) {
  if (calculateTotalValue(tokenUsers) <= 0) return emptyDonut;
  var legend = tokenUsers.map(elem => elem.token.shortName);
  var distribution = tokenUsers.map(elem => (elem.amount * elem.token.priceUSD));
  
  return ({
    labels: legend,
    datasets: [{
      data: distribution,
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
      ],
     // hoverBackgroundColor: [],
    }],
  });
}

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
            type={'h4'}
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
        <td>
          <button
            onClick={onClickRemove}
            className={css(styles.closeButton)}
          >
            <FontAwesome name='remove' />
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
          className={css(styles.blockButton)}
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
            placeholder='Add Coin'
            options={selectOptions}
            searchable={true}
            onChange={(option) => addTokenUser(option.value)}
          />
        </div>
      );
    }
  }

  renderHeroTable() {
    const {
      nightMode,
      tokenUsers,
    } = this.props;

    return (
      <div className={css(styles.heroTable)}>
        <div className={css(styles.column)}>
          <El
            nightMode={nightMode}
            type={'h4'}
            style={styles.block}
          >
            Portfolio Value:
          </El>
          <El
            nightMode={nightMode}
            type={'h1'}
            style={styles.block_h1}
          >
             {numeral(calculateTotalValue(tokenUsers)).format('$0,0.00')}
          </El>
        </div>
        <div className={css(styles.column)}>
          <El
            nightMode={nightMode}
            type={'h4'}
            style={styles.block}
          >
            Today's Change:
          </El>
          <El
            nightMode={nightMode}
            type={'h2'}
            style={styles.block}
          >
             {numeral(calculateTotalValue(tokenUsers)).format('$0,0.00')}
          </El>
        </div>
        <div className={css(styles.column)}>
          <El
            nightMode={nightMode}
            type={'h4'}
            style={styles.block}
          >
            Change in last 7 days:
          </El>
          <El
            nightMode={nightMode}
            type={'h2'}
            style={styles.block}
          >
             {numeral(calculateTotalValue(tokenUsers)).format('$0,0.00')}
          </El>
        </div>
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
        <div className={css(styles.row)}>
          <div className={css(styles.chartElement, styles.flexItem)}>
            <DonutChartWithSelect
              title="Portfolio Distribution:"
              nightMode={nightMode}
              data={calculateDistribution(tokenUsers)}
            />
          </div>
          <div className={css(styles.padded)} style={{'flex':'3'}}>
            {this.renderHeroTable()}
          </div>
        </div>
        {this.renderTokenUsers()}
      </div>
    );
  }
}

export default Portfolio;
