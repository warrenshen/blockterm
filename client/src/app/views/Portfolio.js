// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import Select              from 'react-select';
import numeral             from 'numeral';
import {
  calculatePortfolioChangeIn24h,
  calculatePortfolioChangeIn7d,
  calculatePortfolioTotalValue,
  calculatePortfolioDonutData,
}                               from '../helpers/portfolio';
import El                  from '../components/El';
import DonutChartWithSelect from '../components/DonutChartWithSelect'
import FontAwesome                from 'react-fontawesome';
import * as STYLES from '../constants/styles';
import {
  getImageUrl,
} from '../constants/items.js';

const styles = StyleSheet.create({
  wrapper: {
    width: '100vw',
    display: 'flex',
    flex: '1',
    paddingBottom: '128px',
    backgroundColor: STYLES.LIGHTBACKGROUNDGRAY,
  },
  nightMode: {
    backgroundColor: STYLES.LIGHTNIGHT,
  },
  body: {
    display: 'flex',
    border: `1px solid ${STYLES.BORDERLIGHT}`,
    flex: '1',
    boxSizing: 'content-box',
    backgroundColor: '#fff',
    flexDirection: 'column',
    padding: '0px 12px 12px 12px'
  },
  bodyNightMode: {
    backgroundColor: '#000',
    border: `1px solid ${STYLES.BORDERDARK}`,
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
  element: {
    flex: '1',
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    borderBottom: `1px solid ${STYLES.BORDERLIGHT}`,
    lineHeight: '38px',
  },
  condensed: {
    lineHeight: '20px',
  },
  darkElement: {
    borderBottom: `1px solid ${STYLES.BORDERDARK}`,
  },
  chartElement: {
    marginBottom: '24px',
    alignSelf: 'flex-start',
    paddingBottom: '10px',
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
    padding: '12px',
    marginBottom: '1px',
  },
  donutChart: {
    width: '300px',
  },
  padded: {
    padding: '10px 10px',
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
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
    display: 'flex',
    border: `1px solid ${STYLES.BORDERLIGHT}`,
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
  },
  blockButton: {
    borderRadius: '0px',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontWeight: '700',
    width: '100%',
  },
  darkBlockButton: {
    color: '#fff',
    backgroundColor: '#000',
    //borderBottom: '2px solid #777',
  },
  blockButtonWrapper: {
    border: `1px solid ${STYLES.BORDERLIGHT}`,
    //borderBottom: `2px solid ${STYLES.BORDERLIGHT}`,
  },
  darkBlockButtonWrapper: {
    border: `1px solid ${STYLES.BORDERDARK}`,
    //borderBottom: `2px solid ${STYLES.BORDERDARK}`,
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
    borderBottom: '1px solid',
  },
  input: {
    width: '36px',
    color:'#000',
    borderColor: '#777',
    fontWeight: '500',
  },
  borderRight: {
    borderRight: `1px solid ${STYLES.BORDERLIGHT}`,
  },
  darkBorderRight: {
    borderRight: `1px solid ${STYLES.BORDERDARK}`,
  },
  fakeElement: {
    width:'28px',
    flex: '0 !important',
  },
  disabled: {
    opacity: '0.5',
    pointerEvents: 'none',
  },
  tokenImage: {
    marginRight: '8px',
  },
  boldedColor: {
    color: STYLES.GOLDINVERSEBLUE,
  },
  nightBoldedColor: {
    color: STYLES.GOLD,
  },
  tableColumn: {
    flex: 3,
    display: 'flex',
    flexDirection: 'column',
    //backgroundColor: '#fff',
  },
  blackTableColumn: {
    //backgroundColor: '#000',
  },
});

class Portfolio extends PureComponent
{
  componentWillReceiveProps(nextProps)
  {
    if (!nextProps.data.loading && nextProps.user === null)
    {
      nextProps.createNotificationError({
        position: 'bc',
        title: 'LOGIN or JOIN to use portfolio.',
      });
      nextProps.history.push('/');
    }
  }

  savePortfolio()
  {
    const {
      tokenUsers,

      createNotificationError,
      createNotificationSuccess,
      updateTokenUsers,
    } = this.props;

    updateTokenUsers(tokenUsers)
    .then(
      () => createNotificationSuccess({ position: 'bc', title: 'Success!' }),
      () => createNotificationError({ position: 'bc', title: 'Failure.' }),
    );
  }

  renderHeader()
  {
    const {
      nightMode,
    } = this.props;

    return (
      <tr className={css(styles.row)}>
        <td className={css(styles.element, styles.condensed, nightMode && styles.darkElement)}>
          <El
            style={styles.semibolded}
            nightMode={nightMode}
            type={'span'}
          >
            Token
          </El>
        </td>
        <td className={css(styles.element, styles.condensed, nightMode && styles.darkElement)}>
          <El
            style={styles.semibolded}
            nightMode={nightMode}
            type={'span'}
          >
            Amount Held
          </El>
        </td>
        <td className={css(styles.element, styles.condensed, nightMode && styles.darkElement)}>
          <El
            style={styles.semibolded}
            nightMode={nightMode}
            type={'span'}
          >
            Price USD
          </El>
        </td>
        <td className={css(styles.element, styles.condensed, nightMode && styles.darkElement)}>
          <El
            style={styles.semibolded}
            nightMode={nightMode}
            type={'span'}
          >
            Change (24h)
          </El>
        </td>
        <td className={css(styles.element, styles.condensed, nightMode && styles.darkElement)}>
          <El
            style={styles.semibolded}
            nightMode={nightMode}
            type={'span'}
          >
            Change (7d)
          </El>
        </td>
        <td className={css(styles.element, styles.condensed, nightMode && styles.darkElement)}>
          <El
            style={styles.semibolded}
            nightMode={nightMode}
            type={'span'}
          >
            Total Value
          </El>
        </td>
        <td className={css(styles.element, styles.condensed, nightMode && styles.darkElement)}>
          <El
            style={styles.semibolded}
            nightMode={nightMode}
            type={'span'}
          >
            % of portfolio
          </El>
        </td>
        <td className={css(styles.element, styles.condensed, styles.fakeElement)}>
        </td>
      </tr>
    );
  }

  renderTokenUser(tokenUser, portfolioTotalValue)
  {
    const {
      nightMode,
      tokenUsers,

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
      imageUrl,
      priceUSD,
      percentChange24h,
      percentChange7d,
    } = token;

    const onChange = (event) => changeTokenUserAmount(id, event.target.value);
    const onClickRemove = (event) => removeTokenUser(id);

    return (
      <tr className={css(styles.row)} key={tokenUser.id}>
        <td className={css(styles.element, nightMode && styles.darkElement)}>
          <img
            className={css(styles.tokenImage)}
            src={getImageUrl(imageUrl)}
            width={32}
            height={32}
          />
          <El
            nightMode={nightMode}
            type={'h4'}
            style={styles.semibolded}
          >
            {shortName}
          </El>
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement)}>
          <input
            className={css(styles.input)}
            onChange={onChange}
            value={amount}
          />
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement)}>
          {priceUSD ?
            <El
              nightMode={nightMode}
              type={'span'}
            >
              {numeral(priceUSD).format('$0,0.00')}
            </El>
          :
            <El
              nightMode={nightMode}
              type={'span'}
              inline={{'lineHeight':'16px'}}
            >
              Save to load price
            </El>
          }
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement)}>
          <El
            nightMode={nightMode}
            type={'span'}
            style={(percentChange24h < 0) ? styles.redDelta : styles.greenDelta}
            nightModeStyle={(percentChange24h < 0) ? styles.redDelta : styles.greenDelta}
          >
            {percentChange24h ? `${numeral(percentChange24h).format('0,0.00')}%` : ''}
          </El>
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement)}>
          <El
            nightMode={nightMode}
            type={'span'}
            style={(percentChange7d < 0) ? styles.redDelta : styles.greenDelta}
            nightModeStyle={(percentChange7d < 0) ? styles.redDelta : styles.greenDelta}
          >
            {percentChange7d ? `${numeral(percentChange7d).format('0,0.00')}%` : ''}
          </El>
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement)}>
          <El
            nightMode={nightMode}
            type={'span'}
          >
            {priceUSD ? numeral(amount * priceUSD).format('$0,0.00') : ''}
          </El>
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement)}>
          <El
            nightMode={nightMode}
            type={'span'}
          >
            {priceUSD ? numeral(amount * priceUSD / portfolioTotalValue).format('0.0%') : ''}
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

    const portfolioTotalValue = calculatePortfolioTotalValue(tokenUsers);

    return (
      <div className={css(styles.body, nightMode && styles.bodyNightMode)}>
        <table className={css(styles.table)}>
          <tbody>
            {this.renderHeader()}
            {tokenUsers.map((tokenUser) => this.renderTokenUser(tokenUser, portfolioTotalValue))}
          </tbody>
        </table>
        {this.renderAdd()}
        <div className={css(styles.blockButtonWrapper, nightMode && styles.darkBlockButtonWrapper, !changeActive && styles.disabled)}>
          <button
            className={css(styles.blockButton, nightMode && styles.darkBlockButton)}
            onClick={(event) => this.savePortfolio()}
          >
            Save
          </button>
        </div>
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

    const portfolioChangeIn24h = calculatePortfolioChangeIn24h(tokenUsers);
    const portfolioChangeIn7d = calculatePortfolioChangeIn7d(tokenUsers);

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
            style={styles.boldedColor}
            nightModeStyle={styles.nightBoldedColor}
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
            style={(portfolioChangeIn24h < 0) ? styles.redDelta : styles.greenDelta}
            nightModeStyle={(portfolioChangeIn24h < 0) ? styles.redDelta : styles.greenDelta}
          >
             {numeral(portfolioChangeIn24h).format('0.00%')}
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
            style={(portfolioChangeIn7d < 0) ? styles.redDelta : styles.greenDelta}
            nightModeStyle={(portfolioChangeIn7d < 0) ? styles.redDelta : styles.greenDelta}
          >
             {numeral(portfolioChangeIn7d).format('0.00%')}
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
        <div className={css(styles.chartElement, styles.donutChart, styles.donutBox, nightMode && styles.darkDonutBox)}>
          <DonutChartWithSelect
            data={data}
            nightMode={nightMode}
            title="Portfolio Distribution:"
          />
        </div>
        <div className={css(styles.tableColumn, styles.blackTableColumn)}>
          <div className={css(styles.padded)}>
            {this.renderHeroTable()}
            {this.renderTokenUsers()}
          </div>
        </div>
      </div>
    );
  }
}

export default Portfolio;
