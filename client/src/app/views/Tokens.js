// @flow weak

import React, {
PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Link }            from 'react-router-dom';
import El from '../components/El';
import Sidebar from '../components/Sidebar';
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
  element: {
    padding: '12px',
    borderBottom: `1px solid #ccc`,
  },
  bolded: {
    fontWeight: '700',
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

          </El>
        </td>
        <td className={css(styles.element)}>
          <El
            style={styles.bolded}
            nightMode={nightMode}
            type={'span'}
          >
            Name
          </El>
        </td>
        <td className={css(styles.element)}>
          <El
            style={styles.bolded}
            nightMode={nightMode}
            type={'span'}
          >
            Price
          </El>
        </td>
        <td className={css(styles.element)}>
          <El
            style={styles.bolded}
            nightMode={nightMode}
            type={'span'}
          >
            Trading Volume (24h)
          </El>
        </td>
        <td className={css(styles.element)}>
          <El
            style={styles.bolded}
            nightMode={nightMode}
            type={'span'}
          >
            Market Cap
          </El>
        </td>
        <td className={css(styles.element)}>
          <El
            style={styles.bolded}
            nightMode={nightMode}
            type={'span'}
          >
            Circulating Supply
          </El>
        </td>
        <td className={css(styles.element)}>
          <El
            style={styles.bolded}
            nightMode={nightMode}
            type={'span'}
          >
            Change (24h)
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
          {
            tokens.map((token, index) => {
              return (
                <tr className={css(styles.row)} key={token.id}>
                  <td className={css(styles.element)}>
                    <El
                      nightMode={nightMode}
                      type={'span'}
                    >
                      {index + 1}
                    </El>
                  </td>
                  <td className={css(styles.element)}>
                    <img className={css(styles.image)} src={token.imageUrl} width={36} height={36}></img>
                  </td>
                  <td className={css(styles.element)}>
                    <Link to={`/token/${token.shortName}`}>
                      <El
                        nightMode={nightMode}
                        type={'span'}
                      >
                        {token.longName}
                      </El>
                    </Link>
                  </td>
                  <td className={css(styles.element)}>
                    <El
                        nightMode={nightMode}
                        type={'span'}
                    >
                      {numeral(token.priceUSD).format('$0,0.00')}
                    </El>
                  </td>
                  <td className={css(styles.element)}>
                    <El
                        nightMode={nightMode}
                        type={'span'}
                    >
                      {numeral(token.volumeUSD24h).format('$0,0')}
                    </El>
                  </td>
                  <td className={css(styles.element)}>
                    <El
                        nightMode={nightMode}
                        type={'span'}
                    >
                      {numeral(token.marketCapUSD).format('$0,0')}
                    </El>
                  </td>
                  <td className={css(styles.element)}>
                    <El
                        nightMode={nightMode}
                        type={'span'}
                    >
                      {numeral(token.availableSupply).format('0,0')}
                    </El>
                  </td>
                  <td className={css(styles.element)}>
                    <El
                        nightMode={nightMode}
                        type={'span'}
                    >
                      {token.percentChange24h}%
                    </El>
                  </td>
                </tr>
              );
            })
          }
          </tbody>
        </table>
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
              type={'h3'}
            >
              Coins
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
