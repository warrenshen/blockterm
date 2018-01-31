// @flow weak

import React, {
  Component,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { isEqual }         from 'underscore';
import numeral             from 'numeral';
import { Link }            from 'react-router-dom';
import {
  calculatePortfolioChange,
  calculatePortfolioDonutData,
  calculatePortfolioTotalValue,
}                               from '../../helpers/portfolio';
import DonutChartWithSelect from '../../components/DonutChartWithSelect'
import El                  from '../../components/El';
import * as STYLES from '../../constants/styles';
import {
  getImageUrl,
} from '../../constants/items.js';

const styles = StyleSheet.create({
  container: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
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
    flex: '1',
    display: 'flex',
    padding: '6px 4px',
    borderBottom: `1px solid ${STYLES.BORDERLIGHT}`,
    lineHeight: '24px',
    justifyContent: 'center',
  },
  darkElement: {
    borderBottom: `1px solid ${STYLES.BORDERDARK}`,
  },
  condensed: {
    lineHeight: '15px',
    paddingBottom: '8px',
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
    overflowY: 'scroll',
    border: `1px solid ${STYLES.BORDERLIGHT}`,
  },
  nightOverflowScroll: {
    border: `1px solid ${STYLES.BORDERDARK}`,
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

class PortfolioItem extends Component
{
  shouldComponentUpdate(nextProps, nextState)
  {
    return !isEqual(this.props.dashboardData, nextProps.dashboardData) ||
           !isEqual(this.props.nightMode, nextProps.nightMode) ||
           !isEqual(this.props.user, nextProps.user) ||
           !isEqual(this.props.value, nextProps.value);
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
        <td className={css(styles.element, nightMode && styles.darkElement, styles.condensed)}>
          <El
            style={styles.bolded}
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
      value,
    } = this.props;

    const {
      id,
      amount,
      token,
    } = tokenUser;

    const {
      shortName,
      imageUrl,
    } = token;

    let attributePrice;
    let attributePercentChange;
    if (value === 'Default' || value === 'USD')
    {
      attributePrice = 'priceUSD';
      attributePercentChange = 'percentChange24h';
    }
    else if (value === 'BTC')
    {
      attributePrice = 'priceBTC';
      attributePercentChange = 'percentChange24hBTC';
    }
    else
    {
      attributePrice = 'priceETH';
      attributePercentChange = 'percentChange24hETH';
    }

    const price = token[attributePrice];
    const percentChange24h = token[attributePercentChange];

    let formattedPrice;
    let formattedValue;
    if (value === 'Default' || value === 'USD')
    {
      formattedPrice = numeral(price).format('$0,0.00');
      formattedValue = numeral(price * amount).format('$0,0.00');
    }
    else if (value === 'BTC')
    {
      formattedPrice = numeral(price).format('0.00000000');
      formattedValue = numeral(price * amount).format('0.00000000');
    }
    else
    {
      formattedPrice = numeral(price).format('0.00000000');
      formattedValue = numeral(price * amount).format('0.00000000');
    }

    return (
      <tr className={css(styles.row)} key={id}>
        <td className={css(styles.element, nightMode && styles.darkElement)}>
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
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement)}>
          <El
            nightMode={nightMode}
            type={'span'}
            style={styles.semibolded}
            nightModeStyle={styles.white}
          >
            {amount}
          </El>
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement)}>
          <El
            nightMode={nightMode}
            nightModeStyle={styles.white}
            type={'span'}
          >
            {formattedPrice}
          </El>
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement)}>
          <El
            nightMode={nightMode}
            nightModeStyle={(percentChange24h < 0) ? styles.redDelta : styles.greenDelta}
            style={(percentChange24h < 0) ? styles.redDelta : styles.greenDelta}
            type={'span'}
          >
            {percentChange24h ? `${numeral(percentChange24h).format('0,0.00')}%` : '0.0'}
          </El>
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement)}>
          <El
            nightMode={nightMode}
            nightModeStyle={styles.white}
            type={'span'}
          >
            {formattedValue}
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
    if (value === 'Default' || value === 'USD')
    {
      attributePrice = 'priceUSD';
      attributePercentChange = 'percentChange24h';
    }
    else if (value === 'BTC')
    {
      attributePrice = 'priceBTC';
      attributePercentChange = 'percentChange24hBTC';
    }
    else
    {
      attributePrice = 'priceETH';
      attributePercentChange = 'percentChange24hETH';
    }

    const data = calculatePortfolioDonutData(tokenUsers, attributePrice, nightMode);
    const totalValue = calculatePortfolioTotalValue(tokenUsers, attributePrice);

    let formattedTotalValue;
    if (value === 'Default' || value === 'USD')
    {
      formattedTotalValue = numeral(totalValue).format('$0,0.00');
    }
    else if (value === 'BTC')
    {
      formattedTotalValue = `${numeral(totalValue).format('0.00000000')} BTC`;
    }
    else
    {
      formattedTotalValue = `${numeral(totalValue).format('0.00000000')} ETH`;
    }

    const percentChange24h = calculatePortfolioChange(tokenUsers, attributePrice, attributePercentChange);
    const formattedPercentChange24h = numeral(percentChange24h).format('0.00%');

    return (
      <div className={css(styles.container)}>
        <div
          className={css(styles.section, styles.bottomEdge, nightMode && styles.darkBottomEdge)}
          style={{ 'height':'296px', 'paddingBottom':'8px', 'textAlign':'center' }}
        >
          <DonutChartWithSelect
            data={data}
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
          <table className={css(styles.table)}>
            <tbody>
              {this.renderHeader()}
              {tokenUsers.map((tokenUser) => this.renderTokenUser(tokenUser))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default PortfolioItem;
