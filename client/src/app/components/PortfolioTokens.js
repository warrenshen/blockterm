// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import FontAwesome         from 'react-fontawesome';
import Select              from 'react-select';
import numeral             from 'numeral';
import {
  calculatePortfolioTotalValue,
}                           from '../helpers/portfolio';
import * as CURRENCY        from '../helpers/currency';
import El                   from '../components/El';
import * as STYLES          from '../constants/styles';
import {
  getImageUrl,
} from '../constants/items.js';
import {
  disableChartOptions,
  generatePortfolioHistoryChartData,
} from '../helpers/chart';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '0px 12px 12px 12px',
    marginTop: '12px',
    backgroundColor: 'white',
    border: `1px solid ${STYLES.BORDERLIGHT}`,
  },
  containerNightMode: {
    backgroundColor: 'black',
    border: `1px solid ${STYLES.BORDERDARK}`,
  },
  section: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: '12px',
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  row: {
    display: 'flex',
    width: '100%',
    borderBottom: `1px solid ${STYLES.BORDERLIGHT}`,
  },
  rowHeader: {
    paddingBottom: '8px',
  },
  element: {
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: '16px',
  },
  elementDestroy: {
    width: '32px',
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
  closeButton: {
    width: '100%',
    height: '100%',
  },
  button: {
    flex: '1',
    borderRadius: '0px',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontWeight: '700',
    fontSize: '12px',
  },
  buttonNightMode: {
    color: '#fff',
    backgroundColor: '#000',
  },
  select: {
    flex: '1',
    // width: '256px',
    zIndex: '1',
    backgroundColor:'white',
    color:'#777',
    borderColor: '#777',
    borderBottom: '1px solid',
  },
  input: {
    width: '36px',
    margin: '6px 0px',
    color:'#000',
    borderColor: '#777',
    // fontWeight: '500',
  },
  borderRight: {
    borderRight: `1px solid ${STYLES.BORDERLIGHT}`,
  },
  darkBorderRight: {
    borderRight: `1px solid ${STYLES.BORDERDARK}`,
  },
  disabled: {
    opacity: '0.5',
  },
  tokenImage: {
    marginRight: '8px',
  },
});

class PortfolioTokens extends PureComponent
{
  static propTypes = {
    addTokenExchangeId: PropTypes.string,
    addTokenId: PropTypes.string,
    changeActive: PropTypes.bool.isRequired,
    currency: PropTypes.string.isRequired,
    nightMode: PropTypes.bool.isRequired,
    tokenUsers: PropTypes.array.isRequired,

    changeTokenUserAmount: PropTypes.func.isRequired,
    createNotificationError: PropTypes.func.isRequired,
    createNotificationSuccess: PropTypes.func.isRequired,
    removeTokenUser: PropTypes.func.isRequired,
    updateTokenUsers: PropTypes.func.isRequired,
  };

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
      <div className={css(styles.row, styles.rowHeader)}>
        <div className={css(styles.element)}>
          <El
            style={styles.semibolded}
            nightMode={nightMode}
            type={'span'}
          >
            Token
          </El>
        </div>
        <div className={css(styles.element)}>
          <El
            style={styles.semibolded}
            nightMode={nightMode}
            type={'span'}
          >
            Exchange
          </El>
        </div>
        <div className={css(styles.element)}>
          <El
            style={styles.semibolded}
            nightMode={nightMode}
            type={'span'}
          >
            Amount held
          </El>
        </div>
        <div className={css(styles.element)}>
          <El
            style={styles.semibolded}
            nightMode={nightMode}
            type={'span'}
          >
            Price
          </El>
        </div>
        <div className={css(styles.element)}>
          <El
            style={styles.semibolded}
            nightMode={nightMode}
            type={'span'}
          >
            Change (24h)
          </El>
        </div>
        <div className={css(styles.element)}>
          <El
            style={styles.semibolded}
            nightMode={nightMode}
            type={'span'}
          >
            Change (7d)
          </El>
        </div>
        <div className={css(styles.element)}>
          <El
            style={styles.semibolded}
            nightMode={nightMode}
            type={'span'}
          >
            Balance
          </El>
        </div>
        <div className={css(styles.element)}>
          <El
            style={styles.semibolded}
            nightMode={nightMode}
            type={'span'}
          >
            % of portfolio
          </El>
        </div>
        <div className={css(styles.elementDestroy)}>
        </div>
      </div>
    );
  }

  renderTokenUser(tokenUser, portfolioTotalValue)
  {
    const {
      currency,
      nightMode,
      tokenUsers,

      changeTokenUserAmount,
      removeTokenUser,
    } = this.props;

    const {
      id,
      amount,
      tokenExchange,
    } = tokenUser;

    const {
      exchange,
      priceUSD,
      token,
    } = tokenExchange;

    const {
      shortName,
      imageUrl,
      percentChange24h,
      percentChange7d,
    } = token;

    const onChange = (event) => changeTokenUserAmount(id, event.target.value);
    const onClickRemove = (event) => removeTokenUser(id);

    return (
      <div className={css(styles.row)} key={tokenUser.id}>
        <div className={css(styles.element, nightMode && styles.darkElement)}>
          <img
            className={css(styles.tokenImage)}
            src={getImageUrl(imageUrl)}
            width={24}
            height={24}
          />
          <El
            nightMode={nightMode}
            type={'span'}
            style={styles.semibolded}
          >
            {shortName}
          </El>
        </div>
        <div className={css(styles.element, nightMode && styles.darkElement)}>
          <El
            style={styles.semibolded}
            nightMode={nightMode}
            type={'span'}
          >
            {exchange}
          </El>
        </div>
        <div className={css(styles.element, nightMode && styles.darkElement)}>
          <input
            className={css(styles.input)}
            onChange={onChange}
            value={amount}
          />
        </div>
        <div className={css(styles.element, nightMode && styles.darkElement)}>
          {
            priceUSD !== undefined ? (
              <El
                nightMode={nightMode}
                type={'span'}
              >
                {CURRENCY.convertCurrencyToString(priceUSD, currency, '$0,0.00')}
              </El>
            ) : (
              <El
                nightMode={nightMode}
                type={'span'}
                inline={{'lineHeight':'16px'}}
              >
                Save to load price
              </El>
            )
          }
        </div>
        <div className={css(styles.element, nightMode && styles.darkElement)}>
          <El
            nightMode={nightMode}
            type={'span'}
            style={(percentChange24h < 0) ? styles.redDelta : styles.greenDelta}
            nightModeStyle={(percentChange24h < 0) ? styles.redDelta : styles.greenDelta}
          >
            {percentChange24h ? `${numeral(percentChange24h).format('0,0.00')}%` : ''}
          </El>
        </div>
        <div className={css(styles.element, nightMode && styles.darkElement)}>
          <El
            nightMode={nightMode}
            type={'span'}
            style={(percentChange7d < 0) ? styles.redDelta : styles.greenDelta}
            nightModeStyle={(percentChange7d < 0) ? styles.redDelta : styles.greenDelta}
          >
            {percentChange7d ? `${numeral(percentChange7d).format('0,0.00')}%` : ''}
          </El>
        </div>
        <div className={css(styles.element, nightMode && styles.darkElement)}>
          <El
            nightMode={nightMode}
            type={'span'}
          >
            {priceUSD ? CURRENCY.convertCurrencyToString(amount * priceUSD, currency, '$0,0.00') : ''}
          </El>
        </div>
        <div className={css(styles.element, nightMode && styles.darkElement)}>
          <El
            nightMode={nightMode}
            type={'span'}
          >
            {priceUSD ? numeral(amount * priceUSD / portfolioTotalValue).format('0.0%') : ''}
          </El>
        </div>
        <div className={css(styles.elementDestroy)}>
          <button
            className={css(styles.closeButton)}
            onClick={onClickRemove}
          >
            <FontAwesome name='remove' />
          </button>
        </div>
      </div>
    );
  }

  renderAdd()
  {
    const {
      addTokenExchangeId,
      addTokenId,
      nightMode,
      tokenExchangesAll,
      tokensAll,
      tokenUsers,

      addTokenUser,
      changeAddTokenExchangeId,
      changeAddTokenId,
    } = this.props;

    if (tokensAll.length > 0)
    {
      const selectedTokenExchangeIds = tokenUsers.map(
        (tokenUser) => tokenUser.tokenExchange.id
      );
      const EXCHANGE_VALUE_TO_LABEL = {
        binance: 'Binance',
        bittrex: 'Bittrex',
        coinmarketcap: 'Coinmarketcap',
        gdax: 'Coinbase / GDAX',
        kucoin: 'Kucoin',
      };
      const selectOptionsTokens = tokensAll
        .map((token) => ({
          label: `${token.longName} [${token.shortName}]`,
          value: token.id,
        }));
      const selectOptionsExchanges = tokenExchangesAll
        // Return exchanges that have selected token.
        .filter(
          (tokenExchange) => tokenExchange.tokenId === addTokenId
        )
        // Return exchanges that are not already in portfolio.
        .filter(
          (tokenExchange) => !selectedTokenExchangeIds.includes(tokenExchange.id)
        )
        .map(
          (tokenExchange) => ({
            label: EXCHANGE_VALUE_TO_LABEL[tokenExchange.exchange],
            value: tokenExchange.id,
          })
        );

      const isSelectExchangeDisabled = !addTokenId;
      const isSubmitDisabled = !addTokenId || !addTokenExchangeId;
      const onClick = (event) => addTokenUser();
      const onSelectExchange = (option) => changeAddTokenExchangeId(option.value);
      const onSelectToken = (option) => changeAddTokenId(option.value);

      return (
        <div className={css(styles.section)}>
          <Select
            className={css(styles.select)}
            clearable={true}
            placeholder='Select coin'
            matchProp={'label'}
            options={selectOptionsTokens}
            searchable={true}
            value={addTokenId}
            onChange={onSelectToken}
          />
          <Select
            className={css(styles.select)}
            clearable={true}
            disabled={isSelectExchangeDisabled}
            placeholder='Select exchange'
            matchProp={'label'}
            options={selectOptionsExchanges}
            searchable={true}
            value={addTokenExchangeId}
            onChange={onSelectExchange}
          />
          <button
            className={css(styles.button, nightMode && styles.buttonNightMode)}
            disabled={isSubmitDisabled}
            onClick={onClick}
          >
            Add token
          </button>
        </div>
      );
    }
  }

  render()
  {
    const {
      changeActive,
      nightMode,
      tokenUsers,
    } = this.props;

    const portfolioTotalValue = calculatePortfolioTotalValue(tokenUsers, 'priceUSD');
    // Tokens that make up at least 0.5% of portfolio OR
    // tokens that are new OR
    // tokens that have an amount of 0.
    const validTokenUsers = tokenUsers;
      // .filter(
      //   (tokenUser) => {
      //     const value = tokenUser.amount * tokenUser.tokenExchange['priceUSD'];
      //     const percent = value / portfolioTotalValue;
      //     return percent > 0.005 || tokenUser.id.indexOf('t') === 0 || tokenUser.amount === 0;
      //   }
      // );

    return (
      <div className={css(styles.container, nightMode && styles.containerNightMode)}>
        <div className={css(styles.section)}>
          <div className={css(styles.table)}>
            {this.renderHeader()}
            {
              validTokenUsers.map(
                (tokenUser) => this.renderTokenUser(tokenUser, portfolioTotalValue)
              )
            }
          </div>
        </div>
        {this.renderAdd()}
        <div className={css(styles.section)}>
          <button
            className={css(styles.button, nightMode && styles.buttonNightMode)}
            disabled={!changeActive}
            onClick={(event) => this.savePortfolio()}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}

export default PortfolioTokens;
