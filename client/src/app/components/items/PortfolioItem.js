// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import numeral             from 'numeral';
import { Link }            from 'react-router-dom';
import {
  calculatePortfolioChange,
  calculatePortfolioDonutData,
  calculatePortfolioTotalValue,
}                               from '../../helpers/portfolio';
import * as CURRENCY       from '../../helpers/currency';
import DonutChartWithSelect from '../../components/DonutChartWithSelect'
import El                  from '../../components/El';
import * as STYLES from '../../constants/styles';
import {
  PORTFOLIO_SORT_BY_BALANCE,
  PORTFOLIO_SORT_BY_EXCHANGE,
  PORTFOLIO_SORT_BY_HOLDING,
  PORTFOLIO_SORT_BY_PRICE,
  PORTFOLIO_SORT_BY_TOKEN,
}                           from '../../constants/portfolio';
import {
  getImageUrl,
} from '../../constants/items.js';

const styles = StyleSheet.create({
  container: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minWidth: '0px',
    padding: '5px 5px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  bottomEdge: {
    borderBottom: `1px solid ${STYLES.BORDERLIGHT}`,
  },
  darkBottomEdge: {
    borderBottom: `1px solid ${STYLES.BORDERDARK}`,
  },
  nightMode: {
    backgroundColor: STYLES.LIGHTNIGHT,
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
  },
  row: {
    display: 'flex',
    width: '100%',
    borderBottom: `1px solid ${STYLES.BORDERLIGHT}`,
  },
  headerElement: {
    padding: '8px 0px',
  },
  headerButton: {
    border: 'none',
    backgroundColor: 'inherit',
    outline: '0px',
  },
  headerButtonSelected: {
    backgroundColor: `${STYLES.GOLD}`,
  },
  headerButtonSelectedNightMode: {
    backgroundColor: '#222',
  },
  element: {
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '6px 4px',
  },
  darkElement: {
    borderBottom: `1px solid ${STYLES.BORDERDARK}`,
  },
  bolded: {
    fontWeight: '500',
  },
  semibolded: {
    fontWeight: '500',
  },
  white: {
    color: '#fff',
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
  overflowScroll: {
    overflowY: 'auto',
    borderLeft: `1px solid ${STYLES.BORDERLIGHT}`,
    borderRight: `1px solid ${STYLES.BORDERLIGHT}`,
  },
  nightOverflowScroll: {
    borderLeft: `1px solid ${STYLES.BORDERDARK}`,
    borderRight: `1px solid ${STYLES.BORDERDARK}`,
  },
  flatButton: {
    marginRight: '-12px',
    border: '1px solid #000',
    borderRadius: '1px',
    padding: '4px 8px',
    position: 'absolute',
    bottom: '5px',
    right: '12px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: '#000',
    backgroundColor:'#fff',
  },
  nightModeButton: {
    borderColor: '#fff',
    color: '#fff !important',
    backgroundColor:'#000',
  },
  boldedUpper: {
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  tokenImage: {
    marginRight: '6px',
  },
});

class PortfolioItem extends PureComponent
{
  renderHeader()
  {
    const {
      nightMode,
      portfolioSortBy,
      changePortfolioDashboardSortBy,
    } = this.props;

    const sortBy = portfolioSortBy;
    const onClickBalance = (event) => changePortfolioDashboardSortBy(PORTFOLIO_SORT_BY_BALANCE);
    const onClickExchange = (event) => changePortfolioDashboardSortBy(PORTFOLIO_SORT_BY_EXCHANGE);
    const onClickHolding = (event) => changePortfolioDashboardSortBy(PORTFOLIO_SORT_BY_HOLDING);
    const onClickPrice = (event) => changePortfolioDashboardSortBy(PORTFOLIO_SORT_BY_PRICE);
    const onClickToken = (event) => changePortfolioDashboardSortBy(PORTFOLIO_SORT_BY_TOKEN);

    return (
      <div className={css(styles.row)}>
        <button
          className={css(
            styles.element,
            styles.headerElement,
            styles.headerButton,
            sortBy === PORTFOLIO_SORT_BY_TOKEN && styles.headerButtonSelected,
            sortBy === PORTFOLIO_SORT_BY_TOKEN && nightMode && styles.headerButtonSelectedNightMode,
          )}
          onClick={onClickToken}
        >
          <El
            style={styles.semibolded}
            nightMode={nightMode}
            type={'span'}
          >
            Token
          </El>
          <El
            icon={'sort'}
            nightMode={nightMode}
            type={'span'}
          />
        </button>
        <button
          className={css(
            styles.element,
            styles.headerElement,
            styles.headerButton,
            sortBy === PORTFOLIO_SORT_BY_HOLDING && styles.headerButtonSelected,
            sortBy === PORTFOLIO_SORT_BY_HOLDING && nightMode && styles.headerButtonSelectedNightMode,
          )}
          onClick={onClickHolding}
        >
          <El
            style={styles.semibolded}
            nightMode={nightMode}
            type={'span'}
          >
            Amount
          </El>
          <El
            icon={'sort'}
            nightMode={nightMode}
            type={'span'}
          />
        </button>
        <button
          className={css(
            styles.element,
            styles.headerElement,
            styles.headerButton,
            sortBy === PORTFOLIO_SORT_BY_PRICE && styles.headerButtonSelected,
            sortBy === PORTFOLIO_SORT_BY_PRICE && nightMode && styles.headerButtonSelectedNightMode,
          )}
          onClick={onClickPrice}
        >
          <El
            style={styles.semibolded}
            nightMode={nightMode}
            type={'span'}
          >
            Price
          </El>
          <El
            icon={'sort'}
            nightMode={nightMode}
            type={'span'}
          />
        </button>
        <div
          className={css(
            styles.element,
            styles.headerElement,
          )}
        >
          <El
            style={styles.semibolded}
            nightMode={nightMode}
            type={'span'}
          >
            % (24h)
          </El>
        </div>
        <button
          className={css(
            styles.element,
            styles.headerElement,
            styles.headerButton,
            sortBy === PORTFOLIO_SORT_BY_BALANCE && styles.headerButtonSelected,
            sortBy === PORTFOLIO_SORT_BY_BALANCE && nightMode && styles.headerButtonSelectedNightMode,
          )}
          onClick={onClickBalance}
        >
          <El
            style={styles.bolded}
            nightMode={nightMode}
            type={'span'}
          >
            Balance
          </El>
          <El
            icon={'sort'}
            nightMode={nightMode}
            type={'span'}
          />
        </button>
      </div>
    );
  }

  renderTokenUser(tokenUser)
  {
    const {
      currency,
      nightMode,
      value,
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
    } = token;

    let attributePrice;
    let attributePercentChange;
    if (value === 'BTC')
    {
      attributePrice = 'priceBTC';
      attributePercentChange = 'percentChange24hBTC';
    }
    else if (value === 'ETH')
    {
      attributePrice = 'priceETH';
      attributePercentChange = 'percentChange24hETH';
    }
    else
    {
      attributePrice = 'priceUSD';
      attributePercentChange = 'percentChange24hUSD';
    }

    const price = tokenExchange[attributePrice];
    const percentChange24h = token[attributePercentChange];

    let formattedAmount;
    let formattedPrice;
    let formattedValue;

    if (value === 'BTC')
    {
      formattedAmount = numeral(amount).format('0.0000');
      formattedPrice = numeral(price).format('0.0000');
      formattedValue = numeral(price * amount).format('0.0000');
    }
    else if (value === 'ETH')
    {
      formattedAmount = numeral(amount).format('0.0000');
      formattedPrice = numeral(price).format('0.0000');
      formattedValue = numeral(price * amount).format('0.0000');
    }
    else
    {
      formattedAmount = numeral(amount).format('0.0000');
      formattedPrice = CURRENCY.convertCurrencyToString(price, currency, '$0,0.00');
      formattedValue = CURRENCY.convertCurrencyToString(price * amount, currency, '$0,0.00');
    }

    return (
      <div className={css(styles.row)} key={id}>
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
            nightModeStyle={styles.white}
          >
            {shortName}
          </El>
        </div>
        <div className={css(styles.element, nightMode && styles.darkElement)}>
          <El
            nightMode={nightMode}
            type={'span'}
            style={styles.semibolded}
            nightModeStyle={styles.white}
          >
            {formattedAmount}
          </El>
        </div>
        <div className={css(styles.element, nightMode && styles.darkElement)}>
          <El
            nightMode={nightMode}
            nightModeStyle={styles.white}
            type={'span'}
          >
            {formattedPrice}
          </El>
        </div>
        <div className={css(styles.element, nightMode && styles.darkElement)}>
          <El
            nightMode={nightMode}
            nightModeStyle={(percentChange24h < 0) ? styles.redDelta : styles.greenDelta}
            style={(percentChange24h < 0) ? styles.redDelta : styles.greenDelta}
            type={'span'}
          >
            {percentChange24h ? `${numeral(percentChange24h).format('0,0.00')}%` : '0.0'}
          </El>
        </div>
        <div className={css(styles.element, nightMode && styles.darkElement)}>
          <El
            nightMode={nightMode}
            nightModeStyle={styles.white}
            type={'span'}
          >
            {formattedValue}
          </El>
        </div>
      </div>
    );
  }

  render()
  {
    const {
      currency,
      dashboardData,
      nightMode,
      portfolioSortBy,
      user,
      value,
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

    let attributePrice;
    let attributePercentChange;
    if (value === 'BTC')
    {
      attributePrice = 'priceBTC';
      attributePercentChange = 'percentChange24hBTC';
    }
    else if (value === 'ETH')
    {
      attributePrice = 'priceETH';
      attributePercentChange = 'percentChange24hETH';
    }
    else
    {
      attributePrice = 'priceUSD';
      attributePercentChange = 'percentChange24hUSD';
    }

    const donutData = calculatePortfolioDonutData(tokenUsers, attributePrice, nightMode);
    const totalValue = calculatePortfolioTotalValue(tokenUsers, attributePrice);

    // Tokens that make up at least 0.5% of portfolio OR
    // tokens that are new OR
    // tokens that have an amount of 0.
    // const validTokenUsers = tokenUsers
    //   .filter(
    //     (tokenUser) => {
    //       const value = tokenUser.amount * tokenUser.tokenExchange[attributePrice];
    //       const percent = value / totalValue;
    //       return percent > 0.005 || tokenUser.id.indexOf('t') === 0 || tokenUser.amount === 0;
    //     }
    //   );

    let validTokenUsers = tokenUsers;
    // .filter(
    //   (tokenUser) => {
    //     const value = tokenUser.amount * tokenUser.tokenExchange['priceUSD'];
    //     const percent = value / portfolioTotalValue;
    //     return percent > 0.005 || tokenUser.id.indexOf('t') === 0 || tokenUser.amount === 0;
    //   }
    // );
    const sortBy = portfolioSortBy;
    if (sortBy === PORTFOLIO_SORT_BY_BALANCE)
    {
      validTokenUsers = validTokenUsers.slice(0).sort(
        (tokenUserA, tokenUserB) => {
          const balanceA = tokenUserA.amount * tokenUserA.tokenExchange[attributePrice];
          const balanceB = tokenUserB.amount * tokenUserB.tokenExchange[attributePrice];
          return balanceA < balanceB ? 1 : -1;
        }
      );
    }
    else if (sortBy === PORTFOLIO_SORT_BY_EXCHANGE)
    {
      validTokenUsers = validTokenUsers.slice(0).sort(
        (tokenUserA, tokenUserB) => {
          const exchangeA = tokenUserA.tokenExchange.exchange;
          const exchangeB = tokenUserB.tokenExchange.exchange;
          return exchangeA > exchangeB ? 1 : -1;
        }
      );
    }
    else if (sortBy === PORTFOLIO_SORT_BY_HOLDING)
    {
      validTokenUsers = validTokenUsers.slice(0).sort(
        (tokenUserA, tokenUserB) => {
          const holdingA = tokenUserA.amount;
          const holdingB = tokenUserB.amount;
          return holdingA < holdingB ? 1 : -1;
        }
      );
    }
    else if (sortBy === PORTFOLIO_SORT_BY_PRICE)
    {
      validTokenUsers = validTokenUsers.slice(0).sort(
        (tokenUserA, tokenUserB) => {
          const priceA = tokenUserA.tokenExchange[attributePrice];
          const priceB = tokenUserB.tokenExchange[attributePrice];
          return priceA < priceB ? 1 : -1;
        }
      );
    }
    else if (sortBy === PORTFOLIO_SORT_BY_TOKEN)
    {
      validTokenUsers = validTokenUsers.slice(0).sort(
        (tokenUserA, tokenUserB) => {
          const tokenA = tokenUserA.tokenExchange.token.shortName;
          const tokenB = tokenUserB.tokenExchange.token.shortName;
          return tokenA > tokenB ? 1 : -1;
        }
      );
    }

    let formattedTotalValue;
    if (value === 'BTC')
    {
      formattedTotalValue = `${numeral(totalValue).format('0.00000000')} BTC`;
    }
    else if (value === 'ETH')
    {
      formattedTotalValue = `${numeral(totalValue).format('0.00000000')} ETH`;
    }
    else
    {
      formattedTotalValue = CURRENCY.convertCurrencyToString(totalValue, currency, '$0,0.00');
    }

    const percentChange24h = calculatePortfolioChange(validTokenUsers, attributePrice, attributePercentChange);
    const formattedPercentChange24h = numeral(percentChange24h).format('0.00%');

    return (
      <div className={css(styles.container)}>
        <div
          className={css(styles.section, styles.bottomEdge, nightMode && styles.darkBottomEdge)}
          style={{ 'height':'296px', 'paddingBottom':'8px', 'textAlign':'center' }}
        >
          <DonutChartWithSelect
            data={donutData}
            nightMode={nightMode}
          />
          <div>
            <div>
              <El
                nightMode={nightMode}
                type={'h5'}
              >
                Portfolio total value:&nbsp;
              </El>
              <El
                nightMode={nightMode}
                type={'h3'}
              >
                {formattedTotalValue}
              </El>
            </div>
            <div>
              <El
                nightMode={nightMode}
                type={'h5'}
              >
                Change (24h):&nbsp;
              </El>
              <El
                nightMode={nightMode}
                type={'h3'}
                inline={{'color': (percentChange24h < 0 ? `${STYLES.TICKER_RED}` : `${STYLES.TICKER_GREEN}`)}}
              >
                {formattedPercentChange24h}
              </El>
            </div>
          </div>
          <Link to={user ? '/portfolio' : '/login'} className={css(styles.flatButton, nightMode && styles.nightModeButton)}>
            <El
              nightMode={nightMode}
              style={styles.boldedUpper}
              nightModeStyle={styles.nightBoldedUpper}
              type={'span'}>
              {user ? 'Edit' : 'Login'}
            </El>
          </Link>
        </div>
        <div className={css(styles.section, styles.flexItem, styles.overflowScroll, nightMode && styles.nightOverflowScroll)}>
          <div className={css(styles.table)}>
            {this.renderHeader()}
            {
              validTokenUsers.map(
                (tokenUser) => this.renderTokenUser(tokenUser)
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default PortfolioItem;
