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
  calculatePortfolioChangeIn24h,
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
    alignItems: 'center',
    padding: '12px',
    borderBottom: `1px solid ${STYLES.BORDERLIGHT}`,
    lineHeight: '18px',
  },
  darkElement: {
    borderBottom: `1px solid ${STYLES.BORDERDARK}`,
  },
  condensed: {
    lineHeight: '15px',
    paddingBottom: '8px',
  },
  bolded: {
    fontWeight: '700',
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
  },
  nightModeButton: {
    borderColor: '#fff',
    color: '#fff !important',
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
    } = token;

    return (
      <tr className={css(styles.row)} key={tokenUser.id}>
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
          >
            {shortName}
          </El>
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement)}>
          <El
            nightMode={nightMode}
            type={'span'}
            style={styles.semibolded}
          >
            {amount}
          </El>
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement)}>
          <El
            nightMode={nightMode}
            type={'span'}
          >
            {priceUSD ? numeral(priceUSD).format('$0,0.00') : ''}
          </El>
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

    const data = calculatePortfolioDonutData(tokenUsers, nightMode);
    const totalValue = numeral(calculatePortfolioTotalValue(tokenUsers)).format('$0,0.00');
    const totalChange24h = numeral(calculatePortfolioChangeIn24h(tokenUsers)).format('0.0%');

    return (
      <div className={css(styles.container)}>
        <div className={css(styles.section, styles.bottomEdge, nightMode && styles.darkBottomEdge)} style={{'height':'296px', 'paddingBottom':'8px', 'textAlign':'center',}}>
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
                Portfolio total value:
              </El>
              <El
                nightMode={nightMode}
                type={'h3'}
              >
                {totalValue}
              </El>
            </div>
            <div>
              <El
                nightMode={nightMode}
                type={'h5'}
              >
                Total change (24h):
              </El>
              <El
                nightMode={nightMode}
                type={'h3'}
              >
                {totalChange24h}
              </El>
            </div>
          </div>
          <Link to={'/portfolio'} className={css(styles.flatButton, nightMode && styles.nightModeButton)}>
            <El
              nightMode={nightMode}
              style={styles.boldedUpper}
              nightModeStyle={styles.nightBoldedUpper}
              type={'span'}>
              Edit
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
