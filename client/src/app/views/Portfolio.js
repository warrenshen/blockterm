// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import Select              from 'react-select';
import numeral             from 'numeral';
import {
  calculatePortfolioTotalValue,
  calculatePortfolioDonutData,
}                               from '../helpers/portfolio';
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
    display: 'table',
    width: '100%',
    borderCollapse: 'collapse',
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
    borderBottom: `1px solid ${STYLES.BORDERLIGHT}`,
    lineHeight: '38px',
    flex: '1',
  },
  darkElement: {
    borderBottom: `1px solid ${STYLES.BORDERDARK}`,
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
    marginBottom: '1px',
  },
  flexItem: {
    flex: '1',
  },
  padded: {
    padding: '15px 10px'
  },
  block: {
    display: 'block',
  },
  blockTitle: {
    display: 'block',
    lineHeight: '36px',
  },
  heroTable: {
    backgroundColor: '#fff',
    border: `1px solid ${STYLES.BORDERLIGHT}`,
    display: 'flex',
    flexDirection: 'row',
    flex: '1',
  },
  darkHeroTable: {
    backgroundColor: '#000',
    border: `1px solid ${STYLES.BORDERDARK}`,
  },
  heroColumn: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '10px',
    padding: '5px 5px',
    textAlign: 'center',
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
    border: `1px solid ${STYLES.BORDERLIGHT}`,
    borderBottom: `2px solid ${STYLES.BORDERLIGHT}`,
  },
  darkBlockButton: {
    border: `1px solid ${STYLES.BORDERDARK}`,
    borderBottom: `2px solid ${STYLES.BORDERDARK}`,
  },
  donutBox: {
    margin: '10px 0px 12px 10px',
    backgroundColor: '#fff',
    border: `1px solid ${STYLES.BORDERLIGHT}`,
  },
  darkDonutBox: {
    backgroundColor: '#000',
    border: `1px solid ${STYLES.BORDERDARK}`,
  },
  select: {
    width: '128px',
    zIndex: '1',
    backgroundColor:'white',
    color:'#777',
    borderColor: '#777',
  },
  input: {
    color:'#000',
    borderColor: '#777',
  },
  borderRight: {
    borderRight: `1px solid ${STYLES.BORDERLIGHT}`,
  },
  darkBorderRight: {
    borderRight: `1px solid ${STYLES.BORDERDARK}`,
  }
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
        <td className={css(styles.element, nightMode && styles.darkElement)}>
          <El
            style={styles.semibolded}
            nightMode={nightMode}
            type={'span'}
          >
            Token
          </El>
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement, styles.flexTwo)}>
          <El
            style={styles.semibolded}
            nightMode={nightMode}
            type={'span'}
          >
            Amount Held
          </El>
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement, styles.flexTwo)}>
          <El
            style={styles.semibolded}
            nightMode={nightMode}
            type={'span'}
          >
            Price USD
          </El>
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement, styles.flexTwo)}>
          <El
            style={styles.semibolded}
            nightMode={nightMode}
            type={'span'}
          >
            Change (24h)
          </El>
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement, styles.flexTwo)}>
          <El
            style={styles.semibolded}
            nightMode={nightMode}
            type={'span'}
          >
            Value
          </El>
        </td>
        <td style={{'width':'40px', 'borderBottom': '1px solid #ccc',}}>

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
        <td className={css(styles.element, nightMode && styles.darkElement)}>
          <El
            nightMode={nightMode}
            type={'h4'}
            style={styles.semibolded}
          >
            {shortName}
          </El>
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement, styles.flexTwo)}>
          <input
            className={css(styles.input)}
            onChange={onChange}
            value={amount}
          />
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement, styles.flexTwo)}>
          <El
            nightMode={nightMode}
            type={'span'}
          >
            {priceUSD ? numeral(priceUSD).format('$0,0.00') : ''}
          </El>
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement, styles.flexTwo)}>
          <El
            nightMode={nightMode}
            type={'span'}
            style={(percentChange24h < 0) ? styles.redDelta : styles.greenDelta}
            nightModeStyle={(percentChange24h < 0) ? styles.redDelta : styles.greenDelta}
          >
            {percentChange24h ? `${numeral(percentChange24h).format('0,0.00')}%` : ''}
          </El>
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement, styles.flexTwo)}>
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
          className={css(styles.blockButton, nightMode && styles.darkBlockButton)}
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
      tokenUsers,

      addTokenUser,
    } = this.props;

    if (data.tokensAll)
    {
      const selectedTokenIds = tokenUsers.map(
        (tokenUser) => tokenUser.token.id
      );
      const selectOptions = data.tokensAll.
      filter(
        (token) => !selectedTokenIds.includes(token.id)
      ).map((token) => ({
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
      <div className={css(styles.heroTable, nightMode && styles.darkHeroTable)}>
        <div className={css(styles.heroColumn, styles.borderRight, nightMode && styles.darkBorderRight)}>
          <El
            nightMode={nightMode}
            type={'h4'}
            style={styles.block}
          >
            Portfolio total value:
          </El>
          <El
            nightMode={nightMode}
            type={'h2'}
            style={styles.blockTitle}
          >
             {numeral(calculatePortfolioTotalValue(tokenUsers)).format('$0,0.00')}
          </El>
        </div>
        <div className={css(styles.heroColumn, styles.borderRight, nightMode && styles.darkBorderRight)}>
          <El
            nightMode={nightMode}
            type={'h4'}
            style={styles.block}
          >
            Change in last 24h:
          </El>
          <El
            nightMode={nightMode}
            type={'h2'}
            style={styles.block}
          >
             {numeral(calculatePortfolioTotalValue(tokenUsers)).format('$0,0.00')}
          </El>
        </div>
        <div className={css(styles.heroColumn)}>
          <El
            nightMode={nightMode}
            type={'h4'}
            style={styles.block}
          >
            Change in last 7d:
          </El>
          <El
            nightMode={nightMode}
            type={'h2'}
            style={styles.block}
          >
             {numeral(calculatePortfolioTotalValue(tokenUsers)).format('$0,0.00')}
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

    const data = calculatePortfolioDonutData(tokenUsers, nightMode);

    return (
      <div className={css(styles.wrapper, nightMode && styles.nightMode)}>
        <div className={css(styles.row)}>
          <div className={css(styles.chartElement, styles.flexItem, styles.donutBox, nightMode && styles.darkDonutBox)}>
            <DonutChartWithSelect
              data={data}
              nightMode={nightMode}
              title="Portfolio Distribution:"
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
