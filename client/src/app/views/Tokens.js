// @flow weak

import React, {
PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Link }            from 'react-router-dom';
import El                  from '../components/El';
import Sidebar             from '../components/Sidebar';
import numeral             from 'numeral';
import * as STYLES from '../constants/styles';

const styles = StyleSheet.create({
  wrapper: {
    width: '100vw',
    minHeight: '100vh',
    display: 'flex',
    //padding: '0% 15%',
    backgroundColor: STYLES.LIGHTBACKGROUNDGRAY,
    gridTemplateColumns: 'repeat(8, 1fr)',
  },
  nightMode: {
    backgroundColor: STYLES.LIGHTNIGHT,
  },
  mainContent: {
    //width: '80vw',
    width: '100vw',
  },
  sidebar: {
    width: '20vw',
    minWidth: '20vw',
    backgroundColor: STYLES.SOFTGRAY,
  },
  header: {
    display: 'flex',
    padding: '8px 10px',
  },
  body: {
    //left: '-24px',
    borderTop: `1px solid ${STYLES.BORDERLIGHT}`,
    width: '100%',
    padding: '0px 12px 0px',
    boxSizing: 'content-box',
    backgroundColor: '#fff',
    //borderRadius: '6px',
    display: 'flex',
    flexDirection: 'column',
  },
  bodyNightMode: {
    backgroundColor: '#000',
    borderTop: `1px solid ${STYLES.BORDERDARK}`,
  },
  list: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    padding: '10px',
    alignItems: 'center',
    borderBottom: '1px solid #ccc',
    display: 'flex',
    flex: '1',
    flexDirection: 'row',
  },
  image: {
    marginRight: '8px',
  },
  thickElement: {
    lineHeight: '38px',
  },
  element: {
    padding: '12px 0px',
    borderBottom: `1px solid #ccc`,
  },
  semibolded: {
    fontWeight: '500',
  },
  bolded: {
    fontWeight: '700',
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
  flexible: {
    flex: '1',
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

class Tokens extends PureComponent {
  static propTypes= {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,
    // etc:
    nightMode: PropTypes.bool.isRequired,
  };

  renderHeader()
  {
    const {
      nightMode,
    } = this.props;

    return (
      <tr className={css(styles.row)}>
        <td className={css(styles.element)}>
          <El
            style={styles.bolded}
            nightMode={nightMode}
            type={'span'}
          >
            #
          </El>
        </td>
        <td className={css(styles.element)}>
          <El
            style={styles.bolded}
            nightMode={nightMode}
            type={'span'}
          >
            Symbol
          </El>
        </td>
        <td className={css(styles.element, styles.flexible)}>
          <El
            style={styles.bolded}
            nightMode={nightMode}
            type={'span'}
          >
            Name
          </El>
        </td>
        <td className={css(styles.element, styles.flexible)}>
          <El
            style={styles.bolded}
            nightMode={nightMode}
            type={'span'}
          >
            Price
          </El>
        </td>
        <td className={css(styles.element, styles.flexible)}>
          <El
            style={styles.bolded}
            nightMode={nightMode}
            type={'span'}
          >
            Trading Volume (24h)
          </El>
        </td>
        <td className={css(styles.element, styles.flexible)}>
          <El
            style={styles.bolded}
            nightMode={nightMode}
            type={'span'}
          >
            Market Cap
          </El>
        </td>
        <td className={css(styles.element, styles.flexible)}>
          <El
            style={styles.bolded}
            nightMode={nightMode}
            type={'span'}
          >
            Circulating Supply
          </El>
        </td>
        <td className={css(styles.element, styles.flexible)}>
          <El
            style={styles.bolded}
            nightMode={nightMode}
            type={'span'}
          >
            Change (1h)
          </El>
        </td>
        <td className={css(styles.element, styles.flexible)}>
          <El
            style={styles.bolded}
            nightMode={nightMode}
            type={'span'}
          >
            Change (24h)
          </El>
        </td>
        <td className={css(styles.element, styles.flexible)}>
          <El
            style={styles.bolded}
            nightMode={nightMode}
            type={'span'}
          >
            Change (7d)
          </El>
        </td>
      </tr>
    );
  }

  renderToken(token, index)
  {
    const {
      nightMode,
    } = this.props;

    const {
      id,
      shortName,
      longName,
      imageUrl,
      priceUSD,
      priceBTC,
      volumeUSD24h,
      marketCapUSD,
      availableSupply,
      percentChange1h,
      percentChange24h,
      percentChange7d,
    } = token;

    return (
      <tr className={css(styles.row)} key={id}>
        <td className={css(styles.element, styles.thickElement)}>
          <El
            nightMode={nightMode}
            type={'span'}
          >
            {index + 1}
          </El>
        </td>
        <td className={css(styles.element, styles.thickElement)}>
          <img className={css(styles.image)} src={imageUrl} width={40} height={40}></img>
        </td>
        <td className={css(styles.element, styles.thickElement, styles.flexible)}>
          <Link to={`/token/${shortName}`}>
            <El
              nightMode={nightMode}
              type={'span'}
              style={styles.semibolded}
            >
              {longName}
            </El>
          </Link>
        </td>
        <td className={css(styles.element, styles.thickElement, styles.flexible)}>
          <El
              nightMode={nightMode}
              type={'span'}
          >
            {numeral(priceUSD).format('$0,0.00')}
          </El>
        </td>
        <td className={css(styles.element, styles.thickElement, styles.flexible)}>
          <El
              nightMode={nightMode}
              type={'span'}
              style={styles.semibolded}
          >
            {numeral(volumeUSD24h).format('$0,0')}
          </El>
        </td>
        <td className={css(styles.element, styles.thickElement, styles.flexible)}>
          <El
              nightMode={nightMode}
              type={'span'}
          >
            {numeral(marketCapUSD).format('$0,0')}
          </El>
        </td>
        <td className={css(styles.element, styles.thickElement, styles.flexible)}>
          <El
              nightMode={nightMode}
              type={'span'}
          >
            {numeral(availableSupply).format('0,0')}
          </El>
        </td>
        <td className={css(styles.element, styles.thickElement, styles.flexible)}>
          <El
              nightMode={nightMode}
              type={'span'}
              style={(percentChange1h < 0) ? styles.redDelta : styles.greenDelta}
              nightModeStyle={(percentChange1h < 0) ? styles.redDelta : styles.greenDelta}
          >
            {numeral(percentChange1h).format('0,0.00')}%
          </El>
        </td>
        <td className={css(styles.element, styles.thickElement, styles.flexible)}>
          <El
              nightMode={nightMode}
              type={'span'}
              style={(percentChange24h < 0) ? styles.redDelta : styles.greenDelta}
              nightModeStyle={(percentChange24h < 0) ? styles.redDelta : styles.greenDelta}
          >
            {numeral(percentChange24h).format('0,0.00')}%
          </El>
        </td>
        <td className={css(styles.element, styles.thickElement, styles.flexible)}>
          <El
              nightMode={nightMode}
              type={'span'}
              style={(percentChange7d < 0) ? styles.redDelta : styles.greenDelta}
              nightModeStyle={(percentChange7d < 0) ? styles.redDelta : styles.greenDelta}
          >
            {numeral(percentChange7d).format('0,0.00')}%
          </El>
        </td>
      </tr>
    );
  }

  renderTokens(tokens)
  {
    const {
      nightMode,
    } = this.props;

    return (
      <div className={css(styles.body, nightMode && styles.bodyNightMode)}>
        <table className={css(styles.table)}>
          <tbody>
            {this.renderHeader()}
            {tokens.map((token, index) => this.renderToken(token, index))}
          </tbody>
        </table>
        <ul>
          {[1, 2, 3, 4].map((page) => (
            <Link key={page} to={`/tokens/${page}`}>
              {page}
            </Link>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    const {
      data,
      nightMode,
    } = this.props;

    return (
      <div className={css(styles.wrapper, nightMode && styles.nightMode)}>
        <div className={css(styles.mainContent)}>
          <div className={css(styles.header)}>
            <El
              nightMode={nightMode}
              type={'h4'}
            >
              Price, Volume, Market Cap by Coin
            </El>
          </div>
          {
            data.tokensByPage &&
            this.renderTokens(data.tokensByPage)
          }
        </div>
      </div>
    );
  }
}

export default Tokens;
