// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { withRouter }      from 'react-router-dom'
import El                  from '../components/El';
import * as STYLES from '../constants/styles';

const styles = StyleSheet.create({
  wrapper: {
    width: '100vw',
    minHeight: '100vh',
    display: 'flex',
    backgroundColor: STYLES.LIGHTBACKGROUNDGRAY,
  },
  nightMode: {
    backgroundColor: STYLES.LIGHTNIGHT,
  },
  mainContent: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    display: 'table',
    //backgroundColor: STYLES.SOFTGRAY,
  },
  row: {
    width: '100%',
  },
  element: {
    padding: '12px',
    borderBottom: `1px solid #ccc`,
  },
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
            Token
          </El>
        </td>
        <td className={css(styles.element)}>
          <El
            style={styles.bolded}
            nightMode={nightMode}
            type={'span'}
          >
            Holding amount
          </El>
        </td>
        <td className={css(styles.element)}>
          <El
            style={styles.bolded}
            nightMode={nightMode}
            type={'span'}
          >
            Price USD
          </El>
        </td>
        <td className={css(styles.element)}>
          <El
            style={styles.bolded}
            nightMode={nightMode}
            type={'span'}
          >
            24h change
          </El>
        </td>
        <td className={css(styles.element)}>
          <El
            style={styles.bolded}
            nightMode={nightMode}
            type={'span'}
          >
            Holding total value
          </El>
        </td>
      </tr>
    );
  }

  renderTokenUsers(tokenUsers)
  {
    const {
      nightMode,
    } = this.props;

    return (
      <div className={css(styles.mainContent)}>
        <table className={css(styles.table)}>
          {this.renderHeader()}
          <tbody>
            {
              tokenUsers.map((tokenUser) => {
                const {
                  amount,
                  token,
                } = tokenUser;

                const {
                  shortName,
                  priceUSD,
                  percentChange24h,
                } = token;

                return (
                  <tr className={css(styles.row)} key={tokenUser.id}>
                    <td>
                      <El
                        nightMode={nightMode}
                        type={'span'}
                      >
                        {shortName}
                      </El>
                    </td>
                    <td>
                      <El
                        nightMode={nightMode}
                        type={'span'}
                      >
                        {amount}
                      </El>
                    </td>
                    <td>
                      <El
                        nightMode={nightMode}
                        type={'span'}
                      >
                        {priceUSD}
                      </El>
                    </td>
                    <td>
                      <El
                        nightMode={nightMode}
                        type={'span'}
                      >
                        {percentChange24h}
                      </El>
                    </td>
                    <td>
                      <El
                        nightMode={nightMode}
                        type={'span'}
                      >
                        {amount * priceUSD}
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

  render()
  {
    const {
      data,
      nightMode,
    } = this.props;

    return (
      <div className={css(styles.wrapper, nightMode && styles.nightMode)}>
        { data && data.user && this.renderTokenUsers(data.user.tokenUsers) }
      </div>
    );
  }
}

export default Portfolio;