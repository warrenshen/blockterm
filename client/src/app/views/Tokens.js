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
import {
  getImageUrl,
} from '../constants/items.js';

const styles = StyleSheet.create({
  wrapper: {
    width: '100vw',
    display: 'flex',
    flex: '1',
    backgroundColor: STYLES.LIGHTBACKGROUNDGRAY,
    gridTemplateColumns: 'repeat(8, 1fr)',
  },
  nightMode: {
    backgroundColor: STYLES.LIGHTNIGHT,
  },
  mainContent: {
    //width: '80vw',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
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
    borderTop: `1px solid ${STYLES.BORDERLIGHT}`,
    boxSizing: 'content-box',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
    paddingLeft: '10px',
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
    //marginRight: '8px',
  },
  thickElement: {
    lineHeight: '38px',
  },
  element: {
    padding: '12px 0px',
    borderBottom: `1px solid ${STYLES.BORDERLIGHT}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkElement: {
    borderBottom: `1px solid ${STYLES.BORDERDARK}`,
  },
  semibolded: {
    fontWeight: '500',
  },
  semiboldedLink: {
    textDecoration:'underline',
    fontWeight:'500',
    fontSize: '15px',
  },
  bolded: {
    fontWeight: '700',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    display: 'table',
  },
  row: {
    width: '100%',
    display: 'flex',
  },
  flexXS: {
    flex: '1',
  },
  flexS: {
    flex: '2',
  },
  flexM: {
    flex: '3',
  },
  flexL: {
    flex: '4',
  },
  redDelta: {
    color: `${STYLES.TICKER_RED} !important`,
    fontWeight: '500',
    lineHeight: '56px',
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
  },
  greenDelta: {
    color: `${STYLES.TICKER_GREEN} !important`,
    fontWeight: '500',
    lineHeight: '56px',
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
  },
  paginationButtons: {
    padding: '2px 8px',
    marginRight: '10px',
    border: `1px solid ${STYLES.BORDERLIGHT}`,
    //borderBottom: `2px solid ${STYLES.BORDERLIGHT}`,
    borderRadius: '1px',
  },
  centered: {
    textAlign: 'center',
  },
  noPadding: {
    padding: '0px',
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
        <td className={css(styles.element, nightMode && styles.darkElement, styles.flexXS)}>
          <El
            style={styles.bolded}
            nightMode={nightMode}
            type={'span'}
          >
            #
          </El>
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement, styles.flexS)}>
          <El
            style={styles.bolded}
            nightMode={nightMode}
            type={'span'}
          >
            Symbol
          </El>
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement, styles.flexM)}>
          <El
            style={styles.bolded}
            nightMode={nightMode}
            type={'span'}
          >
            Name
          </El>
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement, styles.flexM)}>
          <El
            style={styles.bolded}
            nightMode={nightMode}
            type={'span'}
          >
            Price
          </El>
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement, styles.flexL)}>
          <El
            style={styles.bolded}
            nightMode={nightMode}
            type={'span'}
          >
            Trade Volume (24h)
          </El>
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement, styles.flexL)}>
          <El
            style={styles.bolded}
            nightMode={nightMode}
            type={'span'}
          >
            Market Cap
          </El>
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement, styles.flexM)}>
          <El
            style={styles.bolded}
            nightMode={nightMode}
            type={'span'}
          >
            Circulating Supply
          </El>
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement, styles.flexM, styles.centered)}>
          <El
            style={styles.bolded}
            nightMode={nightMode}
            type={'span'}
          >
            Change (1h)
          </El>
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement, styles.flexM, styles.centered)}>
          <El
            style={styles.bolded}
            nightMode={nightMode}
            type={'span'}
          >
            Change (24h)
          </El>
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement, styles.flexM, styles.centered)}>
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

    let generatedBackground1h = {
        fontWeight: '500', lineHeight: '62px', width: '100%', height: '100%',
        color: (percentChange1h < 0) ? 'rgb(255, 0, 0)' : `rgb(0, ${255 - (nightMode ? 0 : 90)}, 0)`,
        backgroundColor: (percentChange1h < 0) ? `rgba(255,0,0,${Math.min(percentChange1h/-100, 0.5)})` : `rgba(0,255,0,${Math.min(percentChange1h/100, 0.5)})`,
    };
    let generatedBackground24h = {
        fontWeight: '500', lineHeight: '62px', width: '100%', height: '100%',
        color: (percentChange24h < 0) ? 'rgb(255, 0, 0)' : `rgb(0, ${255 - (nightMode ? 0 : 90)}, 0)`,
        backgroundColor: (percentChange24h < 0) ? `rgba(255,0,0,${Math.min(percentChange24h/-100, 0.5)})` : `rgba(0,255,0,${Math.min(percentChange24h/100, 0.5)})`,
    };
    let generatedBackground7d = {
        fontWeight: '500', lineHeight: '62px', width: '100%', height: '100%',
        color: (percentChange7d < 0) ? 'rgb(255, 0, 0)' : `rgb(0, ${255 - (nightMode ? 0 : 90)}, 0)`,
        backgroundColor: (percentChange7d < 0) ? `rgba(255,0,0,${Math.min(percentChange7d/-100, 0.5)})` : `rgba(0,255,0,${Math.min(percentChange7d/100, 0.5)})`,
    };

    return (
      <tr className={css(styles.row)} key={id}>
        <td className={css(styles.element, nightMode && styles.darkElement, styles.thickElement, styles.flexXS)}>
          <El
            nightMode={nightMode}
            type={'span'}
          >
            {index + 1}
          </El>
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement, styles.thickElement, styles.flexS)}>
          <img
            className={css(styles.image)}
            src={getImageUrl(imageUrl)}
            width={32}
            height={32}
          />
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement, styles.thickElement, styles.flexM)}>
          <Link to={`/token/${shortName}`}>
            <El
              nightMode={nightMode}
              type={'span'}
              style={styles.semiboldedLink}
            >
              {longName}
            </El>
          </Link>
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement, styles.thickElement, styles.flexM)}>
          <El
              nightMode={nightMode}
              type={'span'}
          >
            {numeral(priceUSD).format('$0,0.00')}
          </El>
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement, styles.thickElement, styles.flexL)}>
          <El
              nightMode={nightMode}
              type={'span'}
              style={styles.semibolded}
          >
            {numeral(volumeUSD24h).format('$0,0')}
          </El>
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement, styles.thickElement, styles.flexL)}>
          <El
              nightMode={nightMode}
              type={'span'}
          >
            {numeral(marketCapUSD).format('$0,0')}
          </El>
        </td>
        <td className={css(styles.element, nightMode && styles.darkElement, styles.thickElement, styles.flexM)}>
          <El
              nightMode={nightMode}
              type={'span'}
          >
            {numeral(availableSupply).format('0,0')}
          </El>
        </td>
        <td className={css(styles.element, styles.noPadding, nightMode && styles.darkElement, styles.thickElement, styles.flexM, styles.centered)}>
          <span
            style={generatedBackground1h}
          >
            {numeral(percentChange1h).format('0,0.00')}%
          </span>
        </td>
        <td className={css(styles.element, styles.noPadding, nightMode && styles.darkElement, styles.thickElement, styles.flexM, styles.centered)}>
          <span
            style={generatedBackground24h}
          >
            {numeral(percentChange24h).format('0,0.00')}%
          </span>
        </td>
        <td className={css(styles.element, styles.noPadding, nightMode && styles.darkElement, styles.thickElement, styles.flexM, styles.centered)}>
          <span
            style={generatedBackground7d}
          >
            {numeral(percentChange7d).format('0,0.00')}%
          </span>
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
        <ul style={{'marginTop':'10px',}}>
          {[1, 2, 3, 4].map((page) => (
            <Link key={page} className={css(styles.paginationButtons)} to={`/tokens/${page}`}>
              <El
                nightMode={nightMode}
                style={styles.semibolded}
                type={'span'}
              >
                {page}
              </El>
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
              Price, Volume, Market Cap per Coin, sorted by Volume
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
